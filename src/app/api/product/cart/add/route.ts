import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export async function POST(req: NextRequest) {
    const { name, productId, total } = await req.json()
    try {
        const find = await prisma.cart.findMany({
            where: {
                productId,
                AND: {
                    user: {
                        name: name
                    }
                }
            }
        })
        const id = find.map(f => { return f.userId })
        if (find.length > 0) {
            const res = await prisma.cart.updateMany({
                where: {
                    user: {
                        name
                    },
                    AND: {
                        productId
                    }
                },
                data: {
                    total: parseInt(total)
                }
            })
            return NextResponse.json({ res })
        }
        const user = await prisma.user.findUnique({
            where: {
                name
            }
        })
        if (!user) return NextResponse.json({ msg: 'err' }, { status: 404 })
        const res = await prisma.cart.create({
            data: {
                productId,
                total,
                userId: user?.id
            },
        })
        return NextResponse.json({ res })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}