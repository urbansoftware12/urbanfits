import React, { useState } from 'react'
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router';
import Link from 'next/link'
import dynamic from 'next/dynamic';
const Newsletter = dynamic(() => import('./modals/newsletter'));
import Image from 'next/image'
import truck from '../public/truck.svg'

export default function Footer() {
    const { user } = useUser()
    const [modal2, setModal2] = useState(false)
    const url = useRouter().pathname
    const Exception = url.startsWith("/about") || (window.matchMedia('(max-width: 760px)').matches && (url.startsWith('/auth') || (url.startsWith('/user/') && url.length > '/user/'.length)))
    const toggleModal = () => {
        if (modal2 === false) return setModal2(true)
        if (modal2 === true) return setModal2(false)
    }
    if (!Exception) return <>
        <Newsletter show={modal2} toggleModal={toggleModal} />
        <footer className="border-t w-full max-w-[2000px] mx-auto pt-10 font_urbanist_light text-gotham-black bg-white">
            <section className="pt-10 md:p-5 lg:p-24 lg:pt-16 lg:pb-16 md:pb-7">
                <section className="w-full h-2/6 pb-7 px-6 md:pb-16 lg:px-[5%] border-b border-b-gray-200 flex flex-row flex-wrap justify-between items-start">
                    <div className="w-full lg:w-1/2 flex justify-around items-start">
                        <span className='w-1/2 md:w-48pr mx-auto lg:mx-0 mb-7 flex flex-col justify-center text-center' >
                            <i className="fa-solid fa-lock text-black mb-5 text-xl"></i>
                            <h5 className="my-3 text-sm md:text-base font_urbanist_bold">100% Secure Payment</h5>
                            <p className="w-4/5 mx-auto text-xs lg:text-sm">Moving your card details to a much more secured place</p>
                        </span>
                        <span className='w-1/2 md:w-48pr mx-auto lg:mx-0 mb-7 flex flex-col justify-center text-center' >
                            <i className="fa-solid fa-wallet text-black mb-5 text-xl"></i>
                            <h5 className="my-3 text-sm md:text-base font_urbanist_bold">Trust Pay</h5>
                            <p className="w-4/5 mx-auto text-xs lg:text-sm">100% payment protection. Easy return and policy</p>
                        </span>
                    </div>

                    <div className="w-full lg:w-1/2 flex justify-around items-start">
                        <span className='w-1/2 md:w-48pr mx-auto lg:mx-0 mb-7 flex flex-col justify-center items-center text-center' >
                            <span className='mb-5 -translate-y-1'>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.50231 0.532377C4.51689 0.733841 1.44238 1.47838 1.25406 1.55721C0.943102 1.69736 0.746018 1.85941 0.522656 2.14847C0.189803 2.59081 0.159146 2.71782 0.167905 3.63754C0.202942 6.50621 0.978139 9.44057 2.34897 11.8975C3.99571 14.845 5.96655 16.9473 8.69945 18.6729C11.555 20.4729 14.4324 21.3576 17.8967 21.489C18.466 21.5109 18.6456 21.5021 18.8602 21.4452C19.3989 21.3006 19.8588 20.9109 20.0865 20.4028C20.1435 20.267 20.4062 19.2553 20.6603 18.1517C21.1902 15.8918 21.2208 15.6378 21.0325 15.156C20.8968 14.7969 20.6296 14.4509 20.3537 14.2669C20.2223 14.1793 19.1318 13.6844 17.9317 13.1676C15.5361 12.1384 15.3565 12.0815 14.8441 12.1691C14.2309 12.2742 13.9506 12.4932 13.0178 13.6275L12.3346 14.4553L12.0937 14.3195C11.6688 14.083 10.771 13.4655 10.298 13.0888C9.78998 12.6815 8.92281 11.81 8.53302 11.3194C8.04688 10.7019 7.28482 9.55882 7.22351 9.34422C7.21475 9.32232 7.56512 9.01136 7.99871 8.66099C9.098 7.76317 9.37391 7.41718 9.47902 6.80402C9.56662 6.29599 9.50968 6.11204 8.49361 3.75142C7.98557 2.57329 7.52132 1.52218 7.46439 1.41706C7.07898 0.760118 6.24247 0.383471 5.50231 0.532377ZM6.15926 1.89007C6.24685 1.94262 6.3432 2.06525 6.40014 2.1835C6.65854 2.73534 8.16513 6.26533 8.19579 6.39234C8.27462 6.71643 8.23083 6.76899 7.0308 7.75441C6.41328 8.26245 5.8702 8.72669 5.82202 8.788C5.77385 8.8537 5.72129 8.98509 5.71253 9.0902C5.69501 9.24787 5.72129 9.33546 5.94027 9.75152C6.80744 11.4026 7.95929 12.8129 9.50968 14.1136C10.2498 14.7356 10.9856 15.2305 11.8966 15.7035C12.3127 15.9224 12.4046 15.9531 12.5623 15.9356C12.663 15.9268 12.7944 15.8743 12.8601 15.8261C12.9214 15.7779 13.3857 15.2348 13.8937 14.6173C14.8791 13.4173 14.9273 13.3735 15.2558 13.4523C15.4397 13.4917 19.4821 15.2392 19.6135 15.3312C19.7361 15.4188 19.8456 15.6421 19.8456 15.8042C19.8413 16.0276 18.9434 19.8335 18.8646 19.9561C18.7201 20.1751 18.5449 20.2101 17.8091 20.1795C14.209 20.0174 11.2177 18.9794 8.41477 16.9166C7.67899 16.3779 7.20161 15.9662 6.46145 15.2261C4.42054 13.1895 3.03219 10.9253 2.20444 8.26245C1.78837 6.93979 1.53873 5.44196 1.46866 3.83901C1.43362 3.07695 1.47304 2.91052 1.72268 2.78351C1.89786 2.69154 5.60742 1.81123 5.8483 1.80685C5.94903 1.80247 6.07604 1.83751 6.15926 1.89007Z" fill="black" /></svg>
                            </span>
                            <h5 className="my-3 text-sm md:text-base font_urbanist_bold">Help Center</h5>
                            <p className="w-4/5 mx-auto text-xs lg:text-sm">Got a question ? Look no further. Browser our FAQs or submit your query here.</p>
                        </span>
                        <span className='w-1/2 md:w-48pr mx-auto lg:mx-0 mb-7 flex flex-col justify-center items-center text-center' >
                            <Image className='mb-5' src={truck} alt="delivery vehicle" />
                            <h5 className="my-3 text-sm md:text-base font_urbanist_bold">Express Shipping</h5>
                            <p className="w-4/5 mx-auto text-xs lg:text-sm">Moving your card details to a much more secured place</p>
                        </span>
                    </div>
                </section>

                <section className="w-full mt-10 px-6 lg:px-0 font_urbanist_light text-sm grid grid-cols-2 md:flex md:flex-wrap justify-between items-start md:items-start">
                    <nav className="w-full lg:w-1/5 col-span-2 lg:mr-0 text-sm pb-10 md:pb-3 space-y-5 lg:space-y-4 flex flex-col items-start">
                        <Link className="text-[26px] md:mb-3 lg:mb-0 font_copper whitespace-nowrap tracking-3" href="/">URBAN FITS</Link>
                        <p className='hidden lg:block text-[13px] text-start font_urbanist_light' >This is a celebration of everything that moves you. For the power of choosing and the freedom of being. Here’s to the big, beautiful mess of movement and mindfulness that simply makes you feel good.<br /><br />500 4th St NW Suite 102 PMB 1958 Albuquerque, NM 87102<br /><br />+0123.456.8386</p>
                    </nav>
                    <nav className="list-none pb-7 md:pb-3 gap-y-2 lg:gap-y-4 flex flex-col items-start">
                        <h3 className="text-sm lg:text-base font_urbanist_bold">Services</h3>
                        <li>
                            <Link href='/'>Help</Link>
                        </li>
                        <li>
                            <Link href='/contact'>Contact Us</Link>
                        </li>
                        <li>
                            <Link href='/customerservices/sizeguide'>Size Guides</Link>
                        </li>
                        <li>
                            <Link href='/'>Site Map</Link>
                        </li>
                        <li>
                            <Link href='/customerservices/cfproducts'>CF Products</Link>
                        </li>
                        <li>
                            <Link href='/faq'>FAQ</Link>
                        </li>
                    </nav>
                    <nav className="list-none pb-7 md:pb-3 space-y-2 lg:space-y-4 flex flex-col items-start">
                        <h3 className="text-sm lg:text-base font_urbanist_bold">Explore</h3>
                        <li>
                            <Link href='/stories'>Stories</Link>
                        </li>
                        <li>
                            <Link href='/collections'>New Collection</Link>
                        </li>
                        <li>
                            <Link href='/sales'>Summer Sale</Link>
                        </li>
                        {/* <li>
                                <button onClick={toggleModal} name="modal2" className='cursor-pointer' >Newsletter</button>
                            </li> */}
                        {user && user.email ?
                            <li>
                                <Link href='/user/personalinfo'>My Account</Link>
                            </li> : null}
                    </nav>
                    <nav className="list-none pb-7 md:pb-3 space-y-2 lg:space-y-4 flex flex-col items-start">
                        <h3 className="text-sm lg:text-base font_urbanist_bold">Your Orders</h3>
                        <li>
                            <Link href='/user/orders/orders'>Orders</Link>
                        </li>
                        <li>
                            <Link href='/trackorder'>Track Orders</Link>
                        </li>
                        <li>
                            <Link href='/customerservices/delivery'>Delivery</Link>
                        </li>
                        <li>
                            <Link href='/customerservices/returns&refund'>Returns & Refund</Link>
                        </li>
                    </nav>
                    <nav className="list-none pb-7 md:pb-3 space-y-2 lg:space-y-4 flex flex-col items-start">
                        <h3 className="text-sm lg:text-base font_urbanist_bold">About UFs</h3>
                        <li>
                            <Link href='/about'>About Us</Link>
                        </li>
                        <li>
                            <Link href='/policies/terms&conditions'>Terms & Conditions</Link>
                        </li>
                        <li>
                            <Link href='/policies/privacypolicy'>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href='/policies/cookiespolicy'>Cookies Policy</Link>
                        </li>
                        <li>
                            <Link href='/customerservices/companyinfo'>Company Information</Link>
                        </li>
                    </nav>
                    <nav className="w-full md:w-1/5 xl:w-auto col-span-2 flex flex-col justify-start items-start md:items-end gap-y-3 md:gap-y-5">
                        <h3 className="hidden lg:block text-sm lg:text-base font_urbanist_bold"><Link href="/contact">Connect</Link></h3>
                        <div className="space-x-5 text-base text-black">
                            <Link href='#' ><i className="fa-solid fa-paper-plane"></i></Link>
                            <Link href='#' ><i className="fa-brands fa-twitter"></i></Link>
                            <Link href='#' ><i className="fa-brands fa-facebook-f"></i></Link>
                            <Link href='#' ><i className="fa-brands fa-instagram"></i></Link>
                        </div>
                        <p className='font_urbanist text-sm md:text-xs lg:text-sm'>support@urbanfits.store</p>
                        <div className="lg:mt-6 flex flex-col items-end">
                            <h3 className="hidden lg:block text-sm font_copper tracking-1">PAYMENT METHODS</h3>
                            <div className='w-full md:w-32 my-3 flex justify-start md:justify-end space-x-3' >
                                <svg width="22" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.2927 17.4314C21.2927 17.7369 21.093 17.957 20.8066 17.957C20.5114 17.957 20.3205 17.7234 20.3205 17.4314C20.3205 17.1395 20.5114 16.9059 20.8066 16.9059C21.093 16.9059 21.2927 17.1395 21.2927 17.4314ZM7.80311 16.9059C7.49495 16.9059 7.317 17.1395 7.317 17.4314C7.317 17.7234 7.49495 17.957 7.80311 17.957C8.08523 17.957 8.2762 17.7369 8.2762 17.4314C8.27186 17.1395 8.08523 16.9059 7.80311 16.9059ZM12.9029 16.8924C12.6686 16.8924 12.5253 17.0496 12.4906 17.2832H13.3196C13.2805 17.0271 13.1286 16.8924 12.9029 16.8924ZM17.5818 16.9059C17.2866 16.9059 17.1087 17.1395 17.1087 17.4314C17.1087 17.7234 17.2866 17.957 17.5818 17.957C17.8769 17.957 18.0679 17.7369 18.0679 17.4314C18.0679 17.1395 17.8769 16.9059 17.5818 16.9059ZM22.1781 18.0783C22.1781 18.0918 22.1911 18.1008 22.1911 18.1277C22.1911 18.1412 22.1781 18.1502 22.1781 18.1771C22.1651 18.1906 22.1651 18.1996 22.1564 18.2131C22.1434 18.2266 22.1347 18.2355 22.1087 18.2355C22.0956 18.249 22.087 18.249 22.0609 18.249C22.0479 18.249 22.0392 18.249 22.0132 18.2355C22.0002 18.2355 21.9915 18.2221 21.9785 18.2131C21.9654 18.1996 21.9568 18.1906 21.9568 18.1771C21.9437 18.1547 21.9437 18.1412 21.9437 18.1277C21.9437 18.1053 21.9437 18.0918 21.9568 18.0783C21.9568 18.0559 21.9698 18.0424 21.9785 18.0289C21.9915 18.0154 22.0002 18.0154 22.0132 18.0064C22.0349 17.993 22.0479 17.993 22.0609 17.993C22.0826 17.993 22.0956 17.993 22.1087 18.0064C22.1304 18.0199 22.1434 18.0199 22.1564 18.0289C22.1694 18.0379 22.1651 18.0559 22.1781 18.0783ZM22.0826 18.1412C22.1043 18.1412 22.1043 18.1277 22.1173 18.1277C22.1304 18.1143 22.1304 18.1053 22.1304 18.0918C22.1304 18.0783 22.1304 18.0693 22.1173 18.0559C22.1043 18.0559 22.0956 18.0424 22.0696 18.0424H22.0002V18.1996H22.0349V18.1367H22.0479L22.0956 18.1996H22.1304L22.0826 18.1412ZM25.3335 2.63867V18.4512C25.3335 19.6416 24.4003 20.6074 23.2502 20.6074H2.41683C1.26666 20.6074 0.333496 19.6416 0.333496 18.4512V2.63867C0.333496 1.44824 1.26666 0.482422 2.41683 0.482422H23.2502C24.4003 0.482422 25.3335 1.44824 25.3335 2.63867ZM3.11127 8.90977C3.11127 12.3463 5.80659 15.1314 9.12256 15.1314C10.3031 15.1314 11.462 14.7631 12.4429 14.0938C9.27881 11.4299 9.30051 6.40313 12.4429 3.73926C11.462 3.06543 10.3031 2.70156 9.12256 2.70156C5.80659 2.69707 3.11127 5.48672 3.11127 8.90977ZM12.8335 13.7973C15.8934 11.3266 15.8804 6.51094 12.8335 4.02676C9.78662 6.51094 9.7736 11.3311 12.8335 13.7973ZM6.65728 17.2248C6.65728 16.834 6.40988 16.5779 6.01926 16.5645C5.81961 16.5645 5.60693 16.6273 5.4637 16.8564C5.35954 16.6723 5.18159 16.5645 4.93419 16.5645C4.76926 16.5645 4.60433 16.6273 4.47412 16.807V16.6094H4.11822V18.258H4.47412C4.47412 17.409 4.36561 16.9014 4.86475 16.9014C5.30745 16.9014 5.22065 17.3596 5.22065 18.258H5.56353C5.56353 17.4359 5.45502 16.9014 5.95416 16.9014C6.39686 16.9014 6.31006 17.3506 6.31006 18.258H6.66596V17.2248H6.65728ZM8.60607 16.6094H8.26318V16.807C8.146 16.6588 7.98107 16.5645 7.75537 16.5645C7.30832 16.5645 6.96544 16.9328 6.96544 17.4314C6.96544 17.9346 7.30832 18.2984 7.75537 18.2984C7.98107 18.2984 8.146 18.2131 8.26318 18.0559V18.2625H8.60607V16.6094ZM10.3639 17.7594C10.3639 17.0855 9.36995 17.391 9.36995 17.0766C9.36995 16.8205 9.88645 16.8609 10.1729 17.0271L10.3161 16.7352C9.90815 16.4611 9.00537 16.4656 9.00537 17.1035C9.00537 17.7459 9.99929 17.4764 9.99929 17.7773C9.99929 18.0604 9.41336 18.0379 9.10086 17.8133L8.94895 18.0963C9.43506 18.4377 10.3639 18.3658 10.3639 17.7594ZM11.9003 18.1771L11.8048 17.8717C11.6399 17.966 11.2753 18.0693 11.2753 17.6875V16.9418H11.8439V16.6094H11.2753V16.1062H10.9194V16.6094H10.5896V16.9373H10.9194V17.6875C10.9194 18.4781 11.6703 18.3344 11.9003 18.1771ZM12.4776 17.5752H13.6712C13.6712 16.8475 13.35 16.56 12.916 16.56C12.4559 16.56 12.126 16.9148 12.126 17.427C12.126 18.3479 13.1069 18.5006 13.593 18.0648L13.4281 17.7953C13.0896 18.0828 12.5774 18.0559 12.4776 17.5752ZM15.0427 16.6094C14.843 16.5195 14.5392 16.5285 14.383 16.807V16.6094H14.0271V18.258H14.383V17.3281C14.383 16.807 14.7953 16.8744 14.9385 16.9508L15.0427 16.6094ZM15.5028 17.4314C15.5028 16.9193 16.0062 16.7531 16.4012 17.0541L16.5661 16.7621C16.0627 16.3533 15.1469 16.5779 15.1469 17.4359C15.1469 18.3254 16.1191 18.5051 16.5661 18.1098L16.4012 17.8178C16.0019 18.1098 15.5028 17.9346 15.5028 17.4314ZM18.3977 16.6094H18.0418V16.807C17.6816 16.3129 16.7441 16.5914 16.7441 17.4314C16.7441 18.2939 17.7163 18.541 18.0418 18.0559V18.2625H18.3977V16.6094ZM19.8604 16.6094C19.7562 16.5555 19.383 16.4791 19.2007 16.807V16.6094H18.8578V18.258H19.2007V17.3281C19.2007 16.834 19.5913 16.8654 19.7562 16.9508L19.8604 16.6094ZM21.6095 15.94H21.2667V16.807C20.9108 16.3174 19.9689 16.5779 19.9689 17.4314C19.9689 18.3029 20.9455 18.5365 21.2667 18.0559V18.2625H21.6095V15.94ZM21.9394 12.5664V12.773H21.9741V12.5664H22.0566V12.5305H21.8569V12.5664H21.9394ZM22.2259 18.1277C22.2259 18.1053 22.2259 18.0783 22.2128 18.0559C22.1998 18.0424 22.1911 18.0199 22.1781 18.0064C22.1651 17.993 22.1434 17.984 22.1304 17.9705C22.1087 17.9705 22.0826 17.957 22.0609 17.957C22.0479 17.957 22.0262 17.9705 22.0002 17.9705C21.9785 17.984 21.9654 17.993 21.9524 18.0064C21.9307 18.0199 21.9177 18.0424 21.9177 18.0559C21.9047 18.0783 21.9047 18.1053 21.9047 18.1277C21.9047 18.1412 21.9047 18.1637 21.9177 18.1906C21.9177 18.2041 21.9307 18.2266 21.9524 18.24C21.9654 18.2535 21.9741 18.2625 22.0002 18.276C22.0219 18.2895 22.0479 18.2895 22.0609 18.2895C22.0826 18.2895 22.1087 18.2895 22.1304 18.276C22.1434 18.2625 22.1651 18.2535 22.1781 18.24C22.1911 18.2266 22.1998 18.2041 22.2128 18.1906C22.2259 18.1637 22.2259 18.1412 22.2259 18.1277ZM22.3647 12.526H22.304L22.2345 12.6832L22.1651 12.526H22.1043V12.7686H22.1391V12.5844L22.2085 12.7416H22.2562L22.317 12.5844V12.7686H22.3647V12.526ZM22.5557 8.90977C22.5557 5.48672 19.8604 2.69707 16.5444 2.69707C15.3639 2.69707 14.205 3.06543 13.2241 3.73477C16.3535 6.39863 16.4012 11.4389 13.2241 14.0893C14.205 14.7631 15.3726 15.127 16.5444 15.127C19.8604 15.1314 22.5557 12.3463 22.5557 8.90977Z" fill="black" />
                                </svg>
                                <svg width="22" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.41683 20.5625C1.26622 20.5625 0.333496 19.5967 0.333496 18.4062V2.59375C0.333496 1.40287 1.26622 0.4375 2.41683 0.4375H23.2502C24.4003 0.4375 25.3335 1.40287 25.3335 2.59375V2.70291H22.0566L21.3187 4.83984L20.5852 2.70291H16.3665V5.54063L15.1469 2.70291H11.7354L8.1894 10.9986H11.0453V18.3568H19.8864L21.271 16.7801L22.6555 18.3568H25.3335V18.4062C25.3335 19.5967 24.4003 20.5625 23.2502 20.5625H2.41683ZM21.2797 15.3516L19.4481 17.4314H17.2823L20.212 14.2105L17.2823 10.9537H19.5132L21.3144 13.0516L23.1373 10.9537H25.3335L22.3821 14.1926L25.3335 17.4314H23.1026L21.2797 15.3516ZM25.3335 12.3373V16.0793L23.6278 14.1971L25.3335 12.3373ZM13.6842 15.94H17.2866V17.4314H11.9915V10.9986H17.2866V12.4855H13.6842V13.4918H17.1955V14.9428H13.6842V15.9445V15.94ZM23.6538 5.54512L22.0522 10.0643H20.5592L18.962 5.55859V10.0643H17.2823V3.62695H19.9385L21.3231 7.63848L22.7206 3.62695H25.3335V10.0643H23.6538V5.54512ZM14.8517 8.775H11.9915L11.475 10.0643H9.60867L12.317 3.62695H14.5392L17.2866 10.0643H15.3726L14.8517 8.775ZM13.4194 5.22168L12.5731 7.32852H14.2614L13.4194 5.22168Z" fill="black" />
                                </svg>
                                <svg width="22" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.7371 9.39043C20.7371 9.39043 21.067 11.0615 21.1408 11.4119H19.6911C19.8344 11.0121 20.3856 9.45781 20.3856 9.45781C20.3769 9.47129 20.5288 9.04902 20.6156 8.78848L20.7371 9.39043ZM25.3335 2.59375V18.4062C25.3335 19.5967 24.4003 20.5625 23.2502 20.5625H2.41683C1.26666 20.5625 0.333496 19.5967 0.333496 18.4062V2.59375C0.333496 1.40332 1.26666 0.4375 2.41683 0.4375H23.2502C24.4003 0.4375 25.3335 1.40332 25.3335 2.59375ZM6.95242 13.8781L9.69547 6.90625H7.85086L6.14513 11.668L5.9585 10.7021L5.35086 7.49473C5.25103 7.05 4.94287 6.92422 4.56093 6.90625H1.75277L1.72238 7.04551C2.40815 7.2252 3.02013 7.48574 3.55398 7.81367L5.1078 13.8781H6.95242ZM11.0496 13.8871L12.1434 6.90625H10.3986L9.30919 13.8871H11.0496ZM17.1217 11.6051C17.1304 10.81 16.6616 10.2035 15.659 9.70488C15.047 9.38594 14.6738 9.17031 14.6738 8.84238C14.6825 8.5459 14.9906 8.24043 15.6764 8.24043C16.245 8.22695 16.6616 8.36621 16.9741 8.50547L17.1304 8.58184L17.3691 7.07246C17.0262 6.9332 16.4793 6.77598 15.8066 6.77598C14.0835 6.77598 12.8726 7.72832 12.8639 9.08496C12.8509 10.0867 13.7319 10.6438 14.3917 10.9807C15.0644 11.3221 15.2944 11.5467 15.2944 11.8477C15.2858 12.3148 14.7476 12.5305 14.2484 12.5305C13.554 12.5305 13.1807 12.4182 12.6121 12.1576L12.3821 12.0453L12.1391 13.6131C12.547 13.8062 13.3022 13.977 14.0835 13.9859C15.9151 13.9904 17.1087 13.0516 17.1217 11.6051ZM23.2502 13.8871L21.8439 6.90625H20.4941C20.0774 6.90625 19.7606 7.03203 19.5826 7.48574L16.9915 13.8871H18.8231C18.8231 13.8871 19.1226 13.0246 19.1877 12.8404H21.4272C21.4793 13.0875 21.6356 13.8871 21.6356 13.8871H23.2502Z" fill="black" />
                                </svg>
                            </div>
                        </div>
                    </nav>
                </section>
            </section>
            <div className="w-4/5 m-10 pb-20 lg:pb-0 text-[10px] md:text-xs mx-auto text-center leading-3">
                <p>Urban Fits L.L.C., Company Reg. Number - 2447 LLC 2023, Registered Office Address - 500 4th St NW Suite 102 PMB 1958 Albuquerque, NM 87102 <br /> Urban Fits L.L.C. © 2023-2024 All rights reserved.</p>
            </div>
        </footer>
    </>
}