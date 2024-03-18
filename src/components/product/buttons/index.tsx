import { IconContext } from 'react-icons';
import styles from './index.module.css';
import { RiAddFill, RiShoppingBag2Fill, RiShoppingBag2Line } from 'react-icons/ri';
import { ButtonEvent } from '@/components/types/events';

interface CartButtonProps {
    buttonClass?: string
    addIconClass?: string
    bagIconClass?: string
    handleClick: (e: ButtonEvent) => void

}

export function CartButton({
    buttonClass,
    addIconClass,
    bagIconClass,
    handleClick
}: CartButtonProps) {
    return (
        <button
        className={buttonClass || styles.button}
        onClick={handleClick}
        >
            <IconContext.Provider value={{className: addIconClass || styles.addIcon}}>
                <RiAddFill/>
            </IconContext.Provider>
            <IconContext.Provider value={{className: bagIconClass || styles.bagIcon}}>
                <RiShoppingBag2Line/>
            </IconContext.Provider>
        </button>
    )
}