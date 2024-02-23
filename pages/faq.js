import { useState } from 'react'
import LinkBtn from '@/components/buttons/link_btn';
import FAQs from '@/static data/faqs';
import Button from '@/components/buttons/simple_btn';

export const Accordian = (props) => {

    return (
        <div className="group outline-none accordion-section mb-7 border-b border-b-gray-300" tabIndex={props.index} >
            <div className="group flex justify-between py-3 items-center text-gray-700 transition ease duration-500 cursor-pointer pr-10 relative">
                <div className="group-focus:text-black font_urbanist_medium transition ease duration-500">
                    {props.title}
                </div>
                <i className={`fa-solid fa-caret-down group-focus:-rotate-180 absolute top-1/2 -translate-y-1/2 right-0 mb-auto ml-auto mt-2 mr-2 transform transition ease duration-500`}></i>
            </div>
            <div className="group-focus:max-h-screen max-h-0 bg-white rounded overflow-hidden ease duration-500">
                <p className="p-2 text-gray-900 text-justify" dangerouslySetInnerHTML={{ __html: props.children }}></p>
            </div>
        </div>
    )
}

export default function index() {

    const faqs = ['All', 'Frequently Asked Questions', 'Orders', 'Delivery', 'Returns & Refund', 'My Account', 'Payments', 'Shopping', 'Sizing']
    const [faqHeading, setFaqHeading] = useState(faqs[0]) // For Catefory headings
    const [query, setQuery] = useState('') // For search bar query
    const [faqData, setFaqData] = useState(FAQs) // For search bar query
    const getFaqs = (e) => {
        let name = e.target.name
        setQuery('')
        setFaqHeading(name)
        if (name.toLowerCase() == "all") return setFaqData(FAQs)
        const filtered = FAQs.filter((faq) =>
            // faq.question.toLowerCase().includes(query.toLowerCase()) ||
            faq.tags.includes(name.toLowerCase())
        );
        setFaqData(filtered);
    };

    const onSearch = (e) => {
        let term = e.target.value
        setQuery(term)
        const filtered = FAQs.filter((faq) =>
            faq.q.toLowerCase().includes(query.toLowerCase()) ||
            faq.tags.includes(term.toLowerCase())
        );
        setFaqData(filtered);
    }
    return <main className='bg-white w-full p-5 md:p-10 lg:p-0 lg:pt-9 lg:w-70pr h-full mx-auto font_urbanist text-left pt-9' >
        <h2 className="font_urbanist_bold text-2xl md:text-4xl lg:text-[44px] mb-5 lg:mb-16">FAQ</h2>
        {/*                                         Search Bar */}
        <div className='w-full h-[42px] md:h-12 bg-white px-5 py-1 lg:py-2 flex justify-start items-center border border-gray-400 rounded-full' >
            <i className="fa-solid fa-magnifying-glass mr-4 text-xl"></i><input type="text" className="bg-transparent outline-none border-none w-full h-full" onChange={onSearch} value={query} placeholder='Type a Question here' />
        </div>

        {/*                                         pill buttons */}
        <div className="my-8 w-full flex flex-wrap space-x-2">
            {faqs.map(faq => {
                return <Button name={faq} onClick={getFaqs} fontSize='text-xs md:text-sm' classes="mr-3 px-3 md:px-5 whitespace-nowrap" height='h-8 md:h-[37px]' my="my-1" text={faqHeading == faq ? 'white' : 'black'} bg={faqHeading == faq ? 'bg-black' : 'bg-gray-50 border border-gray-300'}>{faq}</Button>
            })}
        </div>

        {/*                                        Accordians section                                                  */}
        <section className="w-full min-h-[30vh] my-10 mx-auto">
            <h1 style={{ display: query !== '' ? "none" : "block" }} className="font_urbanist_medium text-xl md:text-[22px] mb-7">{faqHeading}</h1>
            <h1 style={{ display: query == '' ? "none" : "block" }} className="font_urbanist_medium text-xl md:text-[22px] mb-7">Search : {query}</h1>
            <div className="w-full overflow-hidden">
                {
                    faqData.map((faq, i) => {
                        return <Accordian index={i} title={faq.q} >{faq.a}</Accordian>
                    })
                }
            </div>
        </section>
        <div className={`w-full my-10 p-8 pb-4 justify-center items-center md:items-start rounded-2xl bg-white card_boxshadow flex flex-col transition duration-500`}>
            <h2 className="font_urbanist_bold text-center md:text-left text-xl md:text-2xl">Can't find answer to your question?</h2>
            <LinkBtn href="/contact" classes="w-[150px] h-11 text-sm" font='font_urbanist_medium' fontSize='text-xs md:text-sm' >CONTACT US</LinkBtn>
        </div>
    </main>
}