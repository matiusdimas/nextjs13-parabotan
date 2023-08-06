"use client"
import axios from "axios"
import DescProduct from "./utils/DescProduct"
import HeroImage from "./utils/HeroImage"
import { useEffect, useState } from "react"

type Product = {
  params: {
    productId: number
  }
}


export default function Section(props: Product) {
  const [product, setProduct] = useState<Products>({});
  useEffect(() => {
    const res = async () => {
      const res = await axios.get(`/api/product/${props.params.productId}`)
      setProduct(res.data.data)
    }
    res()
  }, [props.params.productId])
  const { image, ...descProduct } = product

  return (
    <div className="flex flex-col items-center lg:gap-4">
      <h1 className="font-bold text-xl mb-2">Title Product</h1>
      {product.title ? (
        <div className="lg:flex ">
          <HeroImage image={product.image} />
          <DescProduct {...descProduct} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
