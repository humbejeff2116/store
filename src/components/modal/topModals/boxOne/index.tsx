import { IconContext } from 'react-icons';
import styles from './index.module.css';
import { RiCloseFill } from 'react-icons/ri';

interface PopupBoxProps {
    show: boolean
    message: string
    handleClose: () => void
}

export default function PopupBoxOne({
    show,
    message,
    handleClose,
}: PopupBoxProps) {
    return (
        <div className={`${styles.popupContainer} ${show && styles.showPopup}`}>
            <div className={styles.popupMessage}>
                {message}
            </div>
            <div className={styles.popupButtonsWrapper}>
                <button onClick={handleClose}>
                    <IconContext.Provider value={{className: styles.closeIcon}}>
                        <RiCloseFill/>
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    )
}