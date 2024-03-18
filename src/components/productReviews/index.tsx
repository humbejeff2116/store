import styles from './index.module.css';
import reviewHTTPService from '@/services/review';
import ProductReviewsHeader from '../productReviewsHeader';
import { useDataFetch } from '@/hooks';
import EmptyState from '../emptyState';
import failureImage from '@/images/error/error2.png';
import { ErrorState } from '../errorState';
import ReviewComp from '../productReview';
import { useEffect, useState } from 'react';
import cache from '@/lib/cache';


const mockReviews =[{}, {}, {}, {}]

interface ProductReviewsProps {
    productId: string
}

export default function ProductReviews({
    productId
}: ProductReviewsProps) {
    const [reviews, setReviews] = useState<Array<any> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');


    useEffect(() => {
        const reviewsCacheKey = `productReviews-${productId}`;
        const productReviews = cache.get(reviewsCacheKey);

        if (productReviews) {
            setReviews(productReviews);
            return;
        }

        const getProductReviews = async (productId: string) => {
            setLoading(true);
            try {
                const response = await reviewHTTPService.getAllProduct(productId);
                if (!response.error) {
                    setReviews(response.data);
                    cache.set(reviewsCacheKey, response.data)
                } 
            } catch (err) {
                setError(true);    
            } finally {
                setLoading(false);
            }
        }
        // getProductReviews(productId);

        setReviews(mockReviews)

        return () => {
            // TODO... abort axios request if still in progress here
        }
    }, [productId]);
    
    // const { loading, error, message, data:reviews } = useDataFetch(reviewHTTPService.getAllProduct(productId))
    return (
        <div className={styles.container}>
            {loading || !reviews ? (
                // TODO... return reviews skeleton screen here
                <>Loading...</>
            ) : error ? (
                <EmptyState
                emptyContainerClassName={styles.emptyContainer}
                imageSrc={failureImage}
                imageAlt="Illustration representing product reviews"
                heading="Product Reviews"
                writeUp="We couldn't find any product reviews at the moment."
                >
                </EmptyState>
            ) : reviews.length < 1 ? (
                <ErrorState 
                imageSrc={failureImage} 
                imageAlt="Illustration representing product reviews error" 
                heading="Product Reviews"
                writeUp="Error occured while getting product reviews." 
                />
            ): (
                <>
                    <ProductReviewsHeader total={reviews?.length}/>
                    {Array.isArray(reviews) && reviews.map((review, i) =>
                        <ReviewComp key={i} {...review}/>
                    )}
                </>
            )}
        </div>
    )
}