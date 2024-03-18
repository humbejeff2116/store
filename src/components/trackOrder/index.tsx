'use client'
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import OrderDeliveryStage from './orderDeliveryStage';
import { Spinner } from '../loader/spinner';
import useOrderContext, { Order, deliveryStages } from '@/context/order/context';
import EmptyState, { EmptyStateButton } from '../emptyState';
import OrderWrapper from './order';
import { RiHome3Line } from 'react-icons/ri';


const order = {
    orderId: "",
    timeStamp: "",
    deliveryStages: [
        {
            timeStamp: new Date(),
            name: deliveryStages.placed, 
            isComplete: false
        },
        {
            timeStamp: new Date(),
            name: deliveryStages.packaged, 
            isComplete: false
        },
        {
            timeStamp: new Date(),
            name: deliveryStages.inProgress, 
            isComplete: false
        },
        {
            timeStamp: new Date(),
            name: deliveryStages.delivered, 
            isComplete: false
        }
    ]
}

interface TrackOrderProps {
    orderId?: string
}

export const mockOrder = {
    _id:"string",
    timestamp: "34343434",
    userId: "string",
    totalAmount: 355.77,
    delivered: false,
    canceled: false,
    products: [
        {
            productId: "string",
            quantity: 22,
            price: 34,
            discount: 6
        }
    ],
    deliveryStages: [
        {
            timeStamp: Date.now(),
            name: deliveryStages.placed, 
            isComplete: false
        },
        {
            timeStamp: Date.now(),
            name: deliveryStages.packaged, 
            isComplete: false
        },
        {
            timeStamp: Date.now(),
            name: deliveryStages.inProgress, 
            isComplete: false
        },
        {
            timeStamp: Date.now(),
            name: deliveryStages.delivered, 
            isComplete: false
        }
    ]

}

export default function TrackOrder({
    orderId
}: TrackOrderProps) {
    // const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const { trackOrder } = useOrderContext();
    const order = mockOrder

    useEffect(() => {
        if (trackOrder) {
            getOrder(trackOrder._id);
        }
    }, [trackOrder])


    const getOrder = async (orderId?: string) => {
        if (!orderId) return;

        setLoading(true);
        try {
            
        } catch (err) {
            
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className={styles.container}>
            {!order || loading ? (
                <Spinner/>
            ) : !order ? (
                <EmptyTrackOrder/>  
            ) : (
                <>
                <IntroNote/>
                <div className={styles.trackOrderWrapper}>
                    <OrderDeliveryStage 
                    orderId={order._id} 
                    timeStamp={order.timestamp} 
                    stages={order.deliveryStages}
                    />
                    <OrderWrapper 
                    order={order}
                    products={order.products}
                    />
                </div>
                </>
            )}
        </div>
    )
}

function IntroNote() {
    return (
        <div className={styles.introContainer}>
            <div className={`${styles.introChild} ${styles.introChildLeft}`}>
                <div className={styles.introWriteupWrapper}>
                    <div className={styles.introHeading}>
                        Order Tracking
                    </div>
                    <div className={styles.introBody}>
                        lorem ispium de fre cuip du lat tre carion nsydsd
                    </div>
                </div>
            </div>
            <div className={styles.introChild}>
                illustration
            </div>
        </div>
    )
}



function EmptyTrackOrder() {
    return (
        <div className={styles.emptyContainer}>
            <div className={`${styles.emptyChild} ${styles.left}`}>
                <div className={styles.writeupWrapper}>
                    <div className={styles.heading}>
                        Track Order
                    </div>
                    <div className={styles.body}>
                        body
                    </div>
                    <div className={styles.buttonWrapper}>
                        <EmptyStateButton
                        useLink
                        icon={
                            <RiHome3Line/>
                        }
                        text="Start Shopping"
                        href="/home" 
                        />
                    </div>
                </div>
            </div>
            <div className={styles.emptyChild}>
                illustration
            </div>
        </div>
    )
}