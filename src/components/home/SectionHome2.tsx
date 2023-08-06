"use client"
import axios from "axios"
import Image from "next/legacy/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const revalidate = 3600;

export default function SectionHome2() {
    const [product, setProduct] = useState([])

    const img = product.map((img: Products) => {
        return { url: img.image }
    })

    const [slide, setSlide] = useState(0)
    const handleNext = () => {
        (slide === img.length - 1) ? setSlide(0) : setSlide(slide + 1)
    }
    const handlePrev = () => {
        (slide === 0) ? setSlide(img.length - 1) : setSlide(slide - 1)
    }
    const handleButton = (i: number) => {
        setSlide(i)
    }
    useEffect(() => {
        const slideInterval = setInterval(handleNext, 5000)
        return () => clearInterval(slideInterval)
    })

    useEffect(() => {
        const res = async () => {
            const data = await axios.get('/api/product/filter/All/sold/0/limit')
            setProduct(data.data.products)
        }
        res()
    }, [])

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <h1 className="text-center font-bold text-xl">Best Products</h1>
            <div className="w-full max-w-[720px] relative group">
                <div className="flex w-full overflow-hidden" >
                    {product.map((prod: Products, i) => {
                        return (
                            <Link href={`/products/${prod.id}`} key={i} className="flex-none w-full relative transition-all z-50" style={{ transform: `translateX(-${slide * 100}%)` }}>
                                <Image src={prod!.image![0]} alt="gambar" width={720} height={400} priority />
                            </Link>
                        )
                    })}
                </div>

                <div className="group-hover:flex hidden justify-between absolute inset-0 items-center">
                    <button onClick={handlePrev} className="px-4 py-2 mx-5 rounded-full bg-white/80 hover:bg-white transition-all font-bold text-2xl z-50">&lt;</button>
                    <button onClick={handleNext} className="px-4 py-2 mx-5 rounded-full bg-white/80 hover:bg-white transition-all font-bold text-2xl z-50">&gt;</button>
                </div>

                <div className="flex gap-2 w-full justify-center items-center absolute bottom-5 z-50">
                    {img.map((img, i) => {
                        return (
                            <span key={i} onClick={() => handleButton(i)} className={`border-2 rounded-full transition-all h-3 w-3 cursor-pointer ${slide === i ? 'bg-black p-2 border-slate-300' : 'hover:bg-slate-200 border-black'}`}></span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
