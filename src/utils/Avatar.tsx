"use client"
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Avatar(props: Avatar) {
    const router = useRouter()
    const [menu, setMenu] = useState(false)
    const handleClick = async () => {
        await signOut({redirect: false, callbackUrl: '/'})
    }
    return (
        <div className='relative'>
            <div onClick={() => setMenu(!menu)} className='overflow-hidden relative w-8 h-8 rounded-full bg-red-500 cursor-pointer'>
                <Image src={props!.image!} alt='avatar' fill />
            </div>
            {menu && (
                <div className='absolute w-32 border mt-4 -ml-10 shadow-md rounded-md shadow-slate-500 overflow-hidden bg-white'>
                    <ul>
                        <div className='w-full text-center py-2 cursor-pointer duration-200 hover:bg-slate-300' onClick={handleClick}>Sign Out</div>
                    </ul>
                </div>
            )}
        </div>
    )
}
