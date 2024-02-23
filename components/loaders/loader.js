import styles from '@/styles/Loader.module.css'

export default function Loader(props) {
    return (
        <section className='fixed inset-0 z-[999] w-screen h-screen flex justify-center items-center bg-black/60 backdrop-blur-sm'>
            <section className="flex flex-col justify-center">
                <div className='flex justify-center items-center'>
                    <svg className='fixed w-10 z-50 translate-x-[2px] translate-y-1' width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1786 15.2458V15.9123C16.1786 20.5307 13.6414 22.5154 9.80334 22.5154C5.96532 22.5154 3.39266 20.5307 3.39266 15.9123V0.000976562H0V15.8769C0 22.4051 4.39727 25.4021 9.76797 25.4021C15.1345 25.4021 19.5713 22.4051 19.5713 15.8769V15.2463H16.1786V15.2458Z" fill="#FFFFFF" />
                        <path d="M26.4818 8.78125H15.8159V12.1242H26.4818V8.78125Z" fill="#FFFFFF" />
                        <path d="M29.1827 0H15.8159V3.3429H29.1827V0Z" fill="#FFFFFF" />
                    </svg>
                    <div className={styles.loader}></div>
                </div>
                <p className="my-3 text-center text-gray-300 text-sm md:text-lg xl:text-xl">
                    {props.status}
                    {props.status ? <i className="ml-4 fa-solid fa-circle fa-bounce text-gray-300" /> : null}
                </p>
            </section>
        </section>
    )
}
