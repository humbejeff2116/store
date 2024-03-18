import { useEffect, useState } from 'react';
import { OrderProduct } from '@/context/order/context';
import styles from './index.module.css';
import { Product } from '@/context/products/context';
import { calculateSubTotal } from '@/lib/product';
import Image from 'next/image';



interface OrderProductProps {
    orderProduct: OrderProduct
}

export default function OrderProductComp({
    orderProduct
}: OrderProductProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const { price, discount, quantity, productId } =  orderProduct;

    useEffect(() => {
        getProduct(productId)
    }, [productId])

    const getProduct = async (productId: string) => {
        setLoading(true);
        try {
            
        } catch (error) {
            
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <div className={styles.imageWrapper}>
            {/* TODO... return skeleton loaders */}
            {!product || loading ? (
                <>
                    Loading...
                </>
            ) : (
                <Image src={product?.images.display[0]} alt={product.name}/>
            )}
            </div>
            <div>
                <Detail>
                {!product || loading ? (
                    <>
                        Loading...
                    </>
                ) : (
                    product.name
                )}
                </Detail>
                <Detail>
                    {price}
                </Detail>
                <Detail>
                    {discount}
                </Detail>
                <Detail>
                    {quantity}
                </Detail>
                <Detail>
                    {calculateSubTotal(price, quantity, discount)}
                </Detail>
            </div>
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
        <div>

        </div>
    )
}