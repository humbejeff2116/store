import ProductSkeleton from '@/components/product/skeleton';
import styles from './index.module.css';


const mockProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default function ProductsSkeleton() {
    return (
        <div>
            skeleton
        {mockProducts.map((_, i) =>
            <ProductSkeleton key={i}/>
        )}
        </div>
    )
}