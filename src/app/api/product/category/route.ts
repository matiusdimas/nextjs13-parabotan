import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()
export async function GET() {
    const categories = await prisma.product.findMany({
        select: {
            category: true,
            image: true
        },
        distinct: "category"
    })
    const category = categories.map((cat) => {
        const data = {
            category: cat.category,
            image: cat.image.map((img) => { return img.image })[0]
        }
        return data
    })
    return NextResponse.json({ category })
}