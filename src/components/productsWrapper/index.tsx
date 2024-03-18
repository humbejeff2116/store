'use client'
import useProductsContext, { Product } from '@/context/products/context';
import styles from './index.module.css';
import DisplayProduct from '../product';
import { useEffect, useState } from 'react';
import { TopPopUpBox } from '../modal/topModals';
import usePopUpFor from '../modal/shared';
import { Timer } from '../types';
import { SpinnerSmallWithText } from '../loader/spinner';
import { BiError } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import { RiCloseFill } from 'react-icons/ri';

interface ProductsProps {
    wrapperClass?: string
    products: Array<Product>
}

export default function ProductsWrapper({
    wrapperClass,
    products
}: ProductsProps) {
    const [showMessage, setShowMessage] = useState(false);
    const { 
        loading, 
        error,
        setError,
        message, 
        setProducts, 
        sortedProducts 
    } = useProductsContext();

    useEffect(() => {
        setProducts(products);
    }, [setProducts, products]);

    useEffect(() => {
        let timer: Timer = null;

        if (showMessage) {
            timer = setTimeout(() => setShowMessage(false), 4000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [showMessage]);

    const handleCloseError = () => {
        setError(false);
    }

    return (
        <>
        {!products || products.length < 1 ? (
            <div>
                empty products
            </div>
        ) : (
            <>
            <TopPopUpBox
            usedFor={usePopUpFor.success}
            dontShowCloseButton
            message='Product added to cart'
            showPopUp={showMessage}
            />
            {loading && (
                <div className={styles.loadingWrapper}>
                    <SpinnerSmallWithText 
                    unsetMarginTop
                    bottomPosition={false} 
                    loadingText='Getting Products...'
                    />
                </div>
            )}
            {error && (
                <div className={styles.errorWrapper}>
                    <div className={styles.error}>
                        <IconContext.Provider value={{className: `${styles.erroIcon}`}}>
                            <BiError/>
                        </IconContext.Provider>
                        {message}
                        <div 
                        className={styles.closeIconWrapper} 
                        onClick={handleCloseError}
                        >
                            <IconContext.Provider value={{className:styles.closeIcon}}>
                                <RiCloseFill/>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
            )}   
            <div className={wrapperClass ?? styles.productsWrapper}>
            {sortedProducts && sortedProducts.length > 0 ? (
                sortedProducts.map((product, _) =>
                    <DisplayProduct 
                    showAddToCartMessage={setShowMessage}
                    key={product._id}
                    product={product}
                    /> 
                )
            ) : (
                products.map((product, _) =>
                    <DisplayProduct
                    showAddToCartMessage={setShowMessage} 
                    key={product._id} 
                    product={product}
                    /> 
                )
            )}
            </div>
            <div className={styles.bottomBottom}>
                {/* TODO... implement pagination functionality */}
                <Pagination/>
            </div>
            </>
        )}
        </>
    )
}


function Pagination() {
    return (
        <div>

        </div>
    )
}