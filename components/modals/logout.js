import useUser from '@/hooks/useUser';
import Button from '../buttons/simple_btn';
import { useCart } from 'react-use-cart';
import { useRouter } from 'next/router';
import useLanguage from '@/hooks/useLanguage';
import { signOut as signOutLang } from '@/locales';

export default function Logout(props) {
    const { logOut, userLoading } = useUser();
    const { locale } = useLanguage();
    const router = useRouter();
    const { emptyCart } = useCart()
    const langObj = signOutLang[locale];

    if (props.show) return <div className={`w-full h-full font_urbanist fixed inset-0 z-[100] bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500`}>
        <div className={`relative w-11/12 md:w-3/5 lg:w-[33rem] text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500`}>
            <button onClick={() => props.setLogout(!props.show)} name="modal5" className="material-symbols-rounded text-3xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
            <section className="w-full h-full p-6">
                <div className="w-full space-y-5">
                    <h2 className="text-black md:text-lg lg:text-xl font_urbanist_bold">{langObj.title}</h2>
                    <p className='text-xs md:text-sm'>{langObj.confirmationMsg}</p>
                </div>
                <div className="w-full mt-7 flex justify-around">
                    <Button onClick={() => props.setLogout(false)} name="modal5" my="my-2" bg="bg-gray-200" text="black" classes="w-48pr" >{langObj.cancelBtn}</Button>
                    <Button loading={userLoading} onClick={async () => { await logOut(router); emptyCart(); props.setLogout(false) }} my="my-2" classes="w-48pr text-sm md:text-base text-center" >{langObj.signOutBtn}</Button>
                </div>
            </section>
        </div>
    </div>
}