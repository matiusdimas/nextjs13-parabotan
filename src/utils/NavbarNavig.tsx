"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import Avatar from './Avatar'



export default function NavbarNavig(props: Avatar) {
    const path = usePathname()

    function isActive(params: string) {
        if (path === params) {
            return 'border-[#fcad03]'
        } else {
            return 'border-transparent opacity-60 hover:border-black hover:opacity-100'
        }
    }

    return (
        <div className='hidden lg:flex'>
            <ul className='flex gap-4 items-center'>
                <li>
                    <Link className={`text-lg transition-all border-b-4 font-semibold px-2 ${isActive('/')}`} href={'/'}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link className={`text-lg transition-all border-b-4 font-semibold px-2 ${isActive('/products')}`} href={'/products/filter/All/latest/0'}>
                        Products
                    </Link>
                </li>
                <li>
                    <Link className='text-lg transition-all border-b-4 border-transparent font-semibold opacity-60 hover:border-black hover:opacity-100 px-2' href='/#category'>
                        Category
                    </Link>
                </li>
                {props.status === 'authenticated' && (
                    <li>
                        <Link className={`text-lg transition-all border-b-4 font-semibold px-2 ${isActive('/cart')}`} href={'/cart'}>
                            Cart
                        </Link>
                    </li>
                )}
                {props.status === 'authenticated' ? (
                    <Avatar image={props.image} />
                ) : props.status === 'unauthenticated' && (
                    <li>
                        <Link className={`text-lg transition-all border-b-4 font-semibold px-2 ${isActive('/register')}`} href={'/register'}>SignUp</Link>
                        /
                        <Link className={`text-lg transition-all border-b-4 font-semibold px-2 ${isActive('/login')}`} href={'/login'}>SignIn</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}
