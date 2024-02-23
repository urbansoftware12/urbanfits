import Link from 'next/link'
import PoliciesPage from '.'
import { useRouter } from 'next/router'

const MenuLink = (props) => {
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const scrollOptions = {
                behavior: 'smooth',
                block: 'center',
            };
            section.scrollIntoView(scrollOptions);
        }
    }
    const path = useRouter().pathname
    return <span onClick={() => { scrollToSection(props.href) }} className={`${path.includes(props.href) ? 'bg-gold-land lg:bg-none lg:underline text-white lg:text-black active' : 'bg-gray-200 lg:bg-transparent text-black'} select-none cursor-pointer flex lg:block justify-center items-center px-4 py-1 mx-2 lg:m-0 lg:p-0 whitespace-nowrap rounded-full lg:rounded-none text-[10px] lg:text-xs 2xl:text-base hover:underline`}>{props.children}</span>
}

export default function PrivacyPolicy() {
    return (
        <PoliciesPage>
            <main className="w-full max-w-[2000px] mx-auto lg:flex scroll-smooth">
                <section className={`lg:w-1/4 lg:h-auto lg:max-h-none rounded-2xl lg:rounded-none transition-all duration-500 overflow-x-scroll overflow-y-hidden lg:overflow-visible hide_scrollbar`}>
                    <div id='menu_container' className="lg:sticky lg:top-16 lg:left-0 lg:right-0 w-auto lg:w-full py-8 2xl:py-10 lg:px-7 gap-y-4 flex lg:flex-col lg:bg-gray-50 font_urbanist rounded-2xl">
                        <h1 className="hidden lg:block mb-3 2xl:mb-5 font_urbanist_bold">Quick Links</h1>
                        <MenuLink href='question1' >1. Responsibility of your Personal Data</MenuLink>
                        <MenuLink href='question2' >2. What personal data do we process?</MenuLink>
                        <MenuLink href='question3' >3. About Cookies</MenuLink>
                        <MenuLink href='question4' >4. Do we profile your personal data?</MenuLink>
                        <MenuLink href='question5' >5. Your rights and exercism</MenuLink>
                        <MenuLink href='question6' >6. Securtiy measures</MenuLink>
                        <MenuLink href='question7' >7. Who can access your data?</MenuLink>
                        <MenuLink href='question8' >8. Data transferred outside of European Union</MenuLink>
                    </div>
                </section>
                <section className="w-full lg:w-3/4 md:px-4 lg:pl-10 xl:pl-16 text-xs md:text-sm scroll-smooth">
                    <h1 className="font_urbanist_bold text-xl mb-7">Privacy Policy</h1>
                    <small className="text-gray-600 italic" >Effective Date: 1-3-2024</small> <br /> <br />
                    URBAN FITS attaches great importance to the protection of your privacy.<br />
                    Our Privacy Policy describes how and why we process your personal data and provides you with information about your rights. It is drafted in accordance with the requirements of the GDPR.<br />
                    The Policy applies only to personal data collected via our website www.urbanfits.ae and in our stores. <br />
                    Please note that some sections, at the end, are applicable to residents of named territories, outside the European Union, with local privacy regulations requiring specificities in addition to the requirements of the GDPR.<br /><br /><br />
                    <h1 id='question1' className="mb-2 text-base lg:text-lg font_urbanist_medium">1. Who is responsible for processing your personal data?</h1>
                    The data controller is URBAN FITS, having its registered office at Dubai United Arab Emirates and registered in the Dubai Trade and Companies Register under the number 0000000.<br />
                    Email address: support@urbanfits.ae<br />
                    Telephone number: +971500000000<br />
                    Urban Fits ensures that its processing of personal data is lawful, justified by a valid legal basis and that the data is kept for a reasonable period of time necessary for the operations for which it was collected, in compliance with the legislation in force and taking into account the limitation periods.<br /><br />
                    <h1 id='question2' className="mb-4 text-base lg:text-lg font_urbanist_medium">2. What personal data do we process? For what purpose? On what legal basis? For how long?</h1>
                    <div className="w-full overflow-x-scroll scrollbar_x">
                        <small className="text-gray-600 italic lg:hidden" >Scroll to view full table <i class="fa-solid fa-arrow-right" /></small>
                        <table className='w-full min-w-[700px] border border-black' border="2" >

                            <tr className='bg-gotham-black font_urbanist_bold text-sm' >
                                <td colSpan={0.5} className='p-5 text-white text-center border-r border-white' >Types of Data</td>
                                <td className='p-5 text-white text-center border-r border-white' >Purposes</td>
                                <td className='p-5 text-white text-center border-r border-white' >Legal Basis</td>
                                <td className='p-5 text-white text-center border-r border-black' >Maximum Retention Perios</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Title, surname, first name, e-mail address, telephone number, subject, free text area</td>
                                <td className='p-2 border-r border-black' >To respond when you contact us via the contact form</td>
                                <td className='p-2 border-r border-black' >Consent</td>
                                <td className='p-2 border-r border-black' >Time to process your application</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Free text area</td>
                                <td className='p-2 border-r border-black' >To respond to you when you contact us via online chat</td>
                                <td className='p-2 border-r border-black' >Consent</td>
                                <td className='p-2 border-r border-black' >Time to process your application</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Email address, title, subject of preference</td>
                                <td className='p-2 border-r border-black' >To send you our newsletter following your registration</td>
                                <td className='p-2 border-r border-black' >Consent</td>
                                <td className='p-2 border-r border-black' >Until you unsubscribe</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Title, surname, first name, e-mail address, password, birthday.</td>
                                <td className='p-2 border-r border-black' >To create your customer account</td>
                                <td className='p-2 border-r border-black' >Consent</td>
                                <td className='p-2 border-r border-black' >3 years from the last time you show interest / until you delete your account</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Title, surname, first name, email address, postal address, password, birthday, bank details.</td>
                                <td className='p-2 border-r border-black' >To manage personal information in the customer account and allow it to be updated by the person concerned</td>
                                <td className='p-2 border-r border-black' >Consent</td>
                                <td className='p-2 border-r border-black' >3 years from the last time you show interest / until you delete your account</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Title, surname, first name, e-mail address, birthday</td>
                                <td className='p-2 border-r border-black' >To promote customer/leads relations by sending personalized messages for the birthday of the persons concerned</td>
                                <td className='p-2 border-r border-black' >Consent</td>
                                <td className='p-2 border-r border-black' >3 years from the last time you show interest / until you delete your account / Until you unsubscribe</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Title, surname, first name, e-mail address, date of birth, preferences with respect to Urban Fits products and services, products ordered / purchasing habits, purchase history, date of last purchase, purchase amount, clothing size / pages consulted</td>
                                <td className='p-2 border-r border-black' >To personalise your experience once you have an account at Urban Fits and to send you personalised commercial communications based on your profile at Urban Fits.</td>
                                <td className='p-2 border-r border-black' >Consent</td>
                                <td className='p-2 border-r border-black' >3 years from the last time you show interest / Until you delete your account / Until you unsubscribe</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Email address, title, first name, surname, company, postal address, telephone number, order number</td>
                                <td className='p-2 border-r border-black' >Manage your order</td>
                                <td className='p-2 border-r border-black' >Contractual</td>
                                <td className='p-2 border-r border-black' >3 years from the last time you show interest.</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Bank details</td>
                                <td className='p-2 border-r border-black' >Paying for your order</td>
                                <td className='p-2 border-r border-black' >Contractual</td>
                                <td className='p-2 border-r border-black' >Time to process the payment of the order</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Billing data for the sales done via the website</td>
                                <td className='p-2 border-r border-black' >Accounting management</td>
                                <td className='p-2 border-r border-black' >Legal obligation</td>
                                <td className='p-2 border-r border-black' >10 years from the date of the invoice for intermediate storage</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Name, first name, postal address, e-mail address, telephone, bank details</td>
                                <td className='p-2 border-r border-black' >Carrying out anti-fraud checks on credit and debit card purchases</td>
                                <td className='p-2 border-r border-black' >Legitimate interest</td>
                                <td className='p-2 border-r border-black' >Time to carry out the control</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Email address, title, first name, surname, company, postal address, telephone number, order number</td>
                                <td className='p-2 border-r border-black' >After-sales service and implementation of legal guarantees on products</td>
                                <td className='p-2 border-r border-black' >Legal obligation</td>
                                <td className='p-2 border-r border-black' >5 years for archiving to comply with legal guarantees</td>
                            </tr>
                            <tr className='border border-black' >
                                <td className='p-2 border-r border-black' >Name, first name, postal address, email address <br /> Data concerning the request and the answer given <br />Copy of an identity document only in case of doubt</td>
                                <td className='p-2 border-r border-black' >Handling requests for access, rectification, objection and your other rights under the EU Regulation</td>
                                <td className='p-2 border-r border-black' >Legal obligation</td>
                                <td className='p-2 border-r border-black' >The time necessary to process the request in active base, then archiving for conservation of proof of compliance with our legal obligations. Copy of identity document: deletion after verification of the applicant's identity</td>
                            </tr>
                        </table>
                    </div>
                    Mandatory data collection is indicated by an asterisk in the collection form. <br /><br />
                    <h1 id='question3' className="mb-2 text-base lg:text-lg font_urbanist_medium">3. About Cookies</h1>
                    <p>
                        The site uses cookies. During your visits, utility cookies, solely dedicated to the proper functioning of the website, may be automatically installed on your browse.  <br />
                        Some cookies are necessary and must always be active to ensure the proper functioning of our site. <br />
                        Other cookies (personalisation, audience measurement, advertising, etc.) are deposited only after obtaining your specific consent. Rejecting these cookies may affect your navigation of our site and the way we interact with you. <br /><br />
                        <span className='italic text-gray-500' >What is a cookie?</span>  <br />
                        A cookie is a small text file placed on your computer, smartphone, tablet or other device when you visit a website. <br />
                        The cookie helps us recognise your device the next time you visit our website. There are other similar technologies such as pixel tags (transparent graphic images placed on a web page or in an email, which indicate that a page or email has been viewed), web bugs (similar to pixel tags), and web storage, which are used in desktop software or mobile devices. There are also technologies such as mobile device identifiers and SDK (software development kit) integrations to help companies recognise your device when you return to an app or otherwise use a service. <br /><br />
                        <span className='italic text-gray-500' >What cookies are on our sites?</span> <br />
                        We do not use cookies that store sensitive personal data. <br />
                        To find out which cookies are present on our site and to change your preferences at any time, we invite you to visit the "Customize Cookies" page at the bottom of each page of the site or via the following link. <br /><br />
                        <span className='italic text-gray-500' >Third party cookies:</span> <br />
                        Our site contains computer applications from third parties, namely Facebook, Twitter, Instagram, Google, YouTube, Snapchat, TikTok, Apple and Pinterest, which allow you to share content on our site with other people or to let these other people know your consultation or your opinion concerning content on our site (for example via the "Share" or "Like" buttons from social networks) <br /><br />
                        Such an application button may allow the social network concerned to identify you, even if you did not use this button when you consulted our site, to follow your browsing on our site, simply because your account with the social network concerned was activated on your terminal (open session) during your browsing on our site. <br /><br />
                        When you leave our website, we have no control over the process used by the social networks to collect information relating to your browsing and we invite you to consult their privacy protection policies to learn about the purposes of use, including advertising, of the browsing information they may collect when you visit their platforms. These protection policies should allow you to exercise your choices and rights with these social networks, in particular by setting up your accounts for each of these networks. <br /><br />
                        Links to the different privacy policies:  <br />
                        -&nbsp;&nbsp;&nbsp;&nbsp;Google : <Link href="https://policies.google.com/privacy" className='underline text-cyan-700' > https://policies.google.com/privacy</Link> <br />
                        -&nbsp;&nbsp;&nbsp;&nbsp;YouTube : <Link href="https://policies.google.com/privacy" className='underline text-cyan-700' > https://policies.google.com/privacy</Link> <br />
                        -&nbsp;&nbsp;&nbsp;&nbsp;Facebook : <Link href="https://www.facebook.com/privacy/explanation" className='underline text-cyan-700' > https://www.facebook.com/privacy/explanation</Link> <br />
                        -&nbsp;&nbsp;&nbsp;&nbsp;Twitter : <Link href="https://twitter.com/privacy" className='underline text-cyan-700' > https://twitter.com/privacy</Link> <br />
                        -&nbsp;&nbsp;&nbsp;&nbsp;Instagram : <Link href="https://help.instagram.com/519522125107875" className='underline text-cyan-700' > https://help.instagram.com/519522125107875</Link> <br />
                        -&nbsp;&nbsp;&nbsp;&nbsp;TikTok : <Link href="https://www.tiktok.com/legal/privacy-policy" className='underline text-cyan-700' > https://www.tiktok.com/legal/privacy-policy</Link> <br />
                        -&nbsp;&nbsp;&nbsp;&nbsp;Snapchat : <Link href="https://snap.com/privacy/privacy-policy" className='underline text-cyan-700' > https://snap.com/privacy/privacy-policy </Link> <br />
                        -&nbsp;&nbsp;&nbsp;&nbsp;Pinterest : <Link href="https://policy.pinterest.com/privacy-policy" className='underline text-cyan-700' > https://policy.pinterest.com/privacy-policy</Link> <br />
                        -&nbsp;&nbsp;&nbsp;&nbsp;Apple : <Link href="https://www.apple.com/legal/privacy/" className='underline text-cyan-700' > https://www.apple.com/legal/privacy/</Link> <br />
                    </p><br />
                    <h1 id='question4' className="mb-2 text-base lg:text-lg font_urbanist_medium">4. Do we profile your personal data?</h1>
                    <p>Urban Fits carries out profiling on the basis of your personal data, with your consent, with a view to personalising your experience when you have created an account on the site and to send you personalised commercial communications according to your profile.</p>
                    <h1 id='question5' className="mb-2 text-base lg:text-lg font_urbanist_medium">5. What are your rights and how can you exercise them?</h1>
                    <p>
                        Where the processing is based on your consent, you may withdraw it at any time, without prejudice to the lawfulness of the processing carried out prior to such withdrawal. <br />In accordance with the General Data Protection Regulation no. 2016/679 of 27 April 2016, you have the following rights: <br /> <br />
                        <ul className='list-disc pl-10' >
                            <li>Right of access: the right to be informed whether we hold your personal data, about how we process your personal data and to request access to the personal data we process;</li>
                            <li>Right of rectification/correction: the right to ask us to amend/correct or update your personal data where it is inaccurate or incomplete;</li>
                            <li>Right to erasure: the right to ask us to permanently delete your personal data;</li>
                            <li>Right of restriction: the right to ask us to temporarily or permanently stop processing all or part of your personal data;</li>
                            <li>Right to object: the right to refuse at any time the processing of your personal data for personal reasons and the right to refuse the processing of your personal data for direct marketing purposes;</li>
                            <li>Right to data portability: the right to request a copy of your personal data in electronic format and the right to transmit this personal data for use by a third party service;</li>
                            <li>Right not to be subject to automated decision making: the right not to be subject to a decision based solely on automated decision making, including profiling, where the decision would have a legal effect on you or would have a similar significant effect.</li>
                            <li>Right to determine the fate of your data post-mortem.</li>
                        </ul> <br />
                        To exercise your rights with Urban Fits, or for more information about our personal data protection policy, you may send a letter to the postal address Dubai, United Arab Emirates or an e-mail to support@urbanfits.ae <br />
                        All requests by post or e-mail must be signed and specify the address to which the reply should be sent. In case of doubt, you may be asked to provide a photocopy of an identity document in order to respond to your request. A reply will then be sent to you as soon as reasonably practicable within one month of receipt of the request. <br /><br />
                    </p>
                    <h1 id='question6' className="mb-2 text-base lg:text-lg font_urbanist_medium">6. What security measures have we put in place to protect your personal data?</h1>
                    <p>
                        We are committed to maintaining the confidentiality and integrity of your data. <br />
                        We have put in place appropriate technical and organizational security measures to protect your personal data against unauthorized use, accidental access, processing, erasure, loss or partial or total destruction. <br />
                        If you have any questions on this subject, please send a letter to the postal address Dubai, United Arab Emirates or an e-mail to support@urbanfits.ae. <br /><br />
                    </p>
                    <h1 id='question7' className="mb-2 text-base lg:text-lg font_urbanist_medium">7. Who else may have access to your personal data?</h1>
                    <p>
                        We provide personal information to our affiliates and other trusted companies or individuals who process it on our behalf, at our direction, in accordance with this Privacy Policy and other appropriate security and confidentiality measures. The list is available upon request. <br /><br />
                    </p>
                    <h1 id='question8' className="mb-2 text-base lg:text-lg font_urbanist_medium">8. Is your personal data transferred outside the European Union?</h1>
                    <p>
                        Your personal data may be transferred to and processed by third parties located outside the European Union, such as our affiliates <br />
                        In this case, we ensure that the transfer of your personal data is carried out in accordance with the applicable law and in particular either that the destination territory has been the subject of an adequacy decision by the European Union Commission, or that the recipient has validated the standard contractual clauses validated by the European Commission and or that appropriate technical and organizational contractual provisions have been put in place.<br /><br />
                    </p>
                    <small className="text-gray-600 italic" >Last Updated: 30-5-2023</small> <br /> <br />
                </section>
            </main>
        </PoliciesPage>
    )
}
