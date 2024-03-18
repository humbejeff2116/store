'use client'
import { useEffect, useState } from 'react';
import { ButtonEvent } from '../types/events';
import  { EmptyStateButton } from '../emptyState';
import styles from './index.module.css';
import CheckoutIntroNote from './note';
import CheckoutTab from './tab';
import PaymentIntroNote from './paymentNote';
import PaymentAmount from './paymentAmount';
import DeliveryAddressForm from './deliveryAddress/form';
import DeliverTo from './deliveryAddress/address';
import { ModalBox } from '../modal/centerModals';
import { Timer } from '@/components/types';
import ModalChildWrapper from './modalChildWraper';
import Loader from './loader';
import orderHTTPService from '@/services/order';
import PaymentTab from './paymentTab';
import PayOnDelivery from './payOnDelivery';
import PayOnSite from './payOnSite';
import useCartContext, { Cart } from '@/context/cart/context';
// import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import config from '@/lib/flutterwave';
import PaymentOptionsWrapper, { ExternalPaymentButtonWrapper, InternalPaymentButton } from './paymentOptions';
import { RiHome3Line } from 'react-icons/ri';


export const paymentOptions = {
    onDelivery: "onDelivery",
    onSite: "onSite",
}

export default function Checkout() {
    const [showModal, setShowModal] = useState(false);
    const [showModalChild, setShowModalChild] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [actionMessage, setActionMessage] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [paymentOption, setPaymentOption] = useState(paymentOptions.onSite);
    // const { cartTotalNumberOfProducts } = useCartContext();
    const cartTotalNumberOfProducts = 3;
    const user= {
        _id: "",
        fullName: "",
        email: "",
        contactNumber: "",
        deliveryAddress: ""
    }

    const { createOrder } = useCartContext();

    let timer: Timer = null;

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [timer]);

    const openModal = () => {
        setShowModal(true);
        
        timer = setTimeout(() => {
            setShowModalChild(true);
        });
    }

    const closeModal = () => {
        setShowModalChild(false);
        
        timer = setTimeout(() => {
            setShowModal(false);
        }, 800);
    }

    const placeOrder = async (
        cart: Cart,
        userId: string,
        timeStamp = Date.now()
    ) => {
        setActionMessage('Placing Order...');
        setPlacingOrder(true);
        const buyerOrder = createOrder(userId, timeStamp.toString(), false);

        try {
          alert(JSON.stringify(buyerOrder, null, 2)); // TODO... drop alert
        }  catch(err) {
          
        } finally {
            setPlacingOrder(false);
        }
    }
    // const flConf = config(
    //     0,
    //     user.fullName, 
    //     user.email,
    //     "transactionReference",
    //     user.contactNumber,
    // )

    // const fwConfig = {
    //     ...flConf,
    //     text: "Pay with Flutterwave",
    //     callback: async (response: any) => {
    //       alert(JSON.stringify(response, null, 2));
    //       console.log(response);
    //       // TODO... call the placeOrder function here if response status is 200
    //       await placeOrder(cart, user._id);
    //       closePaymentModal();
    //     },
    //     onClose: () => {},
    // }

    const handleWalletPayment = () => {

    }

    const togglePaymentOption = (e: ButtonEvent, option: string) => {
        switch (option) {
            case paymentOptions.onDelivery:
                setPaymentOption(paymentOptions.onDelivery)
                break;
            case paymentOptions.onSite:
                setPaymentOption(paymentOptions.onSite)
                break;
            default:
                setPaymentOption(paymentOptions.onSite)
                break;
        }
    }

    return (
        <div className={styles.container}>
        {cartTotalNumberOfProducts > 0 ? (
            <>
            {showModal && (
                <ModalBox 
                dontShowCloseButton
                dontUseDefaultModalChildContainer
                handleModal={closeModal}
                >
                    <ModalChildWrapper show={showModalChild}>
                        <></>
                    </ModalChildWrapper>
                </ModalBox>
            )}
            {/* <Loader show={placingOrder} text={actionMessage}/> */}

            <CheckoutTab/>
            <div className={styles.bodyWrapper}>
                <CheckoutIntroNote/>
                <PaymentTab paymentOption={paymentOption} togglePaymentOption={togglePaymentOption}/>

                {paymentOption === paymentOptions.onDelivery ? (
                    <PayOnDelivery>
                        <PaymentIntroNote 
                        heading='Pay On Delivery' 
                        bodyText={''}
                        />
                        <div className={styles.paymentWrapper}>
                            {!user || (user && !user.deliveryAddress) ? (
                                <DeliveryAddressForm/>
                            ) : (
                                <DeliverTo/>
                            )}
                            <PaymentAmount payOnDelivery/>
                            <PaymentOptionsWrapper 
                            externalPaymentMethodComp={
                                <ExternalPaymentButtonWrapper>
                                    {/* TODO... attach payment gateway button here */}
                                    <button>
                                        Paystack
                                    </button>
                                </ExternalPaymentButtonWrapper>
                            } 
                            internalPaymentMethodComp={
                                <InternalPaymentButton 
                                handlePayment={handleWalletPayment}
                                />
                            }
                            />
                        </div>
                    </PayOnDelivery>
                ) : (
                    <PayOnSite>
                        <PaymentIntroNote 
                        heading='Pay On Site' 
                        bodyText={''}
                        />
                        <div className={styles.paymentWrapper}>
                            {!user || (user && !user.deliveryAddress) ? (
                                <DeliveryAddressForm/>
                            ) : (
                                <DeliverTo/>
                            )}
                            <PaymentAmount/>
                            <PaymentOptionsWrapper 
                            externalPaymentMethodComp={
                                <ExternalPaymentButtonWrapper>
                                    {/* TODO... attach payment gateway button here */}
                                    <button>
                                        Paystack
                                    </button>
                                </ExternalPaymentButtonWrapper>
                            } 
                            internalPaymentMethodComp={
                                <InternalPaymentButton 
                                handlePayment={handleWalletPayment}
                                />
                            }
                            />
                        </div>
                    </PayOnSite>
                )}
                </div>
            </>
        ) : (
            <EmptyCheckout/>
        )}
        </div>
    )
}


export function EmptyCheckout() {
    return (
        <div className={styles.emptyContainer}>
            <div className={styles.childWrapper}>
              illustration  
            </div>
            <div className={`${styles.childWrapper} ${styles.right}`}>
                <div className={styles.writeupWrapper}>
                    <div className={styles.heading}>
                        Checkout Items
                    </div>
                    <div className={styles.body}>
                        Looks like you currently do not have items in your cart to perform a checkout
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
        </div>
    )
}