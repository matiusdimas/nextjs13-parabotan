"use client"
import { useState } from "react"
import CardFilter from "./CardFilter"



export default function ButtonFilter(props: FilterParams) {
    const { category, sort, range } = props
    const [showFilter, setShowFilter] = useState(false)
    const handleClick = () => {
        setShowFilter(!showFilter)
    }
    return (
        <>
            <button onClick={handleClick} className={`ml-10 px-3 py-1 rounded-lg border-2 flex gap-2 items-center border-black transition-all hover:bg-[#fcad03] ${showFilter && ('bg-[#fcad03]')}`}>
                <div className='flex flex-col gap-[4px]'>
                    <span className='bg-black px-3 py-[2px]'></span>
                    <span className='bg-black px-3 py-[2px]'></span>
                    <span className='bg-black px-3 py-[2px]'></span>
                </div>
                <p className='font-semibold text-base'>Filter</p>
            </button>
            {showFilter && (
                <CardFilter handleClick={handleClick} category={category} sort={sort} range={range} />
            )}
        </>
    )
}
