import Link from 'next/link';
import styles from './index.module.css';
import appRoutes from '@/routes';
import useCartContext from '@/context/cart/context';
import { IconContext } from 'react-icons';
import { RiShoppingBag2Line } from 'react-icons/ri';



interface PaymentAmountProps {
    payOnDelivery?: boolean
}
export default function PaymentAmount({
    payOnDelivery
}: PaymentAmountProps) {
    const { cartTotalNumberOfProducts, totalSum } = useCartContext();

    return (
        <div className={styles.container}>
            <Detail>
                <div>
                    Total Products: <span>{cartTotalNumberOfProducts}</span>  
                </div>
            </Detail>
            <Detail>
                {payOnDelivery && (
                    <div className={styles.payOnDelivery}>
                        Pay amount when order is delivered
                    </div>
                )}
                <div>
                    Order Amount: <span>{totalSum}</span>  
                </div>
            </Detail>
            <Detail>
                <DeliveryCharge/>
            </Detail>
            <Detail>
                <div className={styles.linkWrapper}>
                <Link
                className={styles.link} 
                href={appRoutes.cart}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <RiShoppingBag2Line/>
                    </IconContext.Provider>
                    View Products
                </Link>
                </div>
            </Detail>
        </div>
    )
}

interface DetailProps {
    children: React.ReactNode
}

function Detail({
    children
}: DetailProps) { 
    return (
        <div className={styles.detailWrapper}>
            {children}
        </div>
    )
}


function DeliveryCharge() {
    return (
        <div>
            Delivery Charge
        </div>
    )
}