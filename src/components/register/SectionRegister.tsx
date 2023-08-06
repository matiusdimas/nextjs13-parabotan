"use client"
import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"


export default function SectionRegister() {
    const router = useRouter()
    const [detailUser, setDetailUser] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [message, setMessage] = useState('')
    const [validUsername, setValidUsername] = useState('')
    const [validEmail, setValidEmail] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const checkUsername = async () => {
            const resp = await axios.post('/api/checkuser/username', {
                username: detailUser.username
            }).then(data => {
                setValidUsername(data.data.msg)
            }).catch(err => {
                setValidUsername(err.response.data.msg)
            })
        }
        checkUsername()
    }, [detailUser.username]);
    useEffect(() => {
        const checkEmail = async () => {
            const resp = await axios.post('/api/checkuser/email', {
                email: detailUser.email
            }).then(data => {
                setValidEmail(data.data.msg)
            }).catch(err => {
                setValidEmail(err.response.data.msg)
            })
        }
        checkEmail()
    }, [detailUser.email]);



    const handleForm = async (e: FormEvent) => {
        e.preventDefault()
        if (!loading) {
            if (validEmail.length === 0 || validUsername.length === 0) {
                setLoading(true)
                const res = await axios.post("/api/register", {
                    username: detailUser.username,
                    email: detailUser.email,
                    password: detailUser.password,
                }).then(data => {
                    alert(`${data.data.msg} Please Login`)
                    router.push('/login')
                }).catch(err => {
                    setMessage(err.response.data.msg)
                })
                setDetailUser({
                    username: '',
                    email: '',
                    password: '',
                });
                setLoading(false)
            }
        }
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDetailUser({ ...detailUser, [name]: value })

    }

    return (
        <div className="rounded-lg px-4 py-2 grid gap-4 bg-white border-2">
            <h1 className="text-center font-bold text-xl">Register</h1>
            <form onSubmit={handleForm} className="grid gap-4">
                <p>{message}</p>
                <div className="grid gap-2">
                    <label htmlFor="username">
                        Username
                    </label>
                    <input onChange={handleChange} className="px-3 py-1 border rounded-md" type="text" name="username" id="username" value={detailUser.username} placeholder="Input Username" required />
                    <p className="text-center text-red-500">{validUsername}</p>
                </div>
                <div className="grid gap-2">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input onChange={handleChange} className="px-3 py-1 border rounded-md" type="email" name="email" id="email" value={detailUser.email} placeholder="Input Email" required />
                    <p className="text-center text-red-500">{validEmail}</p>
                </div>
                <div className="grid gap-2">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input onChange={handleChange} className="px-3 py-1 border rounded-md" type="password" name="password" id="password" value={detailUser.password} placeholder="*****" required />
                </div>

                {loading
                    ?
                    <div className="bg-blue-500 flex justify-center rounded-lg">
                        <div className="lds-dual-ring"></div>
                    </div>
                    :
                    <button disabled={validEmail.length > 0 || validUsername.length > 0 ? true : false} type="submit" className="w-full px-3 py-1 rounded-lg bg-blue-500 transition-all hover:bg-blue-700 text-white">Register</button>
                }
                <p>Already have an account? <Link className="underline text-blue-500 hover:opacity-80" href={'/login'}>Login</Link></p>
            </form>
        </div>
    )
}
