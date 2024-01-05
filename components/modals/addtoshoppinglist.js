import React, { useEffect, useState } from 'react'
import BounceLoader from '../loaders/bounceLoader';
import useShoppingList from '@/hooks/useShoppingList';
import Link from 'next/link';

export default function AddToShopListModal({ setAddToListModal, product_id }) {
    const { lists, getShoppingLists, addToShoppingList, removeFromShoppingList, listLoading } = useShoppingList();

    useEffect(() => {
        if (!lists || !lists.length) getShoppingLists()
    }, [])

    return <div className={`w-full h-full font_urbanist fixed inset-0 z-[100] bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all duration-500`}>
        <div className={`relative w-11/12 md:w-3/5 lg:w-[30rem] text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500`}>
            <button onClick={() => setAddToListModal(false)} className="material-symbols-rounded text-lg md:text-2xl lg:text-3xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
            <section className="w-full h-full p-6">
                <h2 className="text-black md:text-lg lg:text-xl font_urbanist_bold">Save to Shopping List...</h2>

                {listLoading && <div className="flex justify-center"><BounceLoader /></div>}
                <div className="w-full h-[20rem] my-5 md:mt-8 flex flex-col gap-y-2 md:gap-y-3 overflow-hidden overflow-y-scroll">
                    {lists && lists.length ? lists.map((list, index) => <>
                        <div key={index} className="w-full py-2 px-4 border rounded-xl flex justify-between items-center font_urbanist_medium">
                            <span className="flex-1 flex items-center gap-x-2 text-sm md:text-base lg:text-lg">
                                <input id={list._id} value={list.products.includes(product_id)} checked={list.products.includes(product_id)} onChange={() => {
                                    if (list.products.includes(product_id)) removeFromShoppingList(list._id, product_id)
                                    else addToShoppingList(list._id, product_id)
                                }} type="checkbox" />
                                <label htmlFor={list._id} className='flex-1 truncate cursor-pointer'>{list.name}</label>
                            </span>
                            <Link href={`/user/shopping-lists/${list._id}`} className="fa-regular fa-folder-open p-3" />
                        </div>
                    </>) : "You don't have any shopping list yet."}
                </div>
                <Link href="/user/shopping-lists" className="w-full flex items-center py-2 px-4 font_urbanist_medium text-sm md:text-base">
                    <span className="material-symbols-outlined">edit_note</span>
                    &nbsp;&nbsp;&nbsp;Create a shopping list
                </Link>
            </section>
        </div>
    </div>
}