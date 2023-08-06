import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const { email }: { email: string } = await req.json()
    const resp = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (resp) return NextResponse.json({ msg: 'Email Already Exists', status: false })
    return NextResponse.json({ msg: '', status: true })
}
