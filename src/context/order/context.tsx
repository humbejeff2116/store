import { createContext, useContext } from 'react';



export const deliveryStages = {
    placed: "Placed order",
    packaged: "Packaged order",
    inProgress: "Delivery in progress",
    delivered: "Delivered"
} 

export interface OrderProduct {
    productId: string
    quantity: number
    price: number
    discount: number
}

export interface DeliveryStage {
    name: string
    timeStamp: string | number
    isComplete: boolean
}

export interface Order {
    _id?: string
    timestamp: string | number
    userId: string
    totalAmount: number
    delivered: boolean
    canceled?: boolean
    products: Array<OrderProduct>
    deliveryStages?: Array<DeliveryStage>
}

export type Orders = Array<Order>;

interface InitialContext {
    loading: boolean
    getAllOrder: () => Orders | null
    trackOrder: Order | null
    setTrackOrder: (order: Order) => void
}

const initialContext: InitialContext = {
    loading: false,
    getAllOrder: () => null,
    trackOrder: null,
    setTrackOrder: () => null
}

export const Context = createContext<InitialContext>(initialContext);
export default function useOrderContext() {
    return useContext(Context);
}
