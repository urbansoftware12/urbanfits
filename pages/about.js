import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import OneTimeLoader from '@/components/loaders/onetimeLoader';
const AboutComponent = dynamic(() => import('@/components/aboutComponent'), { loading: () => <OneTimeLoader /> });

const About = () => {
    if (window.matchMedia('(max-width: 1000px)').matches) return <div className="w-full h-screen flex justify-center items-center font_urbanist_medium text-2xl tracking-expand">ABOUT US</div>
    const [loading, setLoading] = useState(<OneTimeLoader />)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 6000);
    }), []
    return <>
        {loading}
        <AboutComponent />
    </>
};
export default About;