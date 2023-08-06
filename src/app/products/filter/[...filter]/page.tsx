"use client"

import Section from "@/components/products/filter/Section"
import { redirect } from "next/navigation"

export default function page({ params }: { params: { filter: string[] } }) {
    if (!params.filter[0] || !params.filter[1] || !params.filter[2] || params.filter[3]) return redirect('/404')
    return (
        <div className="w-full my-20">
            <Section category={params.filter[0]} sort={params.filter[1]} range={params.filter[2]} />
        </div>
    )
}
