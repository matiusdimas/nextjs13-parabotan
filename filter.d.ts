interface PropsFilter {
    handleFilter: (sort: string, range: string) => void
}

interface FilterParams {
    category?: string
    sort?: string
    range?: string
}