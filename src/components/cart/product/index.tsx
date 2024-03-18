import Image, { StaticImageData } from 'next/image';
import { ProductImages } from '@/context/products/context';
import styles from './index.module.css';
import useCartContext, { Cart } from '@/context/cart/context';
import { 
    addCartProductQuantityActionPayload, 
    reduceCartProductActionPayload, 
    removeFromCartActionPayload 
} from '@/context/cart/payload';
import { calculateSubTotal } from '@/lib/product';
import { IconContext } from 'react-icons';
import { RiAddFill, RiDeleteBin2Line, RiSubtractFill } from 'react-icons/ri';
import { useMemo } from 'react';
import { ProductPrice } from '@/components/product/info';



interface ProductProps {
    images: ProductImages
    productId: string
    name: string
    price: number
    discount?: number
    quantity: number 
}

export default function CartProduct({
    images,
    productId,
    name,
    price,
    discount,
    quantity
}: ProductProps) {
    const {
        removeFromCart,
        reduceQuantity,
        addQuantity,
    } = useCartContext();

    const subTotal = useMemo(() => calculateSubTotal(price, quantity, discount), [discount, price, quantity])

    const addProductQuantity = (productId: string, quantity: number) => {
        addQuantity(addCartProductQuantityActionPayload(productId, quantity));
    }

    const reduceProductQuantity = (productId: string,quantity: number) => {
        reduceQuantity(reduceCartProductActionPayload(productId, quantity));
    }

    const removeProduct = (productId: string) => {
        removeFromCart(removeFromCartActionPayload(productId));
    }

    return (
        <div>
            <div className={styles.cartProduct}>
                <div className={styles.left}>
                    <ProductImage images={images.display}/>
                </div>
                <div className={styles.right}>
                    <Detail>
                        <div >
                            {name}
                        </div>
                    </Detail>
                    <Detail>
                        <ProductPrice discount={discount} price={price}/>
                    </Detail>
                    <Detail>
                        <div>
                            £{subTotal.toFixed(2)} <span> 
                                (Sub Total) 
                                </span>
                        </div>
                    </Detail>
                    <Detail modifyClass={styles.quantityButtonsWrapper}>
                        <button
                        className={styles.quantityButton}
                        onClick={() => reduceProductQuantity(productId, 1)}
                        >
                            <IconContext.Provider value={{className: styles.icon}}>
                                <RiSubtractFill/>
                            </IconContext.Provider>
                        </button>
                            <input
                            type="text"
                            value={quantity}
                            onChange={f => f}
                            className={styles.quantityInput} 
                            />
                        <button
                        className={styles.quantityButton}
                        onClick={()=> addProductQuantity(productId, 1)}
                        >
                            <IconContext.Provider value={{className: styles.icon}}>
                                <RiAddFill/>
                            </IconContext.Provider>
                        </button>
                    </Detail>
                    <Detail>
                    <button
                    className={styles.removeButton}
                    onClick={()=> removeProduct(productId)}>
                        <IconContext.Provider value={{className: styles.removeIcon}}>
                            <RiDeleteBin2Line/>
                        </IconContext.Provider>
                        Remove
                    </button>
                    </Detail>
                </div>
            </div>
        </div>
    )
}

interface ProductImageProps {
    images: Array<any>
}

function ProductImage({
    images
}: ProductImageProps) {
    return (
        <div className={styles.imageWrapper}>
            <Image src={images[0]} alt=''/>
        </div>
    )
}

interface DetailProps {
    modifyClass?: string
    children: React.ReactNode
}

function Detail({
    modifyClass,
    children
}: DetailProps) {
    return (
        <div className={`${styles.detailWrapper} ${modifyClass}`}>
            {children}
        </div>
    )
}