"use client"

import Image from 'next/legacy/image'
import { useState } from 'react'
export default function HeroImage(props: Products) {
    const { image } = props

    const [index, setIndex] = useState(0)

    const handleClick = (i: number) => {
        setIndex(i)
    }
    const arrImage: string[] = image as []

    return (
        <div className='w-full flex flex-col items-center gap-4 px-4'>
            <div className='rounded-lg overflow-hidden relative grid justify-center'>
                {image && <Image src={image![index]} alt='gambar' width={640} height={300} priority />}
            </div>
            <div className='px-4 rounded-lg border-2 '>
                <div className='w-full max-w-[720px] flex items-center overflow-hidden overflow-x-auto gap-4 custom-scrollbar mb-2'>
                    {image && arrImage.map((img, i) => {
                        return (
                            <div key={i} className={`mb-2 flex-none relative h-[90px] border-4 rounded-md overflow-hidden ${index === i ? 'border-black' : 'border-transparent'}`}>
                                <Image onClick={() => handleClick(i)} src={img} alt='gambar' width={120} height={90} priority className={` transition-all ${index === i && 'scale-105 brightness-125'}`} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
