import BackButton from '@/components/buttons/back';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { RiShoppingBag2Line } from 'react-icons/ri';
import useCartContext from '@/context/cart/context';
import { ButtonEvent } from '@/components/types/events';



export default function CartHeader() {
    const { cartTotalNumberOfProducts, clearCart } = useCartContext();

    const handleClearCart = (e: ButtonEvent) => {
        e.stopPropagation();
        clearCart();
    }

    return (
        <div className={styles.container}>
            <BackButton
            buttonClassName={styles.button}
            />
            { (
                <button onClick={handleClearCart} className={styles.clearButton}>
                    <IconContext.Provider value={{className: styles.icon}}>
                        <RiShoppingBag2Line/>
                    </IconContext.Provider>
                    Clear
                </button>
            )}
        </div>
    )
}