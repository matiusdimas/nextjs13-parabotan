import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET(request: Request) {
    try {
        const products = await prisma.product.findMany({
            include: {
                sold: true,
                rating: true,
                image: true,
            },
        });
        const product = products.map((prod, i) => {
            let rating = prod.rating.reduce((acc, item) => acc + item.rating, 0)
            let userRate = prod.rating.length
            let avgRate = rating / userRate
            const data = {
                id: prod.id,
                title: prod.title,
                price: prod.price,
                category: prod.category,
                image: prod.image.map((img, i) => { return img.image }),
                sold: prod.sold.length,
                userRate: prod.rating.length,
                rating: avgRate,
                date: prod.createdAt,
            }
            return data
        })
        return NextResponse.json({ products: product })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}