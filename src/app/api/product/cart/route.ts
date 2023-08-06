import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export async function POST(req: NextRequest) {
    const { name } = await req.json()
    if (!name) return NextResponse.json({}, { status: 404 })
    try {
        const user = await prisma.user.findUnique({
            where: {
                name
            }
        })
        if (!user) return NextResponse.json({}, { status: 404 })
        const res = await prisma.product.findMany({
            where: {
                Cart: {
                    some: {
                        userId: user.id
                    }
                }
            },
            select: {
                id: true,
                title: true,
                price: true,
                image: true,
                Cart: {
                    where: {
                        userId: user.id
                    }
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        if (!res) return NextResponse.json({ msg: 'You Have No Cart' })
        const product = res.map((prod, i) => {
            const totalCart: number[] = prod!.Cart!.map(c => c.total) as number[];
            const totalPrice = totalCart.reduce((acc, currentTotal, index) => {
                const price = prod!.price! * currentTotal;
                return acc + price;
            }, 0);
            const data = {
                ...prod,
                image: prod.image.map(img => { return img!.image! })[0],
                Cart: prod.Cart.map(c => { return c.total }),
                totalPrice,
            }
            return data;
        })
        return NextResponse.json({ product })
    } catch (error) {
        return NextResponse.json({ msg: error }, { status: 404 })
    }
}