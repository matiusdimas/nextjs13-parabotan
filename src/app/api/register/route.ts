import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client"

type User = { username: string, email: string, password: string }


const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { username, email, password }: User = body

        if (!username || !email || !password) return NextResponse.json({ msg: "Invalid Input" }, { status: 400 })

        const checkUsername = await prisma.user.findUnique({
            where: {
                name: username
            }
        })
        const checkEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (checkUsername && checkEmail) return NextResponse.json({ msg: "Username & Email Has Exists" }, { status: 500 })
        if (checkUsername) return NextResponse.json({ msg: "Username Has Exists" }, { status: 500 })
        if (checkEmail) return NextResponse.json({ msg: "Email Has Exists" }, { status: 400 })

        const hashPassword = bcrypt.hashSync(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name: username,
                email,
                password: hashPassword
            }
        })

        return NextResponse.json({ msg: 'Register Success', newUser })
    } catch (error) {
        return NextResponse.json({ msg: "Unknown" }, { status: 500 })
    }
}