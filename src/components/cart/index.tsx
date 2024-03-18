'use client'
import useCartContext from '@/context/cart/context';
import styles from './index.module.css';
import CartSummary from './cartSummary';
import CartProduct from './product';
import { useEffect, useMemo } from 'react';
import CartHeader from './header';
import EmptyCart from './empty';


// interface CartProps {
//     cart: Cart
// }

export default function Cart() {
    const { getCart, cartHasNotification, toggleCartNotification } = useCartContext();
    const cart = useMemo(() => getCart(), [getCart]) 

    // useEffect(() => {
    //     if (cartHasNotification) {
    //         toggleCartNotification(false); 
    //     }
    // }, [cartHasNotification, toggleCartNotification]);

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <CartHeader/>
                <div className={styles.cartWrapper}>
                {cart && cart.length > 0 ? (
                    cart.map((item, i) =>
                        <CartProduct key={i} {...item}/> 
                    )
                ) : (
                    <EmptyCart/>
                )}
                </div>
            </div>
            <div className={styles.right}>
                <CartSummary/>
            </div>
        </div>
    )
}