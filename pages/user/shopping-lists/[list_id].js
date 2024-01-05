import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import DeleteAction from '@/components/modals/deleteAction';
import RenameShopListModal from '@/components/modals/renameshoppinglist';
import Shoppingcard from '@/components/cards/shoppingcard';
import useShoppingList from '@/hooks/useShoppingList';
import axios from 'axios';
import Head from 'next/head';
import mongoose from 'mongoose';
import Image from 'next/image';
const emptyWishlist = 'https://urban-fits.s3.eu-north-1.amazonaws.com/website-copyrights/emptyWishlist.jpg';

export default function Product({ shoppinglist }) {
    const { deleteShoppingList, listLoading } = useShoppingList()
    const { products } = shoppinglist
    const [renameListModal, setRenameListModal] = useState(null)
    const [deleteModal, setDeleteModal] = useState(null)

    return <>
        <Head><title className='capitalize' >{`${shoppinglist.name} - Urban Fits`}</title></Head>
        {deleteModal}
        {renameListModal}
        <main className="w-full pb-20 bg-white font_urbanist overflow-hidden">
            <div className="flex md:hidden w-full p-4 border-b border-gray-50 justify-between items-center">
                <Link href="/user/shopping-lists" className='fa-solid fa-chevron-left text-xl'></Link>
                <h1 className="font_urbanist_medium text-lg">{shoppinglist.name}</h1>
                <i className='w-0 h-0' />
            </div>
            <section className='w-full p-5 md:p-7 lg:p-14 xl:p-16 2xl:p-24 !pt-0 h-full font_urbanist text-left' >
                <div className="w-full my-4 md:my-7 flex justify-between items-center">
                    <h1 className="font_urbanist_bold capitalize text-lg md:text-xl lg:text-2xl">{shoppinglist.name}</h1>
                    <div className="flex items-center gap-x-4">
                        <button onClick={() => setDeleteModal(<DeleteAction
                            heading={`Delete ${shoppinglist.name}`}
                            loading={listLoading}
                            show={true}
                            setDeleteModal={setDeleteModal}
                            onTakeAction={async () => { await deleteShoppingList(list._id); useRouter().push("/user/shopping-lists") }}
                        />)} className="fa-regular fa-trash-can text-sm hover:bg-black hover:text-white transition-all px-3 py-2 rounded-full" />
                        <button onClick={() => setRenameListModal(<RenameShopListModal
                            show={true}
                            setRenameListModal={setRenameListModal}
                            list={shoppinglist}
                        />)} className="fa-regular fa-pen-to-square text-sm hover:bg-black hover:text-white transition-all px-3 py-2 rounded-full" />
                    </div>
                </div>
                {products.length === 0 ? <section className="w-full layout_height flex flex-col justify-center items-center gap-y-3 md:gap-y-5">
                    <Image width={250} height={250} src={emptyWishlist} alt='Wishlist is empty' />
                    <h2 className="font_urbanist_bold text-lg lg:text-xl">Your Shopping List is Empty</h2>
                    <p className="font_urbanist text-sm">Add items by clicking on the little plus icon.</p>
                    <Link href='/' className="font_urbanist mt-2 text-sm bg-gray-100 px-4 py-1 rounded-full">Go Shopping</Link>
                </section>
                    :
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-3 xl:gap-8 2xl:gap-14">
                        {products && products.length ? products.map((product, index) => {
                            return <Shoppingcard key={index} product={product} />
                        }) : null}
                    </div>
                }
            </section>
        </main>
    </>
}
export async function getServerSideProps(context) {
    const { list_id } = await context.query
    if (!mongoose.Types.ObjectId.isValid(list_id)) return {
        redirect: {
            destination: '/404',
            permanent: false,
        },
    };
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/shopping-list/populate-list?list_id=${list_id}`)
        return { props: { shoppinglist: data.shoppinglist } }
    }
    catch (error) {
        console.error(error);
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }
}