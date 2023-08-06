import Link from "next/link";

export default function Footer() {
    return (
        <div className="w-full justify-self-end bg-[#fcad03]">
            <div className="flex gap-4 flex-wrap justify-center items-start py-4">
                <div className="w-1/3 lg:w-[15%]">
                    <h1 className="font-bold">Title Name</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, neque.</p>
                </div>
                <div className="w-1/3 lg:w-[15%] lg:ml-10">
                    <h2 className="font-bold">Navigation</h2>
                    <ul>
                        <li><Link className="onHover" href='/'>Home</Link></li>
                        <li><Link className="onHover" href='/products/filter/All/latest/0'>Products</Link></li>
                        <li><Link className="onHover" href='/#category'>Category</Link></li>
                        <li><Link className="onHover" href='/login'>Sign In</Link></li>
                        <li><Link className="onHover" href='/register'>Sign Up</Link></li>
                    </ul>
                </div>
                <div className="w-1/3 lg:w-[15%]">
                    <h2 className="font-bold">Social Media</h2>
                    <ul>
                        <li><a className="onHover" href='/'>Instagram</a></li>
                        <li><a className="onHover" href='/'>Facebook</a></li>
                        <li><a className="onHover" href='/'>Linkedin</a></li>
                    </ul>
                </div>
                <div className="w-1/3 lg:w-[15%]">
                    <h2 className="font-bold">Contact</h2>
                    <ul>
                        <li><p>Jl. Baru No. 12</p></li>
                        <li><p>examples@gmail.com</p></li>
                        <li><p>+62 821-123-322</p></li>
                        <li><p>+021-12-122</p></li>
                    </ul>
                </div>
            </div>
            <div className="w-full text-center py-1 bg-black text-white">
                @ 2023 Copyright: Example.com
            </div>
        </div>
    )
}
