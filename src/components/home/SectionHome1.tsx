import Link from "next/link";

export default function SectionHome1() {
    return (
        <div style={{ backgroundImage: `url('/img/bg-image-hero.jpg')` }} className="bg-no-repeat w-full h-[540px] flex flex-col justify-center items-center bg-cover bg-center gap-4">
            <div >
                <p className="font-extrabold text-4xl text-[#fcad03] drop-shadow-2xl text-center ">Join Member To Get Attractive Discount</p>
            </div>
            <div className="flex gap-4">
                <Link className="px-3 py-1 text-base font-semibold rounded-lg bg-[#fcad03] transition-all hover:opacity-80 active:scale-105" href='/products'>See Our Product</Link>
                <Link className="px-3 py-1 text-base font-semibold rounded-lg bg-white transition-all hover:opacity-80 active:scale-105" href='/login'>Become A Member</Link>
            </div>
        </div>
    )
}
