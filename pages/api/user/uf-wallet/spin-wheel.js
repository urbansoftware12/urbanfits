import ConnectDB from "@/utils/connect_db";
import mongoose from "mongoose";
import User from "@/models/user"
import { generateRandIntWithProbabilities, EncrytOrDecryptData } from "@/utils/generatePassword";
import axios from "axios";
import CorsMiddleware from "@/utils/cors-config"

const rewards = [0, 0, 50, 100, 200, 300, 400, 500]
const probabilities = [0.18, 0.18, 0.18, 0.18, 0.12, 0.08, 0.04, 0.04]
const SpinUfWheel = async (req, res) => {
    try {
        await CorsMiddleware(req, res)
        if (req.method === 'POST') {
            const { user_id, card_number } = req.query
            if (!card_number || !mongoose.Types.ObjectId.isValid(user_id)) return res.status(403).json({ success: false, msg: "Invalid arguments. Required Query parameers: user_id, card_number" })
            await ConnectDB()

            const user = await User.findOne({ _id: user_id, "uf_wallet.card_number": card_number })
            if (!user) return res.status(401).json({ success: false, msg: "Invalid information of user and uf-card" })

            // Function to convert the current date to the user's timezone
            // const convertToUserTZ = (date) => {
            //     return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: timezone }));
            // }

            const today = new Date();
            const currentWeekStart = new Date(new Date(new Date(today).setDate(today.getDate() - (today.getDay() + 5) % 7)).setHours(0, 0, 0, 0));
            const secondSpinTimeAvailability = new Date(new Date(currentWeekStart).setDate(new Date(currentWeekStart).getDate() + 2));
            const thirdSpinTimeAvailability = new Date(new Date(secondSpinTimeAvailability).setDate(new Date(secondSpinTimeAvailability).getDate() + 2));
            // console.log("today: ", today, "\ncurrent start of week: ", new Date(currentWeekStart), "\nsecond spin time: ", new Date(secondSpinTimeAvailability), "\nthird spin time: ", new Date(thirdSpinTimeAvailability));

            const spinUfWheel = async (nextSpinTime, deductSpinFee = true) => {
                const generatedReward = generateRandIntWithProbabilities(rewards, probabilities);
                if (deductSpinFee) {
                    axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/deduct-points`, {
                        user_id: user._id,
                        card_number: user.uf_wallet.card_number,
                        points_to_deduct: 10
                    })
                }
                if (generatedReward !== 0) {
                    axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/user/uf-wallet/add-points`, {
                        user_id: user._id,
                        card_number: user.uf_wallet.card_number,
                        source: "prize_wheel",
                        secret_key: EncrytOrDecryptData(process.env.NEXT_PUBLIC_SECRET_KEY),
                        points: generatedReward,
                        duducted: 10,
                        expiration_date: new Date(new Date().setDate(new Date().getDate() + 7)),
                        notific_params: {
                            category: "reward",
                            heading: "Fortune Wheel Prize",
                            type: "prize_wheel",
                            mini_msg: '',
                            message: `Congratulations! You won ${generatedReward} UF-Points in prize wheel spin. They will expire after 7 days and shall be deducted from your wallet. Be active whole week to get chance to spin.`
                        }
                    })
                }
                await User.findByIdAndUpdate(user._id, {
                    uf_wallet: {
                        card_number: user.uf_wallet.card_number,
                        bar_code: user.uf_wallet.bar_code,
                        last_uf_spin: new Date(),
                        last_spin_reward: generatedReward,
                        ...(nextSpinTime ? { next_uf_spin: nextSpinTime } : {})
                    }
                })
                return res.status(200).json({
                    success: true,
                    msg: generatedReward === 0 ? "Oops! no points But you gained a free change to try your luck again!" : `Congratulations! You have won ${generatedReward} UF-Points.`,
                    reward: generatedReward,
                    last_uf_spin: new Date(),
                    ...(nextSpinTime ? { next_uf_spin: nextSpinTime } : {})
                });
            };

            if (!user.uf_wallet.last_uf_spin && !user.uf_wallet.last_spin_reward) {
                let nextUfSpinForNewUser = null;
                if (today >= currentWeekStart && today < secondSpinTimeAvailability) nextUfSpinForNewUser = secondSpinTimeAvailability
                else if (today >= secondSpinTimeAvailability && today < thirdSpinTimeAvailability) nextUfSpinForNewUser = thirdSpinTimeAvailability
                else if (today >= thirdSpinTimeAvailability) nextUfSpinForNewUser = new Date(new Date().setDate(new Date().getDate() + (7 - new Date().getDay() + 1) % 7))
                return await spinUfWheel(nextUfSpinForNewUser, false)
            }

            console.log(new Date(new Date().setDate(new Date().getDate() + (7 - new Date().getDay() + 1) % 7)))
            if (user.uf_wallet.last_spin_reward === 0) return await spinUfWheel(null, false)
            else if (today >= currentWeekStart && today < secondSpinTimeAvailability) {
                if (user.uf_wallet.last_uf_spin < currentWeekStart) {
                    return await spinUfWheel(secondSpinTimeAvailability)
                }
                else if (user.uf_wallet.last_spin_reward === 0) return await spinUfWheel(secondSpinTimeAvailability, false)
                else return res.status(403).json({ success: false, msg: "You can't spin yet, wait for the cooldown." })
            }
            else if (today >= secondSpinTimeAvailability && today < thirdSpinTimeAvailability) {
                if (user.uf_wallet.last_uf_spin < secondSpinTimeAvailability) {
                    return await spinUfWheel(thirdSpinTimeAvailability)
                }
                else if (user.uf_wallet.last_spin_reward === 0) return await spinUfWheel(thirdSpinTimeAvailability, false)
                else return res.status(403).json({ success: false, msg: "You can't spin yet, wait for the cooldown." })
            }
            else if (today >= thirdSpinTimeAvailability && user.uf_wallet.last_uf_spin < thirdSpinTimeAvailability) {
                if (user.uf_wallet.last_spin_reward === 0) return await spinUfWheel(new Date(new Date().setDate(new Date().getDate() + (7 - new Date().getDay() + 1) % 7)), false)
                else return await spinUfWheel(new Date(new Date().setDate(new Date().getDate() + (7 - new Date().getDay() + 1) % 7)))
            }
            else return res.status(403).json({ success: false, msg: "You have used all 3 spins this week, wait for next week for more spins." })

        } else res.status(405).json({ success: false, msg: "Method not allowed. Allowed methods: POST" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error, msg: "Internal server error ocurred, please try later." })
    }
}

export default SpinUfWheel