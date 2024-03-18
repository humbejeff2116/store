
import { createContext, useContext } from 'react';

export interface ProductLike {
    like: boolean
    userId: string
    timestamp: number | string
}
export interface ProductImages {
    display: Array<any>
    slider: Array<any>
    hd: Array<any>
}
export interface Product {
    _id: string
    name: string
    description: string
    price: number
    numSold: number
    discount: number
    category: string
    likesCount: number
    instock: boolean
    images: ProductImages
    likes?: Array<ProductLike>
}

export type Products = Array<Product> | null;

interface InitialContext {
    viewedProduct: Product | null
    products: Products
    sortedProducts: Products
    searchedProducts: Products
    filter: string
    loading: boolean
    error: boolean
    message: string
    beginProductsQuery: boolean
    setBeginProductsQuery: (status: boolean) => void
    setError: (status: boolean) => void
    setViewedProduct: (product: Product) => void
    setProducts: (products: Products) => void
    sort: (type: string) => void
    search: (query: string) => void
}

const initialContext: InitialContext = {
    viewedProduct: null,
    products: null,
    sortedProducts: null,
    searchedProducts: null,
    filter: '',
    loading: false,
    error: false,
    message: '',
    beginProductsQuery: false,
    setBeginProductsQuery: () => null,
    setError: () => null,
    setViewedProduct: () => null,
    setProducts: () => null, 
    sort: () => null,
    search: () => null
}

export const Context = createContext<InitialContext>(initialContext);
export default function useProductsContext() {
    return useContext(Context);
}
