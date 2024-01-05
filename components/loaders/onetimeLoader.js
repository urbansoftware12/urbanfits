import React from 'react'
import styles from "@/styles/Loader.module.css"

export default function OneTimeLoader() {
    return (
        <div className={`${styles.loading}`}>
            <div className={`${styles.loading_text} font_urbanist_medium text-lg `}>
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </div>
        </div>
    )
}
