"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

export default function SectionLogin() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState<string | undefined>(undefined)
    const [detailUser, setDetailUser] = useState({
        username: '',
        password: ''
    })

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDetailUser({ ...detailUser, [name]: value })
    }
    const handleForm = async (e: FormEvent) => {
        e.preventDefault()
        if (!loading) {
            setLoading(true)
            await signIn('credentials', { ...detailUser, redirect: false })
                .then(s => {
                    if (s?.url) {
                        router.push('/')
                    } else {
                        setIsSuccess(s?.error)
                    }
                })
                .catch(e => console.log(e))
            setDetailUser({
                username: '',
                password: '',
            });
            setLoading(false)
        }
    }

    return (
        <div className="rounded-lg px-5 py-3 grid gap-4 bg-white border-2">
            <h1 className="text-center font-bold text-xl">Login</h1>
            <form onSubmit={handleForm} className="grid gap-4">
                <div className="grid gap-2">
                    <label htmlFor="username">
                        Username
                    </label>
                    <input onChange={e => handleChange(e)} className="px-3 py-1 border rounded-md" type="text" name="username" id="username" value={detailUser.username} placeholder="Input Username" required />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input onChange={e => handleChange(e)} className="px-3 py-1 border rounded-md" type="password" name="password" id="password" value={detailUser.password} placeholder="*****" required />
                </div>
                <p className="text-center text-sm text-red-500">{isSuccess !== undefined && <>{isSuccess}</>}</p>
                {loading
                    ?
                    <div className="bg-blue-500 flex justify-center rounded-lg">
                        <div className="lds-dual-ring"></div>
                    </div>
                    :
                    <button type="submit" className="w-full px-3 py-1 rounded-lg bg-blue-500 transition-all hover:bg-blue-700 text-white">Login</button>
                }
            </form>
            <div className="text-center -mt-2 grid gap-[2px]">
                <p className="font-thin text-sm">Or</p>
                <p className="font-normal text-sm">Login With : </p>
            </div>
            <button onClick={() => signIn('github')} className="w-full py-1 rounded-lg border-2 border-black transition-all hover:bg-black hover:text-white">
                Github
            </button>

            <p>Don&apos;t have an account yet{'?'} <Link className="underline text-blue-500 hover:opacity-80" href={'/register'}>Register</Link></p>
        </div>
    )
}
