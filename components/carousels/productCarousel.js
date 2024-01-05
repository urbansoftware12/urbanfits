import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image'
import ImgLoader from '../loaders/imgLoader';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function ProductCarousel(props) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    slider1.current.splide.sync(slider2.current.splide);
  }, [])
  useEffect(() => {
    setImages(props.img_array)
  }, [props.img_array])

  if (window.matchMedia('(min-width: 1000px)').matches) return (
    <>
      <div className="lg:sticky top-20 layout_height flex justify-center items-center gap-4">
        <Splide className='w-[85%] h-fulloverflow-hidden bg-white' ref={slider1} options={{
          autoplay: true,
          type: 'fade',
          speed: 2000,
          rewind: true,
          pagination: false,
          arrows: false,
        }} >
          {images.map((img) => {
            return (
              <SplideSlide className='w-full layout_height flex justify-center items-center' >
                <ImgLoader loading={loading} />
                <Image className={`${loading ? 'w-0 h-0' : 'w-full h-full'} object-cover object-center`} onLoad={() => setLoading(false)} priority={true} width={1200} height={1265} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + img} alt="Urban images" />
              </SplideSlide>
            )
          })}
        </Splide>

        <div className="flex w-[15%] h-[90%] justify-center items-center">
          <Splide id="thumbnail-carousel" className='w-full h-full flex flex-col items-center' ref={slider2} options={{
            autoplay: true,
            interval: 3000,
            fixedWidth: '100%',
            fixedHeight: '24.2%',
            height: 'calc(100vh - 50px)',
            rewind: true,
            pagination: false,
            isNavigation: true,
            pauseOnHover: true,
            gap: '0.5rem',
            direction: 'ttb',
            arrows: false
          }} >
            {images.map((img) => {
              return (
                <SplideSlide className='w-full' >
                  <Image className='w-full h-full object-cover object-center' width={1200} height={1265} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + img} alt="Urban images" />
                </SplideSlide>)
            })}
          </Splide>
        </div>
      </div>
    </>
  );
  // This carousel will render in the mobile and tabs screens
  if (window.matchMedia('(max-width: 1000px)').matches) return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-1 md:gap-2.5">
        <Splide className='w-full h-[94vw] overflow-hidden bg-white' ref={slider1} options={{
          autoplay: true,
          type: 'fade',
          speed: 1700,
          rewind: true,
          pagination: false,
          arrows: false,
        }} >
          {images.map((img) => {
            return (
              <SplideSlide className='w-full h-[94vw] flex justify-center items-center' >
                <ImgLoader loading={loading} />
                <Image className={`${loading ? 'w-0 h-0' : 'w-full h-full'} object-cover object-center`} onLoad={() => setLoading(false)} width={1200} height={1265} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + img} alt="Urban images" />
              </SplideSlide>
            )
          })}
        </Splide>

        <Splide id="thumbnail-carousel" className='w-full flex justify-center items-center' ref={slider2} options={{
          autoplay: true,
          interval: 2600,
          width: '100%',
          fixedWidth: '19.5%',
          rewind: true,
          pagination: false,
          isNavigation: true,
          pauseOnHover: true,
          gap: '0.8vw',
          arrows: false
        }} >
          {images.map((img) => {
            return (
              <SplideSlide className='h-[20vw]' >
                <Image className='w-full object-cover object-center' width={1200} height={1265} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + img} alt="Urban images" />
              </SplideSlide>)
          })}
        </Splide>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  return { props: { img_array: context.img_array } }
}