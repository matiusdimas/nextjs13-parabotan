import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export async function GET(req: NextRequest, { params }: { params: { product: string[] } }) {
    if (params.product[4]) return NextResponse.json({ msg: 404 }, { status: 404 })
    const limit = params.product[3]

    const category = params.product[0]
    if (!['All', 'Kitchen', 'Living_Room', 'Bed_Room'].includes(category)) return NextResponse.json({ msg: "Invalid Category" }, { status: 500 })

    const sort = params.product[1]
    if (!['latest', 'oldest', 'sold', 'rating'].includes(sort)) return NextResponse.json({ msg: "Invalid Sort" }, { status: 500 })

    const range = params.product[2].toString()
    if (!['0', '1', '2', '3', '4'].includes(range)) return NextResponse.json({ msg: "Invalid Range" }, { status: 500 })

    let whereLimit
    if (limit === "limit") whereLimit = 5

    let whereCategory
    if (category !== 'All') whereCategory = category

    let orderByObj = {}
    if (sort === 'latest') orderByObj = { createdAt: "desc" }
    if (sort === 'oldest') orderByObj = { createdAt: "asc" }
    if (sort === 'sold') orderByObj = { sold: { _count: "desc" } }

    let whereRangeObj = [{}]
    if (range === '1') whereRangeObj = [{ price: { gte: 0 } }, { price: { lte: 1_000_000 } },]
    if (range === '2') whereRangeObj = [{ price: { gte: 1_000_000 } }, { price: { lte: 10_000_000 } },]
    if (range === '3') whereRangeObj = [{ price: { gte: 10_000_000 } }, { price: { lte: 100_000_000 } },]
    if (range === '4') whereRangeObj = [{ price: { gte: 100_000_000 } },]

    const data = await prisma.product.findMany({
        where: {
            category: whereCategory as {},
            AND: whereRangeObj
        },
        include: {
            sold: true,
            image: true,
            rating: true,
        },
        orderBy: orderByObj,
        take: whereLimit
    })

    const products = data.map((prod, i) => {
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
    if (sort === 'rating') products.sort((a, b) => b.rating - a.rating)
    return NextResponse.json({ products })
}