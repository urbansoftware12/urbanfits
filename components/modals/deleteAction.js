import React, { useState } from 'react'
import Button from '../buttons/simple_btn'
import Spinner from '../loaders/spinner'

export default function DeleteAction(props) {
    const [actionValue, setActionValue] = useState('')
    if (props.show) return <div className={`${props.show ? null : "opacity-0 pointer-events-none"} w-full h-full font_urbanist fixed inset-0 z-[100] bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500`}>
        <div className={`${props.show ? null : "scale-0"} relative w-11/12 md:w-3/5 lg:w-[33rem] text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500`}>
            {props.loading ? <div className='w-full h-32 flex justify-center items-center' >
                <Spinner forBtn={true} variant="border-black" />
            </div> :
                <><button onClick={() => { props.setDeleteModal(null); setActionValue('') }} name="deleteModal" className="material-symbols-rounded text-3xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
                    <section className="w-full h-full p-6">
                        <div className="w-full space-y-3">
                            <h2 className="text-black font_urbanist_bold text-base md:text-lg lg:text-xl">{props.heading}</h2>
                            <p className='text-sm text-red-500'>{props.msg}</p>
                            <p className='text-sm '>Please type <span className='text-red-600' >"delete"</span> here to proceed.</p>
                        </div>
                        <div className="relative w-full mt-5 data_field flex items-center border-b border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-6">
                            <input className="w-full bg-transparent outline-none border-none" autoComplete="off" type="text" name="delete" id="delete" value={actionValue} onChange={(e) => setActionValue(e.target.value)} placeholder="delete" />
                        </div>
                        <div className="w-full mt-7 flex gap-x-2">
                            <Button my="0" onClick={() => { props.setDeleteModal(null); setActionValue('') }} bg="bg-gray-100" text="black" classes="w-1/2" font='font_urbanist_medium'>Cancel</Button>
                            <Button my="0" disabled={actionValue !== "delete"} classes="w-1/2" onClick={() => {
                                props.onTakeAction();
                                setActionValue('');
                                props.setDeleteModal(null)
                            }}>Delete</Button>
                        </div>
                    </section></>
            }
        </div>
    </div>
}