"use client"
import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
interface ProductExt extends Products {
    totalPrice: number
}
export default function page() {
    const { data: session, status } = useSession()
    const [product, setProduct] = useState([])
    useEffect(() => {
        if (status === 'authenticated') {
            const res = async () => {
                const data = await axios.post('/api/product/cart', {
                    name: session?.user?.name
                }).then((d) => setProduct(d.data.product))
            }
            res()
        }
    }, [status])

    const handleDelete = async (i: number, id: string) => {
        const updatedProduct = product.filter((_, index) => index !== i);
        setProduct(updatedProduct);
        const res = await axios.post('/api/product/cart/delete', {
            productId: id,
            name: session?.user?.name
        })
    }

    return (
        <div className="w-full my-20 flex flex-col gap-4 items-center">
            <h1 className="font-bold text-xl text-center">Your Cart</h1>
            <div className="grid gap-2 lg:flex lg:flex-wrap lg:justify-center">
                {status === 'authenticated' ? (
                    <>
                        {product.length > 0 ? (
                            <>
                                {product.map((prod: ProductExt, i) => {
                                    return (
                                        <div key={i} className="flex gap-4 border rounded-lg shadow-md shadow-slate-300 overflow-hidden px-3 py-1">
                                            <Link href={`/products/${prod.id}`} className="relative w-32 h-full">
                                                <Image src={prod.image! as string} alt="product" fill />
                                            </Link>
                                            <div>
                                                <Link href={`/products/${prod.id}`}>{prod.title}</Link>
                                                <p>Rp.{prod.price?.toLocaleString()} x {prod.Cart}</p>
                                                <p>Total : Rp. {prod.totalPrice.toLocaleString()}</p>
                                                <button onClick={() => handleDelete(i, prod.id!)} className="bg-red-500 text-white px-3 py-1 rounded-lg transition-all hover:bg-red-700">Delete</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                <p className="text-center text-lg font-semibold">You Have No Cart</p>
                            </>
                        )}
                    </>
                ) : (
                    <div className="grid gap-2 lg:flex lg:flex-wrap lg:justify-center">
                        <div className="w-[318px] h-[114px] animate-pulse rounded-lg shadow-md shadow-slate-300">
                            <div className="w-[200px] h-[90px]">

                            </div>
                        </div>
                        <div className="w-[318px] h-[114px] animate-pulse rounded-lg shadow-md shadow-slate-300">
                            <div className="w-[200px] h-[90px] animate-pulse">

                            </div>
                        </div>
                        <div className="w-[318px] h-[114px] animate-pulse rounded-lg shadow-md shadow-slate-300">
                            <div className="w-[200px] h-[90px]">

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
