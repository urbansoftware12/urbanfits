// import ConnectDB from "@/utils/connect_db";
// import UFpoints from "@/models/ufpoints"
import StandardApi from "@/middlewares/standard_api";
import { getDateOfTimezone, SignJwt } from "@/utils/cyphers";
import { jwtExpiries } from "@/uf.config";

const TestApiHandler = (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    // await ConnectDB()

    // const getDateOfTimezone = (timeZone) => {
    //     const now = new Date();
    //     const options = { timeZone, timeZoneName: 'short' };
    //     const parts = Intl.DateTimeFormat('en-US', options).formatToParts(now);
    //     const timeZoneOffsetPart = parts.find(part => part.type === 'timeZoneOffset');
    //     const timeZoneOffset = timeZoneOffsetPart ? timeZoneOffsetPart.value : '+00:00'; // Default to UTC if offset not found
    //     const [sign, hours, minutes] = timeZoneOffset.split(/(?=[+-])/);
    //     const offsetInMinutes = (parseInt(hours, 10) * 60) + parseInt(minutes, 10);
    //     const offsetInMilliseconds = offsetInMinutes * 60000;

    //     return new Date(now.getTime() + (sign === '-' ? -1 : 1) * offsetInMilliseconds);
    // };


    const token = SignJwt({ value: "just some kinda broken shit here bro" }, Math.floor(Date.now() + (7 * 24 * 60 * 60)) / 1000)
    // console.log("the current date according to the time zone: ", getDateOfTimezone("Asia/Karachi"))
    // console.log("and server date time: ", new Date())
    // const monthNames = [
    //     'january', 'february', 'march', 'april',
    //     'may', 'june', 'july', 'august',
    //     'september', 'october', 'november', 'december'
    // ];

    // console.log("getting all the points docs...")
    // const allPointsDocs = await UFpoints.find();

    // console.log("iterating over the docs to save respected year and month...")
    // for (let doc of allPointsDocs) {
    //     const createdDate = new Date(doc.createdAt);
    //     doc.month = monthNames[createdDate.getMonth()];
    //     doc.year = createdDate.getFullYear();
    //     doc.spent = 0;
    //     if (!doc.total_balance) doc.total_balance = 0
    //     await doc.save()
    // }
    // console.log("terraforming completed")

    res.status(200).json({
        success: true,
        msg: "terrafroming completed successfully",
        token
    })
})

export default TestApiHandler