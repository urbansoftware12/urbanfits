import React from 'react'
import styles from '@/styles/scroll-top&logo-load.module.css'

export default function ImgLoader({ loading, classes }) {
    if (!loading) return
    else return <div className={`${classes || "w-full h-full p-5"} flex justify-center items-center`}>
        <svg className={`${styles.animate_shopcard_load} w-1/4 h-2/5 max-w-[80px]`} xmlns="http://www.w3.org/2000/svg" width="155" height="135" viewBox="0 0 155 135" fill="none">
            <path d="M85.9267 80.9723V84.5116C85.9267 109.04 72.4516 119.581 52.0676 119.581C31.6836 119.581 18.0189 109.04 18.0189 84.5116V0.00195312H0V84.322C0 118.996 23.3544 134.913 51.878 134.913C80.3817 134.913 103.946 118.996 103.946 84.322V80.9723H85.9267Z" fill="url(#paint0_linear_4458_317)" />
            <path d="M140.654 46.6699H84.0057V64.4227H140.654V46.6699Z" fill="url(#paint1_linear_4458_317)" />
            <path d="M155 0H84.0057V17.7528H155V0Z" fill="url(#paint2_linear_4458_317)" />
            <defs>
                <linearGradient id="paint0_linear_4458_317" x1="96.2333" y1="126.501" x2="-30.0306" y2="51.8913" gradientUnits="userSpaceOnUse">
                    <stop offset="0.398372" stop-color="#FF4A60" />
                    <stop offset="1" stop-color="#9492FA" />
                </linearGradient>
                <linearGradient id="paint1_linear_4458_317" x1="136.451" y1="63.3158" x2="123.167" y2="30.8079" gradientUnits="userSpaceOnUse">
                    <stop offset="0.398372" stop-color="#FF4A60" />
                    <stop offset="1" stop-color="#9492FA" />
                </linearGradient>
                <linearGradient id="paint2_linear_4458_317" x1="149.733" y1="16.6459" x2="138.552" y2="-17.6446" gradientUnits="userSpaceOnUse">
                    <stop offset="0.398372" stop-color="#FF4A60" />
                    <stop offset="1" stop-color="#9492FA" />
                </linearGradient>
            </defs>
        </svg>
    </div>
}
