"use client"
import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function DescProduct(props: Products) {
    const { data: session, status } = useSession()
    const [number, setNumber] = useState(0)
    const [notLogged, setNotLogged] = useState(false)
    const handlePlus = () => {
        setNumber(number + 1)
    }

    const handleMines = () => {
        if (number !== 0) setNumber(number - 1)
    }

    const handleAddToCart = async () => {
        if (status === "authenticated") {
            if (number > 0) {
                const res = await axios.post('/api/product/cart/add', {
                    name: session.user?.name,
                    productId: props!.id!,
                    total: number,
                })
                if (res) alert('Added To Your Cart')
            }
        } else {
            setNotLogged(true)
        }
    }

    return (
        <div className="w-full mt-10 lg:mt-4">
            <div className="mx-4 grid justify-center gap-4">
                <h1 className="text-center font-bold text-lg">Product Description</h1>
                <div className="mt-2 w-full max-w-[840px]">
                    <div className="grid gap-2 border-2 rounded-lg px-4 py-2">
                        <div className="flex w-full gap-4">
                            <h1 className="w-[30%] lg:w-[15%] text-start font-semibold">Title</h1>
                            <p>:</p>
                            <p className="w-[70%] lg:w-full">{props.title}</p>
                        </div>
                        <hr className="border-b-2" />
                        <div className="flex w-full gap-4">
                            <h1 className="w-[30%] lg:w-[15%] text-start font-semibold">Price</h1>
                            <p>:</p>
                            <p className="w-[70%] lg:w-full">Rp. {props.price?.toLocaleString()}</p>
                        </div>
                        <hr className="border-b-2" />
                        <div className="flex w-full gap-4">
                            <h1 className="w-[30%] lg:w-[15%] text-start font-semibold">Rating</h1>
                            <p>:</p>
                            <p className="w-[70%] lg:w-full">{props.rating || 0}/5 ({props.userRate})</p>
                        </div>
                        <hr className="border-b-2" />
                        <div className="flex w-full gap-4">
                            <h1 className="w-[30%] lg:w-[15%] text-start font-semibold">Description</h1>
                            <p>:</p>
                            <p className="w-[70%] lg:w-full">{props.desc}</p>
                        </div>
                    </div>
                </div>
                <div className="grid gap-2 justify-center">
                    <div className="flex gap-2 justify-center items-center">
                        <button disabled={number === 0} onClick={handleMines} className="px-3 py-1 font-bold border-2 rounded-lg transition-all hover:bg-black hover:text-white">-</button>
                        <p>{number}</p>
                        <button onClick={handlePlus} className="px-3 py-1 font-bold border-2 rounded-lg transition-all hover:bg-black hover:text-white">+</button>
                    </div>
                    <button onClick={handleAddToCart} className="px-3 py-1 rounded-lg bg-blue-500 text-white transition-all hover:bg-blue-700">Add To Cart</button>
                </div>
                {notLogged && <p className="text-center">Please <Link href={`/login`} className="underline text-blue-500 hover:text-blue-700">Login</Link> First </p>}
            </div>
        </div>
    )
}
