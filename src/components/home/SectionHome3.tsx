import axios from "axios"
import Link from "next/link"

interface Category {
  category: string
  image: string
}
async function getCategory() {
  const res = await axios.get('http://localhost:3000/api/product/category')
  return res.data.category
}
export default async function SectionHome3() {
  const category = await getCategory()
  return (
    <div id="category" className="w-full flex flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-center text-xl">Category</h1>
      <div className="flex flex-wrap justify-center w-full gap-4 px-4 mb-10">
        {category.map((cat: Category, i: number) => {
          const originalString = cat.category;
          const modifiedString = originalString!.replace(/_/g, "").split(/(?=[A-Z])/).join(' ');
          return (
            <Link key={i} href={`/products/filter/${cat.category}/latest/0`} className="w-[200px] h-[150px] group">
              <div style={{ backgroundImage: `url(${cat.image})` }} className="bg-center bg-cover bg-no-repeat w-full h-full rounded-md cursor-pointer">
                <div className="bg-transparent w-full h-full grid place-items-center group-hover:backdrop-blur-md rounded-md transition-all">
                  <p className="text-2xl font-extrabold text-white backdrop-blur-lg tracking-wider rounded-2xl px-3 py-1 group-hover:scale-105 transition-all">{modifiedString}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
