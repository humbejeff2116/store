import useProductsContext, { Product } from '@/context/products/context';
import LikeGiver from './like';
import ProductMenu from './menu';
import ProductDetails from './info';
import ProductImage from './image';
import { useRouter, usePathname } from 'next/navigation';
import { Timer } from '../types';
import { useEffect } from 'react';
import { CartButton } from './buttons';
import appRoutes from '@/routes';
import useCartContext from '@/context/cart/context';
import { addToCartActionPayload } from '@/context/cart/payload';
import styles from './index.module.css';
import { ButtonEvent } from '../types/events';




interface ProductProps {
    product: Product
    showAddToCartMessage: (show: boolean) => void
}
// type DisplayProductProps = Pick<Product, 
//     '_id' | 
//     'description' | 
//     'name' | 
//     'discount' | 
//     'images' | 
//     'numSold' |
//     'price' |
//     'likes'
// >
// TODO... refactor to recieve whole product
export default function DisplayProduct({
    product,
    showAddToCartMessage
}: ProductProps) {
    const pathName = usePathname();
    const router = useRouter();
    const { setViewedProduct } = useProductsContext();
    const { addToCart } = useCartContext();
    let timer: Timer = null;
    const viewProductPathName = appRoutes.viewProduct;
    const {
        _id,
        name, 
        numSold, 
        price,
        description,
        discount,
        category,
        instock,
        images,
        likesCount,
        likes,
    } = product;

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, []);
    
    const handleViewProduct = (product: Product) => {
        if (pathName === viewProductPathName) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            timer = setTimeout(() => setViewedProduct(product));
           return
        }

        setViewedProduct(product);
        router.push(viewProductPathName);
    }

    const addProductToCart = async (
        e: ButtonEvent,
        product: Product | null,
        quantity: number,
    ) => {
        if (!product) {
            return;
        }
        e.stopPropagation();
        addToCart(addToCartActionPayload(product, quantity));
        // updateCart(addProduct);
        showAddToCartMessage(true);
    }

    return (
        <div 
        onClick={() => handleViewProduct(product)}
        className={styles.container}
        >
            <Section sectionClassName={styles.childWrapper}>
                <ProductMenu/> 
            </Section>
            <Section sectionClassName={styles.childWrapper}>
                <ProductImage 
                image={''}
                name={name} 
                likesComponent={
                    <LikeGiver 
                    likes={likes}
                    likedItemId={_id}
                    />
                }
                /> 
            </Section>
            <Section sectionClassName={styles.childWrapper}>
                <ProductDetails
                _id={_id} 
                name={name}
                description={description}
                price={price}
                discount={discount}
                />  
            </Section>
            <Section sectionClassName={styles.childWrapper}>  
                <CartButton handleClick={(e)=> addProductToCart(e, product, 1)}/>
            </Section>
        </div>
    )
}

interface TopProps {
    sectionClassName: string
    children: React.ReactNode
}

function Section({
    sectionClassName,
    children
}: TopProps) {
    return (
        <div className={sectionClassName}>
            {children}
        </div>
    )
}
