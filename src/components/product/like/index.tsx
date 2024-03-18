import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import useAuth, { User } from '@/context/auth/context';
import productHTTPService from '@/services/product';
import styles from './index.module.css';
import { ProductLike } from '@/context/products/context';
import { ButtonEvent } from '@/components/types/events';
import { RiAddBoxLine } from 'react-icons/ri';

interface LikeGiverProps {
    likeButtonClass?: string
    likesClass?: string
    iconClassName?: string
    likedItemId: string
    likes?: Array<ProductLike>
    likesCount?: number
    showLikes?: boolean
}

export default function LikeGiver({
    iconClassName,
    likesClass,
    likeButtonClass,
    likedItemId,
    likes,
    likesCount,
    showLikes
}: LikeGiverProps) {
    const [likeProduct, setLikeProduct] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        setProcessing(true);
        if (user && userLikeProduct(user, likes)) {
            setLikeProduct(true);
        }
        setProcessing(false);
    }, [likes, user])

    const handleLike = async (e: ButtonEvent, user: User | null, likes?: Array<ProductLike>) => {
        e.preventDefault();
        e.stopPropagation();
        setProcessing(true);
        if (!user) return;

        const userLike = {
            like: true, 
            userId: user._id,
            timestamp: Date.now()
        }

        try {
            if (!likes || likes.length < 1 || !userLikeProduct(user, likes)) {
                setLikeProduct(true);
                await productHTTPService.like(likedItemId, userLike);  
                return;
            }
    
            userLike .like = false;
            setLikeProduct(false);
            await productHTTPService.like(likedItemId, userLike);    
        } catch (err) {
            setError(true);
        } finally {
            setProcessing(false); 
        }
    }

    const userLikeProduct = (user: User | null, likes?: Array<ProductLike>) => {
        if (!user || !likes || likes.length < 1) {
            return false;
        }
        return likes.findIndex(like => like.userId === user._id) > -1 ? true : false;
    }

    return (
        <button
        disabled={processing} 
        onClick={(e) => handleLike(e, user, likes)}
        className={likeButtonClass || styles.button}
        >
            <IconContext.Provider value={{className: iconClassName || styles.icon}}>
            {likeProduct ? <AiFillHeart/> : <AiOutlineHeart/>}
            </IconContext.Provider>
            {showLikes && (
                <div className={likesClass || styles.likes}>
                    30k
                    {/* {likesCount} */}
                </div>
            )}
        </button>
    )
}