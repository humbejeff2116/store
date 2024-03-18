import React, { useState } from 'react';
import { addToCartActionPayload } from '@/context/cart/payload';
import useCartContext, { Cart } from '@/context/cart/context';
import useProductsContext, { Product } from '@/context/products/context';
import { ButtonEvent, InputChangeEvent } from '@/components/types/events';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { RiAddFill, RiSubtractFill } from 'react-icons/ri';
import { CartButton } from '@/components/product/buttons';
import BackButton from '@/components/buttons/back';


interface ViewProductMenuProps {
    handleAddToCartMessage: (message: string) => void 
}

const defaultQuantity = '1';

export default function ViewProductMenu({
    handleAddToCartMessage
}: ViewProductMenuProps) {
    const [quantity, setQuantity] = useState("1");
    const { addToCart } = useCartContext();
    const { viewedProduct } = useProductsContext();

    const addProductQuantity = () => {
        if (!quantity) {
            setQuantity("1");
            return;
        }
        setQuantity(prevState => (parseInt(prevState) + 1).toString());
    }

    const reduceProductQuantity = () => {
        if (!quantity) {
            setQuantity("1");
            return;
        }
        if (parseInt(quantity) > 1) {
            setQuantity(prevState =>  (parseInt(prevState) - 1).toString());
        }
    }

    const handleInputChange = (e: InputChangeEvent) => {
        const value = e.target.value;
        const valueAsNumber = Number(value);

        if (isNaN(valueAsNumber)  || [...value].includes('.')) {
            return;
        }
        setQuantity(value);
    }

    const addProductToCart = async (
        product: Product | null,
        quantity: number,
    ) => {
        if (!product) {
            return;
        }
        addToCart(addToCartActionPayload(product, quantity));
        handleAddToCartMessage('Product added to cart');
    }
    return (
        <div className={styles.container}>
            <div className={styles.buttonsWrapper}>
                <div className={styles.backButtonWrapper}>
                    <BackButton
                    buttonClassName={styles.backButton}
                    />
                </div>
                <div className={styles.quantityButtonsWrapper}>
                    <button
                    className={styles.quantityButton}
                    onClick={()=> reduceProductQuantity()}
                    >
                        <IconContext.Provider value={{className: styles.icon}}>
                            <RiSubtractFill/>
                        </IconContext.Provider>
                    </button>
                    {/* input element */}
                    <input
                    value={quantity}
                    onChange={handleInputChange}
                    className={styles.quantityInput} 
                    type="text"
                    />
                    <button
                    className={styles.quantityButton}
                    onClick={()=> addProductQuantity()}
                    >
                        <IconContext.Provider value={{className: styles.icon}}>
                            <RiAddFill/>
                        </IconContext.Provider>
                    </button>
                    <CartButton 
                    buttonClass={styles.addToCartButton}
                    handleClick={()=> addProductToCart(viewedProduct, parseInt(quantity))}
                    />
                </div>
            </div>
        </div>
    )
}