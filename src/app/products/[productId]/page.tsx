"use client"
import Section from "@/components/products/product/Section";

export default function Product({params} : {
    params: {productId: number}
}) {
    return (
        <div className='my-20'>
            <Section params={params}/>
        </div>
    );
}