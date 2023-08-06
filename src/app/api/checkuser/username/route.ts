import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const { username } : {username: string} = await req.json()

    const resp = await prisma.user.findUnique({
        where: {
            name: username
        }
    })
    if (resp) return NextResponse.json({msg: 'Username Already Exists', status: false})
    return NextResponse.json({ msg: '', status:true  })
}
