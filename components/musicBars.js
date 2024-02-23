import { useState, useRef, useEffect } from 'react'
import styles from "@/styles/muscibars.module.css"

export default function MusicBars() {
    const [playing, setPlaying] = useState(true)
    const audioRef = useRef()
    const musicBars = useRef()
    useEffect(() => {
        const playAudio = () => {
            audioRef.current.play().catch((error) => {
                setPlaying(false)
                console.log('Autoplay failed:', error);
            });
        };
        playAudio()
    }, [])
    const toggleMusic = () => {
        if (playing) {
            setPlaying(false)
            audioRef.current.pause()
        }
        if (!playing) {
            setPlaying(true)
            audioRef.current.play()
        }
    }
    return (
        <>
            <audio ref={audioRef} src="https://urban-fits.s3.eu-north-1.amazonaws.com/aobut-us/ufaudio.mp3" autoPlay loop />
            <section ref={musicBars} onClick={toggleMusic} className={` fixed z-20 cursor-pointer bottom-3 left-3 w-[60px] h-[60px] rounded-full flex justify-center items-end`}>
                <div onBlur={toggleMusic} className={`${styles.now} ${!playing ? styles.paused : null} ${styles.playing}`} id="music">
                    <span class={`${styles.bar} ${styles.n1} select-none`}></span>
                    <span class={`${styles.bar} ${styles.n2} select-none`}></span>
                    <span class={`${styles.bar} ${styles.n3} select-none`}></span>
                    <span class={`${styles.bar} ${styles.n4} select-none`}></span>
                    <span class={`${styles.bar} ${styles.n5} select-none`}></span>
                </div>
            </section>
        </>
    )
}
