import React from "react";
import { RiCloseFill } from "react-icons/ri";
import usePopUpFor from '../shared';
import styles from '../modals.module.css';
import { IconContext } from "react-icons";
import { BiCheck, BiError } from "react-icons/bi";


interface TopPopupBoxProps {
    usedFor?: string, 
    errorContainerClassName?: string,
    messageWrapperClassName?: string,
    closeClassName?: string,
    closeIconClassName?: string, 
    message: string | null,
    closePopUp?: () => void,
    showPopUp: boolean,
    props?: object 
    dontShowCloseButton?: boolean
}
export function TopPopUpBox({ 
    usedFor, 
    errorContainerClassName,
    messageWrapperClassName,
    closeClassName,
    closeIconClassName, 
    message,
    closePopUp,
    showPopUp,
    dontShowCloseButton,
    ...props 
}: TopPopupBoxProps) {
    const { success, error } = usePopUpFor;

    if (usedFor === success) {
        return (
            <div className={ 
                `${styles.popupContainer} 
                ${styles.popupContainerTop} 
                ${styles.success} 
                ${showPopUp && styles.showPopUp}
                `
            }>
                <div className={ messageWrapperClassName || `${styles.popupTextWrapper} ${styles.successTextWrapper}` }>
                    <IconContext.Provider value={{className: styles.icon}}>
                        <BiCheck/>
                    </IconContext.Provider>
                    <span className={styles.message}>
                    { message }
                    </span>
                </div>
                {dontShowCloseButton ? null : (
                    <div className={ closeClassName || styles.closeContainer } onClick={ closePopUp }>
                        <IconContext.Provider value={{className: closeIconClassName || styles.closeIconWrapper}}>
                            <RiCloseFill/>
                        </IconContext.Provider>
                    </div>
                )}
            </div> 
        )
    }

    if (usedFor === error) {
        return (
            <div 
            className={ 
                `${styles.popupContainer} 
                ${styles.popupContainerTop} 
                ${styles.error} 
                ${showPopUp && styles.showPopUp}
                `
            } 
            >
                <div className={ messageWrapperClassName || `${styles.popupTextWrapper} ${styles.errorTextWrapper}` }>
                    <IconContext.Provider value={{className: `${styles.icon} ${styles.erroIcon}`}}>
                        <BiError/>
                    </IconContext.Provider>
                    <span className={styles.message}>
                    { message }
                    </span>
                </div>
                <div className={ closeClassName || styles.closeContainer } onClick={ closePopUp } >
                    <IconContext.Provider value={{className: closeIconClassName || styles.closeIconWrapper}}>
                        <RiCloseFill/>
                    </IconContext.Provider>
                </div>
            </div> 
        )
    }

    return (
        <div className={ 
            `${styles.popupContainer} 
            ${styles.popupContainerTop} 
            ${styles.error} 
            ${showPopUp && styles.showPopUp}
            `
        } >
            <div className={ messageWrapperClassName || styles.popupTextWrapper }>
                { message }
            </div>
            <div className={ closeClassName || styles.closeContainer } onClick={ closePopUp }>
                <IconContext.Provider value={{className: closeIconClassName || styles.closeIconWrapper}}>
                    <RiCloseFill/>
                </IconContext.Provider>
            </div>
        </div> 
    )  
}