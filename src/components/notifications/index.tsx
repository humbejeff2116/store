'use client'
import useAuth from '@/context/auth/context';
import styles from './index.module.css';
import { useState } from 'react';
import { Spinner } from '../loader/spinner';
import Notification from './notification';
import Heading from './heading';
import PageHeading from '../pageHeading';
import Image from 'next/image';


const mockNotifications = [
    {
        _id: "dkfd643hdjfd",
        type: "withdraw",
        title: "Withdraw funds",
        text: "Withdraw funds",
        date: 2743764,
    },
    {
        _id: "dkfd643hdjfd",
        type: "withdraw",
        title: "Withdraw funds",
        text: "Withdraw funds",
        date: 2743764,
    }
]

export default function Notifications() {
    // const [notifications, setNotifications] = useState<Array<any> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user } = useAuth();

    const notifications =  mockNotifications;

    const getUserNotifications = (userId: string) => {

    }

    return (
        <div className={styles.container}>
        {!notifications || loading ? (
            <Spinner unsetMarginTop/>
        ) : error ? (
            <ErrorNotifications/>
        ) : notifications.length < 0 ? (
            <EmptyNotifications/>
        ) : (
            <div className={styles.wrapper}>
                {/* <Heading/> */}
                <PageHeading 
                heading='My Notifications' 
                body='lorem ispium de rut mak fli du rep piut cun'
                illustration={
                    <Image src={''} alt='an illustraion of notifications'/>
                }
                />
                <div className={styles.notificationsWrapper}>
                {notifications.map((notification, i) => 
                    <Notification key={i} {...notification}/>
                )}
                </div>
            </div>
        )}
        </div>
    )
}



function EmptyNotifications() {
    return (
        <div>
            empty
        </div>
    )
}

function ErrorNotifications() {
    return (
        <div>
          error  
        </div>
    )
}