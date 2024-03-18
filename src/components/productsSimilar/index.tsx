import { useEffect, useState } from 'react';
import productHTTPService from '@/services/product';
import cache from '@/lib/cache';
import { useDataFetch } from '@/hooks';
import failureImage from '@/images/error/error2.png';
import EmptyState from '../emptyState';
import { ErrorState } from '../errorState';
import ProductsWrapper from '../productsWrapper';
import styles from './index.module.css';
import DisplayProduct from '../product';
import { products } from '@/testData/products';

interface SimilarProductsProps {
    category: string
}


const mockProducts = products;
export default function SimilarProducts({
    category
}: SimilarProductsProps) {
    const [products, setProducts] = useState<Array<any> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);


    useEffect(() => {
        const reviewsCacheKey = `similar-products-${category}`;
        const similarProducts = cache.get(reviewsCacheKey);

        if (similarProducts) {
            setProducts(similarProducts);
            return;
        }

        const getProductReviews = async (category: string) => {
            setLoading(true);
            try {
                const response = await productHTTPService.getSimilar(category);
                if (!response.error) {
                    setProducts(response.data);
                    cache.set(reviewsCacheKey, response.data)
                } 
            } catch (err) {
                setError(true);    
            } finally {
                setLoading(false);
            }
        }
        // getProductReviews(category);
        setProducts(mockProducts);

        return () => {
            // TODO... abort axios request if still in progress here
        }
    }, [category]);

    // const { loading, error, message, data:products } = useDataFetch(productHTTPService.getSimilar(category));
    
    return (
        <div>
            {loading || !products ? (
                // TODO... return products skeleton screen here
                <>Loading...</>
            ) : error ? (
                <ErrorState 
                imageSrc={failureImage} 
                imageAlt="Illustration representing similar products error" 
                heading="Similar Products"
                writeUp="Error occured while getting Similar Products." 
                />
            ) : products.length < 1 ? (
                <EmptyState
                emptyContainerClassName={styles.emptyContainer}
                imageSrc={failureImage}
                imageAlt="Illustration representing similar products"
                heading="Similar Products"
                writeUp="We couldn't find any similar product at the moment."
                >
                </EmptyState>
            ): (
                <div className={styles.productsContainer}>
                    <div className={styles.productsWrapper}>
                    {products.map((product, i) => 
                        <DisplayProduct
                        showAddToCartMessage={setShowAddToCartMessage}
                        key={product._id} 
                        product={product}
                        />
                    )}
                    </div>
                    {/* <ProductsWrapper products={products}/> */}
                </div>
            )}            
        </div>
    )
}