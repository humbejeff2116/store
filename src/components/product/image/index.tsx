import Image, { StaticImageData } from 'next/image';
import styles from './index.module.css';

interface ProductImageProps {
    image: StaticImageData | string
    name: string
    likesComponent: React.ReactNode
}

export default function ProductImage({
    image,
    name,
    likesComponent
}: ProductImageProps) {
    return (
        <div className={styles.imageWrapper}>
            <Image src={image} alt={`An image of ${name}`}/>
            <LikesWrapper>
                {likesComponent}
            </LikesWrapper>
        </div>
    )
}


interface LikesWrapperProps {
    children: React.ReactNode
}
function LikesWrapper({
    children
}: LikesWrapperProps) {
    return (
        <div className={styles.likesWrapper}>
            {children}
        </div>
    )
}