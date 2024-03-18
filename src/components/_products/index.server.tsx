import { Suspense } from 'react';
import ProductsNav from '../productsNav';
import Products from '../products/index.server';
import styles from './index.module.css';
import ProductsSkeleton from '../skeleton/products';
import ProductsIntro from '../productsIntro';


export default function _Products() {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <ProductsIntro/>
            </div>
            <div className={styles.middle}>
                <ProductsNav/>
            </div>
            <div className={styles.bottom}>
                <Suspense fallback={<ProductsSkeleton/>}>
                    <Products/>    
                </Suspense>
            </div>
        </div>
    )
}
