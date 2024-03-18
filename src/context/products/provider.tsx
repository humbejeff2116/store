import React, { useCallback, useEffect, useState } from 'react';
import { Context, Product, Products } from './context';
import { sortByHighestPrice, sortByLeastSold, sortByLowestPrice, sortByMostLikes, sortByMostSold } from './helpers';
import useHeaderContext, { ClickedLink } from '../productsNav/context';
import productHTTPService from '@/services/product';
import { RiArrowDownDoubleFill, RiArrowDownFill, RiArrowUpDoubleFill, RiArrowUpFill, RiUserHeartFill } from 'react-icons/ri';

interface ContextProviderProps {
    children: React.ReactNode
}

interface SortTypes {
    [x: string]: any
    lowestPrice: string
    highestPrice: string
    mostSold: string
    leastSold: string
    mostLikes: string
}

export const sortProductsTypes: SortTypes = {
    lowestPrice: "Lowest Price",
    highestPrice: "Highest Price",
    mostSold: "Most Sold",
    leastSold: "Least Sold",
    mostLikes: "Most Likes"
}

interface SortIconTypes {
    [x: string]: any
    lowestPrice: React.ReactElement
    highestPrice: React.ReactElement
    mostSold: React.ReactElement
    leastSold: React.ReactElement
    mostLikes: React.ReactElement
}

export const sortProductsTypesIcons: SortIconTypes = {
    lowestPrice: <RiArrowDownFill/>,
    highestPrice: <RiArrowUpFill/>,
    mostSold: <RiArrowUpDoubleFill/>,
    leastSold: <RiArrowDownDoubleFill/>,
    mostLikes: <RiUserHeartFill/>
}

export function ProductsContextProvider({children}: ContextProviderProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [filter, setFilter] = useState('');
    const [products, setProducts] = useState<Products | null>(null);
    const [viewedProduct, setViewedProduct] = useState<Product | null>(null);
    const [sortedProducts, setSortProducts] = useState<Products | null>(null);
    const [searchedProducts, setSearchedProducts] = useState<Products | null>(null);
    const [beginProductsQuery, setBeginProductsQuery] = useState(false);
    const { 
        activeMainLink, 
        activeSubLink, 
        clickedSubLink, 
    } = useHeaderContext();
    
    const sort = useCallback((filter: string) => {
        setFilter(filter);
        switch (filter) {
            case sortProductsTypes.lowestPrice:
                return sortByLowestPrice(products, setSortProducts);
            case sortProductsTypes.highestPrice: 
                return sortByHighestPrice(products, setSortProducts);
            case sortProductsTypes.mostSold: 
                return sortByMostSold(products, setSortProducts);
            case sortProductsTypes.leastSold: 
                return sortByLeastSold(products, setSortProducts);
            case sortProductsTypes.mostLikes: 
                return sortByMostLikes(products, setSortProducts);
            default:
                return sortByMostSold(products, setSortProducts);
        }
    }, [products]);

    useEffect(() => {
        if (activeMainLink && clickedSubLink) {
            getProducts(
                activeMainLink.name,
                clickedSubLink.value,
                clickedSubLink.name,
                setProducts
            )
        }
        setSortProducts(null);
    }, [activeMainLink, clickedSubLink]);

    useEffect(() => {
        if (beginProductsQuery) {
            if (activeMainLink && activeSubLink && !clickedSubLink) {
                getProducts(
                    activeMainLink.name,
                    '',
                    activeSubLink.name,
                    setProducts
                )
            }
        }
    }, [beginProductsQuery, activeMainLink, activeSubLink, clickedSubLink]);

    async function getProducts(
        category: string,
        subCategory: string,
        gender: string, 
        setProducts: (products: Products) => void,
    ) {
        setError(false);
        setLoading(true);
        try {
            const respone = await productHTTPService.getWithQuery(
                category, 
                subCategory,
                gender
            ) 
            setProducts(respone.data);
        } catch (err) {
            setError(true);
            setMessage("Error getting products");
        } finally {
            setLoading(false);
        }
    }

    function search(query: string) {
        // TODO... call search endpoint with query
        setSearchedProducts([]);
    }

    const values = {
        products: products,
        viewedProduct: viewedProduct,
        sortedProducts: sortedProducts,
        searchedProducts: searchedProducts,
        filter: filter,
        loading: loading,
        error: error,
        beginProductsQuery: beginProductsQuery,
        setBeginProductsQuery: setBeginProductsQuery,
        setError: setError,
        message: message,
        setViewedProduct: setViewedProduct,
        setProducts: setProducts,
        sort: sort,
        search: search
    }

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )  
}