'use client'
import { Suspense, useEffect, useState, useTransition } from 'react';
import useProductsContext from '@/context/products/context';
import { ButtonEvent } from '@/components/types/events';
import ImageSlider from './imageSlider';
import ViewProductMenu from './menu';
import ViewProductDetails from './productDetails';
import ProductReviews from '../productReviews';
import SimilarProducts from '../productsSimilar';
import styles from './index.module.css';
import DetailAccordion from './detailAccordion';
import { TopPopUpBox } from '../modal/topModals';
import { Timer } from '../types';
import usePopUpFor from '../modal/shared';


export default function ViewProduct() {
    return (
        <ViewProductWrapper leftBottomChild={<ViewProductBottom/>}/>
    )
}

interface ViewProductProps {
    leftBottomChild: React.ReactNode
}

function ViewProductWrapper({
    leftBottomChild
}: ViewProductProps) {
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const { viewedProduct } = useProductsContext();

    useEffect(() => {
        let timer: Timer = null;

        if (showMessage) {
            timer = setTimeout(() => setShowMessage(false), 4000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [showMessage])

    const handleAddToCartMessage = (message: string) => {
        setMessage(message);
        setShowMessage(true);
    }

    return (
        <div className={styles.container}>
            <TopPopUpBox
            usedFor={usePopUpFor.success}
            dontShowCloseButton
            message={message}
            showPopUp={showMessage}
            />
            <div className={styles.left}>
                <ViewProductMenu 
                handleAddToCartMessage={handleAddToCartMessage}
                />
                <ImageSlider/>
                <div className={styles.leftDetailsWrapper}>
                    <DetailAccordion 
                    title='Description' 
                    showDetails 
                    >
                        <div>
                        {viewedProduct?.description || `
                            lorem ispium lo ra pen t dala
                            lorem ispium lo ra pen t dala
                            lorem ispium lo ra pen t dala
                            cet cat feit de nu lo ra pen t dala
                            rep sert tu la dress ra pen t dala
                            lorem ispium lo ra pen t dala
                            lorem ispium lo ra pen t dala
                            lorem ispium lo ra pen t dala
                            lorem ispium lo ra pen t dala
                            lorem ispium lo ra pen t dala
                            lorem ispium lo ra pen t dala
                            cet cat feit de nu lo ra pen t dala
                            rep sert tu la dress ra pen t dala
                        `}
                        </div>
                    </DetailAccordion>
                </div>
                <div className={styles.leftBottom}>
                    {leftBottomChild}
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.rightChildWrapper}>
                    <ViewProductDetails/>
                </div>
            </div>
        </div>
    )
}


const viewItemBottomButtons = {
    similarProducts: 'similarProducts',
    reviews: 'reviews'
}

function ViewProductBottom() {
    const [showReviews, setShowReviews] = useState(true);
    const [isPending, setTransition] = useTransition();
    const { viewedProduct } = useProductsContext();

    const toggleShowReviews = (e: ButtonEvent, viewItem: string) => {
        e.stopPropagation();
        switch (viewItem) {
            case viewItemBottomButtons.reviews:
                return setTransition(() => setShowReviews(prevState => !prevState && true))
            case viewItemBottomButtons.similarProducts:
                return setTransition(() => setShowReviews(false))
            default:
                return setTransition(() => setShowReviews(prevState => !prevState && true))
        }
    }
    return (
        <>
        <ViewItemBottomTab 
        reviewTabIsActive={showReviews}
        handleClick={toggleShowReviews}
        />
        {
        // viewedProduct && (
            showReviews ? (
                <ProductReviews productId={'viewedProduct._id'}/>
            ) : (
                <SimilarProducts category={'viewedProduct.category'}/>
            )
        // )
        }
        </>
    )
}
interface ViewItemBottomTabProps {
    reviewTabIsActive: boolean
    handleClick: (e: ButtonEvent, item: string) => void
}

function ViewItemBottomTab({
    reviewTabIsActive,
    handleClick
}: ViewItemBottomTabProps) {
    return (
        <div className={styles.tabButtonWrapper}>
            <button 
            className={`${styles.tabButton} ${reviewTabIsActive && styles.tabActive}`}
            onClick={(e) => handleClick(e, viewItemBottomButtons.reviews)}
            >
                Reviews
            </button>

            <button
            className={`${styles.tabButton} ${!reviewTabIsActive && styles.tabActive}`} 
            onClick={(e) => handleClick(e, viewItemBottomButtons.similarProducts)}
            >
                Similar Products
            </button>
        </div>
    )
}