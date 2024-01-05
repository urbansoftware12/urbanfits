import React, { useEffect } from "react";
import Link from "next/link";
// images imports
import Image from "next/image";
import image1 from "@/public/carousel2 imgs/img1.png";
export default function HomeCarousel2() {
    useEffect(() => {
        const script = document.createElement("script");
        script.innerHTML = `
    $('.hero-slider').slick({
      dots: true,
      arrows:false,
      infinite: true,
      rtl: true,
      speed: 700,
      centerMode: false,
      autoplay: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      appendDots: $('.slider-pagi-wrapper'),
      dotsClass: 'hero-slide-pagi',
     
      responsive: [
    
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 350,
          settings: {
            slidesToShow: 3
          }
        }
      ]
    });
        $('.hero-slide-pagi').css({
            'display': 'flex',
            'align-items': 'flex-end',
        });
    `;
        document.body.appendChild(script);
    }, []);
    return (
        <>
            <div className="w-full h-[40vh] md:h-[50vh] lg:h-[99.5vh] my-14 bg_metal_gold px-5 lg:px-14">
                <div className="w-full h-full flex flex-col-reverse justify-center lg:flex-row items-center -mx-4">
                    <div className="lg:w-1/3 w-full px-4 md:flex md:flex-row lg:block">
                        <div className="content-wrapper hidden lg:block md:mb-12 mb-3">
                            <h2 className="lg:text-[42px] font_copper md:mb-4 tracking-wide leading-[50px]">URBAN <br /> NEW ARRIVAL</h2>
                        </div>
                        {/*.pagination-wrapper*/}
                        <div className="slider-pagi-wrapper mx-auto flex justify-center lg:justify-start items-center"></div>
                    </div>
                    {/*.col-grid*/}
                    <div className="md:w-2/3 w-full px-4" dir="rtl">
                        <div className="hero-slider">
                            <div className="2xl:h-[44rem] xl:h-[36rem] lg:h-[34rem] md:h-[24rem] sm:h-[18rem] h-[14rem] ">
                                <div className="hero-slider-img-wrapper flex justify-center items-center h-full">
                                    <div className="hero-slider-img-inner relative">
                                        <Image width={700} height={1200} src={image1} alt="" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-one bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[20%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-two bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[33%] right-[25%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-three bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[57%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-four bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute bottom-[12%] right-[32%]" />
                                    </div>
                                </div>
                            </div>
                            {/*.slider-item*/}
                            <div className="2xl:h-[44rem] xl:h-[36rem] lg:h-[34rem] md:h-[24rem] sm:h-[16rem] h-[14rem] ">
                                <div className="hero-slider-img-wrapper flex justify-center items-center h-full">
                                    <div className="hero-slider-img-inner relative">
                                        <Image width={700} height={1200} src={image1} alt="" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-one bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[20%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-two bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[33%] right-[25%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-three bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[57%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-four bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute bottom-[12%] right-[32%]" />
                                    </div>
                                </div>
                            </div>
                            {/*.slider-item*/}
                            <div className="2xl:h-[44rem] xl:h-[36rem] lg:h-[34rem] md:h-[24rem] sm:h-[16rem] h-[14rem] ">
                                <div className="hero-slider-img-wrapper flex justify-center items-center h-full">
                                    <div className="hero-slider-img-inner relative">
                                        <Image width={700} height={1200} src={image1} alt="" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-one bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[20%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-two bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[33%] right-[25%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-three bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[57%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-four bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute bottom-[12%] right-[32%]" />
                                    </div>
                                </div>
                            </div>
                            {/*.slider-item*/}
                            <div className="2xl:h-[44rem] xl:h-[36rem] lg:h-[34rem] md:h-[24rem] sm:h-[16rem] h-[14rem] ">
                                <div className="hero-slider-img-wrapper flex justify-center items-center h-full">
                                    <div className="hero-slider-img-inner relative">
                                        <Image width={700} height={1200} src={image1} alt="" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-one bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[20%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-two bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[33%] right-[25%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-three bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[57%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-four bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute bottom-[12%] right-[32%]" />
                                    </div>
                                </div>
                            </div>
                            {/*.slider-item*/}
                            <div className="2xl:h-[44rem] xl:h-[36rem] lg:h-[34rem] md:h-[24rem] sm:h-[16rem] h-[14rem] ">
                                <div className="hero-slider-img-wrapper flex -space-x-2 justify-center items-center h-full">
                                    <div className="hero-slider-img-inner relative">
                                        <Image width={700} height={1200} src={image1} alt="" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-one bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[20%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-two bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[33%] right-[25%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-three bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[57%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-four bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute bottom-[12%] right-[32%]" />
                                    </div>
                                </div>
                            </div>
                            {/*.slider-item*/}
                            <div className="2xl:h-[44rem] xl:h-[36rem] lg:h-[34rem] md:h-[24rem] sm:h-[16rem] h-[14rem] ">
                                <div className="hero-slider-img-wrapper flex justify-center items-center h-full">
                                    <div className="hero-slider-img-inner relative">
                                        <Image width={700} height={1200} src={image1} alt="" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-one bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[20%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-two bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[33%] right-[25%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-three bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[57%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-four bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute bottom-[12%] right-[32%]" />
                                    </div>
                                </div>
                            </div>
                            {/*.slider-item*/}
                            <div className="2xl:h-[44rem] xl:h-[36rem] lg:h-[34rem] md:h-[24rem] sm:h-[16rem] h-[14rem] ">
                                <div className="hero-slider-img-wrapper flex justify-center items-center h-full">
                                    <div className="hero-slider-img-inner relative">
                                        <Image width={700} height={1200} src={image1} alt="" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-one bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[20%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-two bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[33%] right-[25%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-three bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute top-[57%] right-[37%]" />
                                        <Link href={`/products/product/6416bff63b9101bcd0595a31`} className="info-dots info-dot-four bg-white hover:outline-8 hover:outline outline-white/25 w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 rounded-full absolute bottom-[12%] right-[32%]" />
                                    </div>
                                </div>
                            </div>
                            {/*.slider-item*/}
                        </div>
                        {/*.hero-slider*/}
                    </div>
                    {/*.col-grid*/}
                </div>
                {/*.row*/}
            </div>
            {/*.container*/}
        </>
    );
}
