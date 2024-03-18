import useProductsContext from '@/context/products/context';
import styles from './index.module.css';
import StarRater from '@/components/starRater';
import LikeGiver from '@/components/product/like';
import { ProductPrice } from '@/components/product/info';




const productDetails = {
    _id: "Id",
    name: "name"
}

export default function ViewProductDetails() {
    const { viewedProduct } = useProductsContext();

    if (viewedProduct) {
        return (
            <div className={styles.container}> 
                <ChildWrapper>
                <div className={styles.heartWrapper}>
                {viewedProduct && (
                    <LikeGiver 
                    likeButtonClass={styles.heartButton}
                    iconClassName={styles.heartIcon}
                    likesClass={styles.likes}
                    likedItemId={viewedProduct._id}
                    likes={viewedProduct.likes}
                    likesCount={viewedProduct.likesCount}
                    showLikes
                    />
                )}
                </div>
                </ChildWrapper>
                <ChildWrapper>
                    <div className={styles.name}>
                        {viewedProduct.name}
                    </div>
                </ChildWrapper>
                <ChildWrapper>
                    <ProductPrice 
                    containerClassName={styles.priceWrapper}
                    discount={viewedProduct.discount} 
                    price={viewedProduct.price}
                    />
                </ChildWrapper>
                {viewedProduct.discount && (
                    <ChildWrapper>
                        <div className={styles.discount}>
                            {viewedProduct.discount}% <span>
                            (discount)
                            </span>
                        </div>
                    </ChildWrapper>
                )}
                <ChildWrapper>
                    <div className={styles.numSold}>
                        {viewedProduct.numSold} <span>
                        (num&apos;s sold)
                        </span>
                    </div>
                </ChildWrapper>
            </div>
        )
    }
}

interface ChildWrapperProps {
    children: React.ReactNode
}

function ChildWrapper({
    children
}: ChildWrapperProps) {
    return (
        <div className={styles.childWrapper}>
            {children}
        </div>
    )
}