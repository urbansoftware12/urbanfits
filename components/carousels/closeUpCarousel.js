import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function CloseUpCarousel(props) {
    if (!props.show) return
    if (props.show) return (
        <div className={`w-full h-screen px-4 md:px-7 py-10 font_urbanist fixed inset-0 z-50 bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500 ${props.show === false ? "opacity-0 pointer-events-none" : ''}`}>
            <button onClick={props.toggleStoryCarousel} name="modal3" className="material-symbols-rounded text-3xl text-white absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
            <Splide className="closeup_carousel w-full h-80vh"
                options={{
                    type: 'slide',
                    speed: 600,
                    focus: 'center',
                    arrows: true,
                    fixedHeight: '80vh',
                    padding: 0,
                    cover: false,
                    gap: '0.5rem',
                    pagination: false,
                    waitForTransition: true
                }}>
                {props.slideData.map((img, index) => {
                    return <SplideSlide className='w-full h-full' key={index}>
                        <div className='w-full h-full'>
                            <Image className='w-full h-full object-contain object-center' src={img} placeholder='blur' alt="Urban images" />
                        </div>
                    </SplideSlide>
                })}
            </Splide>
        </div>
    )
}