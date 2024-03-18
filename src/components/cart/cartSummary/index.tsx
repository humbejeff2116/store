import Link from 'next/link';
import { IconContext } from 'react-icons';
import { BiMoney } from 'react-icons/bi';
import { RiCoinsFill } from 'react-icons/ri';
import useCartContext from '@/context/cart/context';
import appRoutes from '@/routes';
import styles from './index.module.css';


export default function CartSummary() {
    const { cartTotalNumberOfProducts, totalSum } = useCartContext();

    return (
        <div className={styles.cartSummary}>
            {cartTotalNumberOfProducts ? (
                <>
                <SummaryDetail>
                    {cartTotalNumberOfProducts} <span>
                        (Items In Cart)
                    </span>
                </SummaryDetail>
                <SummaryDetail>
                    £{totalSum} <span>
                        (Total Amount)
                    </span>
                </SummaryDetail>
                <SummaryDetail>
                    <Link href={appRoutes.checkOut} 
                    className={styles.checkoutLink}
                    >
                        <IconContext.Provider value={{className: styles.icon}}>
                            <RiCoinsFill/>
                        </IconContext.Provider>
                        Checkout
                    </Link>
                </SummaryDetail>
                </>
            ) : (
                <EmptySummary/>
            )}
        </div>
    )
}

interface SummaryDetailProps {
    wrapperClassName?: string
    children: React.ReactNode
}

function SummaryDetail({
    wrapperClassName,
    children
}: SummaryDetailProps) {
    const wrapperClass = wrapperClassName ?? styles.detailWrapper;

    return (
        <div className={wrapperClass}>
            {children}
        </div>
    )
}

function EmptySummary() {
    return (
        <div className={styles.emptySummarryWrapper}>
            Empty Cart
        </div>
    )
}
