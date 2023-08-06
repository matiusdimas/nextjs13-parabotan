import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export async function POST(req: NextRequest) {
    const { productId, name } = await req.json()
    if (!productId || !name) return NextResponse.json({}, { status: 404 })

    const user = await prisma.user.findUnique({
        where: {
            name
        }
    })
    if (!user) return NextResponse.json({}, { status: 404 })

    const cartDelete = await prisma.cart.deleteMany({
        where: {
            productId,
            AND: {
                userId: user?.id
            }
        }
    })
    if (!cartDelete) return NextResponse.json({ msg: "Cart Not Found" }, { status: 500 })
    return NextResponse.json({ cartDelete })
}