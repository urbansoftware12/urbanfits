import Button from '@/components/buttons/simple_btn';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Tooltip from '../components/tooltip';

export default function Trackorder() {

    const validatedSchema = Yup.object({
        orderemail: Yup.string().email().required("Please enter your email address"),
        ordernumber: Yup.string().matches(/^\d{9,20}$/, "Order Number should'nt contain spaces and must be between 9 and 20 digits").required("Please enter your order number")
    })
    const { values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit } = useFormik({
        initialValues: { orderemail: '', ordernumber: '' },
        validationSchema: validatedSchema,
        onSubmit: (values) => {
            console.log(values)
            handleReset()
        }
    })
    return <main className='bg-white w-full h-full transition-all duration-700 overflow-y-scroll'>
        <div className="mx-5 md:w-4/5 md:mx-auto lg:w-70pr my-20">
            <h2 className="text-2xl md:text-4xl lg:text-[44px] font_urbanist_medium mb-8">Track Your Order</h2>
            <form className="w-full mt-16 pb-10 lg:pb-0 font_urbanist text-sm space-y-10" onReset={handleReset} onSubmit={handleSubmit} >
                <h3 className="text-lg md:text-xl lg:text-[22px] font_urbanist_medium">Enter Your Order Information</h3>
                <p className='font_urbanist_light'>Enter your email address and order number in the space below and we will provide you with a list of the items you ordered and the relevant shipping information. If you have only just confirmed your order, this information will appear in a few minutes.</p>
                <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                    {touched.orderemail && errors.orderemail ? <Tooltip classes="form-error" content={errors.orderemail} /> : null}
                    <input className="w-full bg-transparent outline-none border-none" type="email" name="orderemail" id="orderemail" value={values.orderemail} onBlur={handleBlur} onChange={handleChange} placeholder="Order Email*" />
                </div>
                <div className="flex flex-col justify-end">
                    <div className="relative w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4">
                        {touched.ordernumber && errors.ordernumber ? <Tooltip classes="form-error" content={errors.ordernumber} /> : null}
                        <input className="w-full bg-transparent outline-none border-none" type="number" name="ordernumber" id="ordernumber" value={values.ordernumber} onBlur={handleBlur} onChange={handleChange} placeholder="Order Number*" />
                    </div>
                    <small className='self-end text-gray-500 my-3' >9 to 20 digits, no spaces</small>
                </div>
                <div className="font_urbanist_light w-full my-10 space-y-5">
                    <p>Urban Fits processes the data collected to enable you to manage your information to facilitate your order. To find out more about how we manage your personal data and exercise your rights please refer to our privacy policy.</p>
                    <p>Mandatory information : If you choose not to consent to the collection of mandatory data (with an asterisk). You will not be able to manage your information.</p>
                </div>
                <div className="w-full flex justify-start space-x-4">
                    <Button type="submit" classes="w-full md:w-40 font_urbanist_medium">Continue</Button>
                </div>
            </form>
        </div>
    </main>
}