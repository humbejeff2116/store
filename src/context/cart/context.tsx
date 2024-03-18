import { createContext, useContext } from 'react';
import { 
    AddQuantityAction, 
    AddToCartAction, 
    ReduceQuantityAction, 
    RemoveFromCartAction 
} from './provider';

export interface CartItem extends AddToCartAction {};

export type Cart = Array<CartItem>;

interface PaymentDetail {
    totalProducts: number | null
    totalAmount: number | null
}

interface InitialContext {
    totalSum: number 
    cartTotalNumberOfProducts: number
    cartHasNotification: boolean
    getCart: () => Cart
    toggleCartNotification: (hasNotification: boolean) => void
    addToCart: (action: AddToCartAction) => void
    removeFromCart: (action: RemoveFromCartAction) => void
    addQuantity: (action: AddQuantityAction) => void
    reduceQuantity: (action: ReduceQuantityAction) => void
    getPaymentDetail: () => PaymentDetail | null
    createOrder: (userId: string, timestamp: string, delivered: boolean) => void
    clearCart: () => void
} 

const initialContext: InitialContext = {
    totalSum: 0.00,
    cartTotalNumberOfProducts: 0,
    cartHasNotification: false,
    getCart: () => [],
    toggleCartNotification: () => null,
    addToCart: () => null,
    removeFromCart: () => null,
    addQuantity: () => null,
    reduceQuantity: () => null,
    getPaymentDetail: () => null,
    createOrder: () => null,
    clearCart: () => null,
}

export const Context = createContext<InitialContext>(initialContext);

export default function useCartContext() {
    return useContext(Context);
}
