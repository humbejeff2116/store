import EmptyState, { EmptyStateButton } from '@/components/emptyState';
import failureImage from '@/images/error/error2.png';
import styles from './index.module.css';



export default function EmptyCart() {
    return (
        <EmptyState
        emptyContainerClassName={styles.emptyContainer}
        imageSrc={failureImage}
        imageAlt="Illustration of an empty cart"
        heading="No Items In cart"
        writeUp="You currently do not have items in your cart"
        >
            <EmptyStateButton
            useLink
            // buttonIcon = {
            //     <RiEye2Line className="empty-cart-button-icon"/>
            // }
            text="Start Shopping"
            href="/home" 
            />
        </EmptyState>
    )
}