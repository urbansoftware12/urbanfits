import React from 'react'
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function StoryCarousel(props) {
    return (
        <Splide className="story_carousel w-full mt-10 lg:mt-14 overflow-hidden"
            options={{
                type: 'loop',
                autoplay: true,
                speed: 900,
                easing: 'cubic-bezier(0.5,0.25,0,1)',
                fixedHeight: '11vw',
                gap: '0.5rem',
                arrows: false,
                perPage: 3,
                perMove: 1,
                pagination: false,
                waitForTransition: true,
                interval: 2200,
                breakpoints: {
                    600: {
                        perPage: 1,
                        fixedHeight: 180,
                    }
                }
            }}>
            {props.slideData.map((img, index) => {
                return <SplideSlide key={index}>
                    <div className='w-full h-full'><Image width={500} height={280} placeholder='blur' className='w-full h-full object-cover object-top' src={img} alt="Urban images" /></div>
                </SplideSlide>
            })}
        </Splide>
    )
}