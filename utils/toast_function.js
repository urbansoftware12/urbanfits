import { toast, Slide } from 'react-toastify';
import { urbanist } from '@/fonts';
import 'react-toastify/dist/ReactToastify.css';
export default function toaster(type, msg, position = "top-left") {
    toast(msg, {
        position,
        style: {
            borderRadius: "100px",
        },
        bodyStyle: {
            fontSize: "14px",
            color: "black"
        },
        bodyClassName: urbanist.className,
        closeButton: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type,
        progress: undefined,
        theme: "light",
        transition: Slide
    })
}