import { useEffect, useMemo } from 'react';
import { Order } from '@/context/order/context';
import OrderComponent from '@/components/order';
import { tabs } from '../tab';
import styles from './index.module.css';



interface OrdersProps {
    orders: Array<Order> 
    filter: string 
}

export default function Orders({
    orders, 
    filter
}: OrdersProps) {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }, [])

    const filterOrders = (orders: Array<Order>, filter: string) => {
        switch (filter) {
            case tabs.pending:
                return orders.filter(order => !order.delivered);
            case tabs.delivered:
                return orders.filter(order => order.delivered);
            case tabs.canceled:
                return orders.filter(order => order.canceled);
            default:
                return orders.filter(order => !order.delivered);
        }
    }
    
    const filteredOrders = useMemo(() => filterOrders(orders, filter), [orders, filter]);

    return (
        <div className={styles.container}>
        {filteredOrders.map((order, i) =>
            <OrderComponent 
            key={i} 
            order={order} 
            dontShowCancelButton={filter === tabs.delivered ?? filter === tabs.canceled}
            dontShowTrackButton={filter === tabs.delivered ?? filter === tabs.canceled}
            // disableCancelButton={filter === tabs.canceled}               
            /> 
        )}
        </div>
    )
}