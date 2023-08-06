import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        if (!id) return NextResponse.json({ msg: 'Required Id' }, { status: 500 })
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                sold: true,
                rating: true,
                image: true,
            },
        });
        if (!product) return NextResponse.json({ msg: "Data Not Found" }, { status: 500 })
        let rating = product.rating.reduce((acc, item) => acc + item.rating, 0)
        let userRate = product.rating.length
        let avgRate = rating / userRate
        const data = {
            ...product,
            image: product.image.map((img, i) => { return img.image }),
            sold: product.sold.length,
            userRate: product.rating.length,
            rating: avgRate,
        }
        return NextResponse.json({ data })
    } catch (error) {
        return NextResponse.json({ msg: "Data Not Found" }, { status: 500 })
    }
}