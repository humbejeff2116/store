import ProductReviewAvatar from '../productReviewAvatar';
import styles from './index.module.css';

interface ReviewProps {
    timestamp: string
    userId: string
    starRating: number
}

export default function Review({
    timestamp,
    userId,
    starRating
}: ReviewProps) {
    return (
        <div className={styles.ReviewConatiner}>
            <ReviewChildWrapper>
                <StarRating rating={starRating}/>
            </ReviewChildWrapper>
            <ReviewChildWrapper>
                <div className={styles.reviewText}>
                    review text
                </div>
            </ReviewChildWrapper>
            <ReviewChildWrapper>
                <div className={styles.avatarWrapper}>
                    <ProductReviewAvatar userId={userId}/>
                    <div className={styles.reviewDate}>
                        {timestamp || "time stamp"}
                    </div>
                </div>
            </ReviewChildWrapper>
            <ReviewChildWrapper>
                <ReviewHelpful/>
            </ReviewChildWrapper>
        </div>
    )
}

interface ReviewChildWrapperProps {
    children: React.ReactNode
}

function ReviewChildWrapper({
    children
}: ReviewChildWrapperProps) {
    return (
        <div className={styles.childWrapper}>
            {children}
        </div>
    )

}

interface StarRatingProps {
    rating: number
}

function StarRating({
    rating
}: StarRatingProps) {
    return (
        <div className={styles.starRatingWrapper}>
            5 stars
        </div>
    )
}

function ReviewHelpful() {
    return (
        <div className={styles.reviewHelpfulWrapper}>
            <div className={styles.reviewHelpfulText}>
                Was this review helpful?
            </div>
            <div className={styles.reviewHelpfulBttnsWrapper}>
                <button>
                    Yes
                </button>
                <button>
                    No
                </button>
            </div>
        </div>
    )
}