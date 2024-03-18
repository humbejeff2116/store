import { Order, OrderProduct } from '@/context/order/context';
import styles from './index.module.css';
import OrderProductComp from '../orderProduct';
import OrderComponent from '@/components/order';





interface OrderProductsProps {
    order: Order
    products: Array<OrderProduct>   
}
export default function OrderWrapper({
    order,
    products
}: OrderProductsProps) {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                Order 
            </div>
            <div className={styles.orderWrapper}>
                <OrderComponent 
                order={order}
                dontShowTrackButton
                dontShowCancelButton              
                /> 
                {/* TODO... remove commented code */}
                {/* {products.map((product, i) =>
                    <OrderProductComp key={i} orderProduct={product}/> 
                )} */}
            </div>
        </div>
    )
}