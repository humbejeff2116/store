import { Order } from '@/context/order/context';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { BiIdCard, BiTag, BiTime } from 'react-icons/bi';
import { RiPriceTag2Line } from 'react-icons/ri';
import { BsTag } from 'react-icons/bs';
import { GoKebabHorizontal } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { ModalBox } from '../modal/centerModals';



interface OrderComponentProps {
    order: Order,
    dontShowTrackButton?: boolean
    dontShowCancelButton?: boolean
    disableCancelButton?: boolean
}
export default function OrderComponent({
    order,
    dontShowTrackButton,
    dontShowCancelButton,
    disableCancelButton
}: OrderComponentProps) {
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        // TODO... get order products here
    }, []);

    const viewProducts = () => {

    }


    const closeModal = () => {

    }

    const getProducts = () => {

    }

    const status = order.delivered ? 
    "Delivered" : order.canceled ? 
    "Canceled" : "Pending";

    const cancelButtonClass = `${styles.button} ${styles.cancelButton} ${disableCancelButton && styles.disableButton}`;

    return (
        <div className={styles.container}>
            {showModal && (
                <ModalBox 
                dontUseDefaultModalChildContainer
                handleModal={closeModal}
                >
                    {/* TODO... extract to a seperate component */}
                    {/* product will contain current price and price at time of buy */}
                    {/* product will contain current discount and discount at time of buy */}
                    <div>
                       {order.products.map((product, i) =>
                        <div key={i}>
                            {product.productId}
                        </div>
                       )}
                    </div>
                </ModalBox>
            )}
            <OrderDetail>
                <div className={styles.top}>
                    <div className={styles.status}>
                        {status}
                    </div>
                    <div className={styles.menu}>
                    <IconContext.Provider value={{className: styles.menuIcon}}>
                        <GoKebabHorizontal/>
                    </IconContext.Provider>
                    </div>
                </div>
            </OrderDetail> 

            <OrderDetail>
                <div className={styles.middle}>
                    <div className={styles.detail}>
                        <span>
                            <IconContext.Provider value={{className: styles.detailIcon}}>
                                <BiIdCard/>
                            </IconContext.Provider>
                            Order Id
                        </span>
                        <div>
                        {order._id}
                        </div>
                    </div>
                    <div className={styles.detail}>
                        <span>
                        <IconContext.Provider value={{className: styles.detailIcon}}>
                                <BiTime/>
                            </IconContext.Provider>
                            Order Date
                        </span>
                        <div>
                        {order.timestamp}
                        </div>
                        
                    </div>
                    <div className={styles.detail}>
                        <span>
                        <IconContext.Provider value={{className: styles.detailIcon}}>
                            <RiPriceTag2Line/>
                        </IconContext.Provider>
                            Order Amount
                        </span>
                        <div>
                        NGN{order.totalAmount}
                        </div>
                    </div>
                </div>
            </OrderDetail>

            <OrderDetail>
                <div className={styles.buttonWrapper}>
                    {dontShowCancelButton ? null : (
                        <button className={cancelButtonClass}>
                        Cancel
                        </button>
                    )}
                    {dontShowTrackButton ? null : (
                        <button className={styles.button}>
                        Track
                        </button>
                    )}
                    <button className={`${styles.button} ${styles.viewButton}`}>
                        View Products
                    </button>
                </div>
            </OrderDetail>
        </div>
    )
}


interface OrderDetailProps {
    children: React.ReactNode
}

function OrderDetail({
    children
}: OrderDetailProps) {
    return (
        <div className={styles.detailWrapper}>
            {children}
        </div>
    )
}