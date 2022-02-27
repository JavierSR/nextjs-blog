interface Item {
    fields: any
    metadata: any
    sys: any
}

export default interface Entry {
    includes: any
    items: Item[]
    limit: number
    skip: number
    sys: any
    total: number
}