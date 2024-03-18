import { useState } from 'react';
import styles from './index.module.css';
import { ButtonEvent } from '@/components/types/events';
import { paymentOptions } from '..';
import { IconContext } from 'react-icons';
import { RiTruckLine } from 'react-icons/ri';
import { GoBrowser } from 'react-icons/go';






interface PaymentTabProps {
    paymentOption: string
    togglePaymentOption: (e: ButtonEvent, option: string) => void 
}
export default function PaymentTab({
    togglePaymentOption,
    paymentOption
}: PaymentTabProps) {

    const isActiveClassName = (option: string) => {
        return paymentOption === option && styles.isActivePaymentOption;
    }

    return (
        <div className={styles.container}>
            <button 
            className={`${styles.paymentOptionButton} ${isActiveClassName(paymentOptions.onDelivery)}`}
            onClick={(e) => togglePaymentOption(e, paymentOptions.onDelivery)}
            >
                <IconContext.Provider value={{className: styles.icon}}>
                    <RiTruckLine/>
                </IconContext.Provider>
                Pay On Delivery
            </button>
            <button 
            className={`${styles.paymentOptionButton} ${isActiveClassName(paymentOptions.onSite)}`}
            onClick={(e) => togglePaymentOption(e, paymentOptions.onSite)}
            >
                <IconContext.Provider value={{className: styles.icon}}>
                    <GoBrowser/>
                </IconContext.Provider>
                Pay On Site
            </button>
        </div>
    )
}