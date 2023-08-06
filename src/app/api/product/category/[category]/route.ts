import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { category: string } }) {
    const { category } = params
    return NextResponse.json({ category })
}