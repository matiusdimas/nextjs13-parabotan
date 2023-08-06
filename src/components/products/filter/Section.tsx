import Products from "../utils/Products";

export default function Section(props: FilterParams) {
    const originalString = props.category;
    const modifiedString = originalString!.replace(/_/g, "").split(/(?=[A-Z])/).join(' ');
    return (
        <div className='flex flex-col w-full gap-4'>
            <h1 className='font-bold text-xl text-center'>{modifiedString || ''} Products</h1>
            <div>
                <Products category={props.category} sort={props.sort} range={props.range} />
            </div>
        </div>
    )
}