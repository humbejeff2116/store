import { Product } from '@/context/products/context';
import styles from './index.module.css';


interface ProductDetails {
    _id: string 
    name: string
    description: string
    price: number
    discount: number
}

export default function ProductDetails({
    _id, 
    name,
    description,
    price,
    discount,
}: ProductDetails) {
    return (
        <div className={styles.container}>
            <div className={styles.productName}>
                {name}
            </div>
            <ProductPrice discount={discount} price={price}/>
        </div>
    )
}

interface PriceProps {
    discount?: number
    price: number
    containerClassName?: string
    showPriceTag?: boolean
}

export function ProductPrice({
    discount,
    price,
    containerClassName,
    showPriceTag
}: PriceProps) {
    const containerClass = containerClassName || styles.priceWrapper;
    const currencyIcon = <>£</>

    if (discount) {
        const percentOffPrice = (discount / 100) * price;
        const newPrice = (price - percentOffPrice).toFixed(2);

        if (!showPriceTag) {
            return (
                <div className = {containerClass}>
                    <div>
                        <span className={styles.price}>{currencyIcon}{newPrice} {`(${discount}% OFF)`}</span>
                        {' '}
                        <span className={styles.originalPrice}>{currencyIcon}{price}</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={containerClass}>
                    <div>
                        Price: <span className={styles.price}>{currencyIcon}{newPrice} {`(${discount}% OFF)`}</span>
                        <span className={styles.originalPrice}>{currencyIcon}{price}</span>
                    </div>
                </div>
            )
        }
    }

    if (!discount) {
        if (showPriceTag) {
             return (
                <div className={containerClass}>
                    <div>
                        Price: <span className={styles.price}>{currencyIcon}{price}</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={containerClass}>
                    <div>
                        <span className={styles.price}>{currencyIcon}{price}</span>
                    </div>
                </div>
            )
        }
    }
}
