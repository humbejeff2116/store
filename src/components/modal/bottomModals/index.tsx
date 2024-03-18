import React from 'react';
import { IconContext } from 'react-icons';
import { RiCloseFill } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import usePopUpFor from '../shared';
import styles from '../modals.module.css';

interface BottomPopupProps {
    usedFor?: string, 
    errorContainerClassName?: string,
    messageWrapperClassName?: string,
    closeClassName?: string,
    closeIconClassName?: string, 
    message: string,
    closePopUp: () => void,
    showPopUp: boolean,
    props?: object
}
export function BottomPopUpBox({ 
    usedFor, 
    errorContainerClassName,
    messageWrapperClassName,
    closeClassName,
    closeIconClassName, 
    message,
    closePopUp,
    showPopUp,
}: BottomPopupProps) {
    const { success, error } = usePopUpFor;
    const successClassname = `${styles.popupContainer} ${styles.success}`;
    const errorClassname = `${styles.popupContainer} ${styles.error}`;

    if (usedFor === success) {
        return (
            <div className={ 
                showPopUp ? `${successClassname} ${styles.showPopUp}` : successClassname
            }>
                <div className={ messageWrapperClassName || styles.popupTextWrapper }>
                    <IconContext.Provider value={{className: `${styles.icon} ${styles.successIcon}`}}>
                        <IoMdCheckmarkCircleOutline/>
                    </IconContext.Provider>
                    { message }
                </div>
                <div className={ closeClassName || styles.closeContainer } onClick={ closePopUp } >
                    <IconContext.Provider value={{className: closeIconClassName || styles.closeIconWrapper}}>
                        <RiCloseFill/>
                    </IconContext.Provider>
                </div>
            </div> 
        )
    }

    if (usedFor === error) {
        return (
            <div className={ 
                showPopUp ? `${errorClassname} ${styles.showPopUp}` : errorClassname
            }>
                <div className={ messageWrapperClassName || styles.popupTextWrapper }>
                    <IconContext.Provider value={{className: `${styles.icon} ${styles.erroIcon}`}}>
                        <IoMdCheckmarkCircleOutline/>
                    </IconContext.Provider>
                    { message }
                </div>
                <div className={ closeClassName || styles.closeContainer } onClick={ closePopUp }>
                    <IconContext.Provider value={{className: closeIconClassName || styles.closeIconWrapper}}>
                        <RiCloseFill />
                    </IconContext.Provider>
                </div>
            </div> 
        )
    }

    return (
        <div className={ 
            showPopUp ? (
                `${styles.popupContainer} ${styles.showPopUp}`
            ) : (
                `${styles.popupContainer}`
            )
        }>
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

interface BottomErrorPopUpProps {
    errorContainerClassName?: string,
    errorContainerShowClassName?: string,
    panelClassName?: string,
    closeClassName?: string,
    closeIconClassName?: string,
    message: string,
    closePopUp: () => void,
    showPopUp: boolean,
    props?: object
}
export function BottomErrorPopUpBox({ 
    errorContainerClassName,
    errorContainerShowClassName,
    panelClassName,
    closeClassName,
    closeIconClassName, 
    message,
    closePopUp,
    showPopUp,
    ...props 
}: BottomErrorPopUpProps) {
    const className = `${styles.popupContainer} ${styles.error}`;

    return (
        <div className={ 
            showPopUp ? `${className} ${styles.showPopUp}` : className
        }>
            <div className={ panelClassName || styles.popupTextWrapper }>
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