"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonFilter from "./ButtonFilter";

export default function Products(props: FilterParams) {
    const { category, sort, range } = props
    const [product, setProduct] = useState([])
    useEffect(() => {
        const res = async () => {
            const data = await axios.get(`/api/product/filter/${category}/${sort}/${range}`)
            setProduct(data.data.products)
            console.log(data)
        }
        res()
    }, [])
    return (
        <>
            <ButtonFilter category={category!} sort={sort} range={range} />
            <div className="flex flex-wrap justify-center gap-4 my-10 mx-2">
                {product.length > 0 ? product.map((prod: Products, i) => {
                    const originalString = prod.category;
                    const modifiedString = originalString!.replace(/_/g, "").split(/(?=[A-Z])/).join(' ');
                    return (
                        <Link key={i} href={`/products/${prod.id}`}>
                            <div className="border-2 shadow-lg rounded-lg w-[200px] lg:w-[400px] h-[320px] cursor-pointer overflow-hidden group hover:scale-105 transition-all">
                                <div className="relative w-full h-[65%]">
                                    <p className="bg-black/70 px-2 py-1 absolute z-10 text-base font-semibold text-white ">{modifiedString}</p>
                                    <Image src={prod!.image![0] || ''} alt="gambar" fill className="rounded-t-lg object-center object-cover group-hover:scale-105 group-hover:brightness-90 transition-all" priority />
                                </div>
                                <div className="pl-2 mt-2">
                                    <p className="font-bold">{prod.title}</p>
                                    <p className="font-semibold">Rp. {prod.price?.toLocaleString()}</p>
                                    <p className="font-semibold">Rating {prod.rating || 0}/5 ({prod.userRate})</p>
                                    <p className="font-semibold">Sold ({prod.sold})</p>
                                </div>
                            </div>
                        </Link>
                    )
                }) : <p className="text-center text-lg font-semibold">Products Not Found</p>}
            </div>
        </>
    )
}
