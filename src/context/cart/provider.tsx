import { useState, useEffect } from 'react';
import { Cart, Context } from './context';
import {
    calculateCartTotalPrice,
    getCartTotalItems,
    productIsInCart,
    incrementProductQuantity,
    decrementProductQuantity,
}  from './helpers';
import { parseLocalStorage } from '@/lib';
import { Order, OrderProduct } from "../order/context";
import { ProductImages } from "../products/context";


export interface AddToCartAction extends OrderProduct {
    images: ProductImages
    name: string
}

export interface RemoveFromCartAction {
    productId: string
}

export interface AddQuantityAction {
    productId: string
    quantity: number
}

export interface ReduceQuantityAction {
    productId: string
    quantity: number
}

interface ContextProviderProps {
    children: React.ReactNode
}

export  function CartContextProvider({ children }: ContextProviderProps) {
    const [cart, setCart] = useState<Cart>([]);
    const [cartHasNotification, setCartNotification] = useState(false);
    const [cartTotalNumberOfProducts, setCartTotalNumberOfProducts] = useState<number>(0);
    const [totalSum, setTotatSum] = useState<number>(0.00);

    useEffect(() => {
        const user = parseLocalStorage('user');
        const savedCartState = parseLocalStorage(`${user?.userId}-cart`);

        if (!user || !savedCartState) {
            return;
        }
        const currentUserIsCartOwner = savedCartState.currentUser.userId === user.userId;

        if (!currentUserIsCartOwner) {
            return;
        }

        updateCart(savedCartState?.cart);
    }, []);

    const updateCart = (state: Cart) => {
        if (state.length < 1) {
            setCart([]);
            setCartTotalNumberOfProducts(0);
            setTotatSum(0.00);
            toggleCartNotification(false);
            return;
        }

        const cartTotalNumberOfProducts = getCartTotalItems(state);
        const totalSum = calculateCartTotalPrice(state);

        setCart(state);
        setCartTotalNumberOfProducts(cartTotalNumberOfProducts);
        setTotatSum(totalSum);
    }

    function addToCart(action: AddToCartAction) {
        // const action = addCartProductQuantityActionPayload(productId, quantity)
        const { productId, quantity } = action;
        let newCart: Cart;

        if (cart.length < 1) {
            newCart = [action];
        } else if (productIsInCart(productId,cart)) {
            newCart = incrementProductQuantity(cart, productId, quantity);
        } else {
            newCart = [...cart, action]; 
        }
        updateCart(newCart);
        setCartNotification(true);
    }

    function removeFromCart(action: RemoveFromCartAction) {
        const { productId } = action;
        let newCart: Cart;
    
        if (!productIsInCart(productId, cart)) {
            return;
        }
        newCart = cart.filter(product => {
            return product.productId !== productId;
        })
        updateCart(newCart);
    }
    
    function addQuantity(action: AddQuantityAction) {
        const { productId, quantity } = action;
        let newCart: Cart;
    
        if (!cart || cart.length < 1 || quantity < 1 || !productIsInCart(productId, cart)) {
            return;
        }   
        newCart = incrementProductQuantity([...cart], productId, quantity);
        updateCart(newCart);
    }
    
    function reduceQuantity(action: ReduceQuantityAction) {
        const { productId, quantity } = action;
        let newCart: Cart;
    
        if (!cart || cart.length < 1 || quantity < 1 || !productIsInCart(productId, cart)) {
            return;
        }
        newCart = decrementProductQuantity([...cart], productId, quantity);
        updateCart(newCart);
    }

    function getCart() {
        return cart;
    }
    
    function clearCart() {
        updateCart([])
    }

    function getPaymentDetail() {
        if (!cart || cart.length < 1) {
            return null 
        }
    
        return ({
            totalProducts: cartTotalNumberOfProducts,
            totalAmount: totalSum,    
        })
    }

    function createOrder(
        userId: string,
        timestamp: string | number,
        delivered: boolean,
    ): Order {
        return ({
            timestamp: timestamp, 
            userId: userId,
            totalAmount: totalSum,
            products: cart,
            delivered: delivered,
        })
    }

    function toggleCartNotification(state: boolean) {
        setCartNotification(state);
    }

    const values = {
        totalSum: totalSum,
        cartTotalNumberOfProducts: cartTotalNumberOfProducts,
        cartHasNotification: cartHasNotification,
        getCart: getCart,
        toggleCartNotification: toggleCartNotification,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        addQuantity: addQuantity,
        reduceQuantity: reduceQuantity,
        clearCart: clearCart,
        createOrder: createOrder,
        getPaymentDetail: getPaymentDetail
    }

    return (
        <Context.Provider value = { values }>
            { children }
        </Context.Provider>
    )
}
