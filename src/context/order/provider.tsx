import React, { useEffect, useState } from 'react';
import { Context, Order, Orders } from './context';
import orderHTTPService from '@/services/order';
import { getDefaultResultOrder } from 'dns';
import useAuth from '../auth/context';

interface ContextProviderProps {
    children: React.ReactNode
}

export function OrderContextProvider({children}: ContextProviderProps) {
    const [allOrders, setAllOrders] = useState<Orders | null>(null);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    const [trackOrder, setTrackOrder] = useState<Order | null>(null)
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            getUserOrder(user._id);
        }
    }, [user]);

    async function getUserOrder(userId: string) {
        setLoading(true);
        try {
            const { status, error, data:orders } = await orderHTTPService.getUserOrders(userId);
            setAllOrders(orders || []);
        } catch (err) {

        } finally {
            setLoading(false);
        }
    }

    function getAllOrder() {
        return allOrders;
    }

    async function filter(orders: Orders) {
        const [pending, delivered] = await Promise.all([
            asyncFilter(orders, 'delivered'),
            asyncFilter(orders, 'pending')
        ])

        return ({
            pending: pending,
            delivered: delivered
        })
    }

    function asyncFilter<arrItem extends {[x: string]: any}>(arr: Array<arrItem>, returnVal: string) {
        return new Promise((res, _) => {
            arr = arr.filter(item => item[returnVal]);
            res(arr);
        })
    }

    const values = {
        loading: loading,
        getAllOrder: getAllOrder,
        trackOrder: trackOrder,
        setTrackOrder: setTrackOrder
    }

    
    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )  
}