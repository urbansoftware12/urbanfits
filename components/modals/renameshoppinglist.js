import { useState } from 'react'
import Button from '../buttons/simple_btn';
import useShoppingList from '@/hooks/useShoppingList';

export default function RenameShopListModal({ show, setRenameListModal, list }) {
    const { renameShoppingList } = useShoppingList();
    const [listname, setListname] = useState('')

    if(show)return <div className={`${show ? null : "opacity-0 pointer-events-none"} w-full h-full font_urbanist fixed inset-0 z-[100] bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500`}>
        <div className={`${show ? null : "scale-0"} relative w-11/12 md:w-3/5 lg:w-[33rem] text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500`}>
            <button onClick={() => setRenameListModal(false)} className="material-symbols-rounded text-3xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
            <section className="w-full h-full p-6">
                <div className="w-full space-y-5">
                    <h2 className="text-black md:text-lg lg:text-xl font_urbanist_bold">Rename '{list.name}'</h2>
                    <p className='text-xs md:text-sm'>Generate a comprehensive shopping list for Urban Fits, incorporating the latest trends and essential items.</p>
                </div>
                <div className="relative w-full mt-5 data_field flex items-center border-b border-b-gray-200 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-6">
                    <input className="w-full bg-transparent outline-none border-none" type="text" name="listname" id="listname" value={listname} onChange={(e) => setListname(e.target.value)} placeholder="eg. My shopping list" />
                </div>
                <Button disabled={!listname} onClick={async () => { await renameShoppingList(list._id, listname); setRenameListModal(false) }} my="my-2" classes="w-full text-sm md:text-base text-center">Rename List</Button>
            </section>
        </div>
    </div>
}