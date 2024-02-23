import styles from '@/styles/scroll-top&logo-load.module.css'

export default function ImgLoader({ loading, classes }) {
    if (!loading) return
    else return <div className={`${classes || "w-full h-full p-5"} flex justify-center items-center`}>
        <svg className={`${styles.animate_shopcard_load} w-1/4 h-2/5 max-w-[80px]`} xmlns="http://www.w3.org/2000/svg" width="155" height="135" viewBox="0 0 155 135" fill="none">
            <path d="M85.9267 80.9723V84.5116C85.9267 109.04 72.4516 119.581 52.0676 119.581C31.6836 119.581 18.0189 109.04 18.0189 84.5116V0.00195312H0V84.322C0 118.996 23.3544 134.913 51.878 134.913C80.3817 134.913 103.946 118.996 103.946 84.322V80.9723H85.9267Z" fill="#FF4A60" />
            <path d="M140.654 46.6699H84.0057V64.4227H140.654V46.6699Z" fill="#FF4A60" />
            <path d="M155 0H84.0057V17.7528H155V0Z" fill="#FF4A60" />
        </svg>
    </div>
}
