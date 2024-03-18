'use client'
import { useState, useTransition } from 'react';
import useOrderContext, { Order } from '@/context/order/context';
import PlacedOrdersTab, { tabs } from './tab';
import Orders from './orders';
import EmptyState from '../emptyState';
import { ButtonEvent } from '@/components/types/events';
import styles from './index.module.css';
import { Spinner } from '../loader/spinner';
import { mockOrder } from '../trackOrder'; //remove after test



const mockOrders: Array<Order> = [];
for (let i = 0; i <= 5; i++) {
    mockOrders.push(mockOrder)
}

export default function PlacedOrders() {
    const [isPending, setTransition] = useTransition();
    const [activTab, setActiveTab] = useState(tabs.pending);
    const { loading, getAllOrder } = useOrderContext();
    // const orders = getAllOrder();
    const orders = mockOrders;

    const toggleTab = (e: ButtonEvent, tabName: string) => {
        switch (tabName) {
            case tabs.pending:
                transitionTab(tabs.pending);
                break;
            case tabs.delivered:
                transitionTab(tabs.delivered);
                break;
            case tabs.canceled:
                transitionTab(tabs.canceled);
                break;
            default:
                transitionTab(tabs.pending);
                break;
        }
    }

    const transitionTab = (tabName: string) => {
        setTransition(() => {
            setActiveTab(tabName);
        })
    }

    return (
        <div className={styles.container}>
            <PlacedOrdersTab 
            activeTab={activTab}
            toggleTab={toggleTab}
            />
            {loading || !orders ? (
                <Spinner/>
            ) : orders.length < 1 ? (
                <EmptyState
                heading='My Orders'
                writeUp='Looks like you do not have an order at the moment'
                imageSrc={''}
                imageAlt=''
                >

                </EmptyState>
            ) : (
                <Orders orders={orders} filter={activTab}/>
            )}
        </div>
    )
}



function EmptyOrders() {
    return (
        <>
        </>
    )
}