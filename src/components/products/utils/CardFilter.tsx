"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, HtmlHTMLAttributes, useEffect } from "react"

interface PropsFilterEx extends FilterParams {
    handleClick?: () => void
}

export default function CardFilter(props: PropsFilterEx) {
    const router = useRouter()
    const { handleClick, category, sort, range } = props
    const handleForm = async (e: FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget as HTMLFormElement;
        const sortBySelect = form.elements.namedItem('sortBy') as HTMLSelectElement;
        const sortByValue = sortBySelect.value;
        const rangePriceSelect = form.elements.namedItem('rangePrice') as HTMLSelectElement;
        const rangePriceValue = rangePriceSelect.value;
        router.push(`/products/filter/${category}/${sortByValue}/${rangePriceValue}`)
        handleClick!();
    }
    const sortSelect = [
        { value: "latest", text: 'Latest' },
        { value: "sold", text: 'Best Seller' },
        { value: "rating", text: 'Top Rating' },
        { value: "oldest", text: 'Oldest' },
    ]
    const sortIndex = sortSelect.findIndex((sel) => sel.value === sort);
    if (sortIndex !== -1) {
        const selectedOption = sortSelect.splice(sortIndex, 1);
        sortSelect.unshift(selectedOption[0]);
    }

    const rangeSelect = [
        { value: "0", text: '0' },
        { value: "1", text: 'Rp. 0 - 1.000.000' },
        { value: "2", text: 'Rp. 1.000.000 - 10.000.000' },
        { value: "3", text: 'Rp. 10.000.000 - 100.000.000' },
        { value: "4", text: '> Rp. 100.000.000' },
    ]
    const rangeIndex = rangeSelect.findIndex(rang => rang.value === range)
    if (rangeIndex !== -1) {
        const selectedOption = rangeSelect.splice(rangeIndex, 1)
        rangeSelect.unshift(selectedOption[0])
    }

    return (
        <div className="h-screen backdrop-brightness-75 w-screen fixed top-0 left-0 bottom-0 z-[1001] grid place-items-center">
            <div className="px-5 py-3 rounded-lg bg-white flex flex-col gap-4">
                <div className="self-end justify-self-end absolute">
                    <button onClick={handleClick} className="px-3 py-1 rounded-full border-2 transition-all hover:bg-black hover:text-white font-bold">X</button>
                </div>
                <form onSubmit={handleForm}>
                    <h1 className="mb-4 font-bold">Filter</h1>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="sortBy">Sort By</label>
                            <select name="sortBy" id="sortBy" className="border-2 rounded-lg">
                                {sortSelect.map((sel, i) => {
                                    return (
                                        <option key={i} value={sel.value}>{sel.text}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="rangePrice">Range Price</label>
                            <select name="rangePrice" id="rangePrice" className="border-2 rounded-lg">
                                {rangeSelect.map((rang, i) => {
                                    return (
                                        <option key={i} value={rang.value}>{rang.text}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button type="submit" className="w-full py-1 text-white rounded-lg bg-blue-500 transition-all hover:bg-blue-700">Apply Filter</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
