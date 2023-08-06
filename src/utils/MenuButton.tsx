"use client"

import Link from "next/link";
import { useState } from "react";
import { usePathname } from 'next/navigation'
import Avatar from "./Avatar";
export default function MenuButton(props: Avatar) {
    const path = usePathname()
    const [isOpen, setIsOpen] = useState(false);
    const [hiddenClass, setHiddenClass] = useState(true);


    const handleClick = () => {
        setIsOpen(!isOpen);
        setHiddenClass(false)
    };

    function isActive(params: string) {
        if (path === params) {
            return 'bg-[#fcad03]'
        } else {
            return 'hover:bg-black hover:text-white'
        }
    }

    return (
        <div className="lg:hidden">
            <div className="flex gap-4">
                <div>
                    {props.status === 'authenticated' && (
                        <Avatar image={props.image} />
                    )}
                </div>
                <button onClick={handleClick} className={`px-3 py-1 border-2 rounded-md hover:bg-black hover:text-white transition-all ${isOpen ? ('scale-105 bg-black text-white') : ('bg-white')}`}>
                    Menu
                </button>
            </div>
            <div onClick={handleClick} className={`${isOpen ? ('dropDown-buton') : ('dropDown-buton-hidden')} transition-all absolute left-0 right-0  z-[999]  py-2 ${hiddenClass && ('hidden')}`}>
                <ul className="flex flex-col items-center justify-center bg-white border-y-2 ">
                    <li className="w-full flex justify-center">
                        <Link className={`w-full text-lg py-2 text-center border-b-2 transition-all ${isActive('/')}`} href={'/'}>
                            Home
                        </Link>
                    </li>
                    <li className="w-full flex justify-center">
                        <Link className={`w-full text-lg py-2 text-center border-b-2 transition-all ${isActive('/products/filter/All/latest/0')}`} href={'/products/filter/All/latest/0'}>
                            Products
                        </Link>
                    </li>
                    <li className="w-full flex justify-center">
                        <Link className={`w-full text-lg py-2 text-center border-b-2 transition-all hover:bg-black hover:text-white`} href='/#category'>
                            Category
                        </Link>
                    </li>
                    {props.status === 'authenticated' && (
                        <li className="w-full flex justify-center">
                        <Link className={`w-full text-lg py-2 text-center border-b-2 transition-all ${isActive('/cart')}`} href={'/cart'}>
                            Cart
                        </Link>
                    </li>
                    )}
                    {props.status === 'unauthenticated' && (
                        <li className="w-full flex justify-center">
                            <Link className={`w-full text-lg py-2 text-center transition-all ${isActive('/register')} border-r-2`} href={'/register'}>
                                SignUp
                            </Link>
                            <Link className={`w-full text-lg py-2 text-center transition-all ${isActive('/login')} border-l-2`} href={'/login'}>
                                SignIn
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}
