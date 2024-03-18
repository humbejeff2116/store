// import React from "react"
import { IconContext } from "react-icons";
import { RiCloseFill } from "react-icons/ri";
import styles from './centerModal.module.css';
import React from "react";



interface ModalBoxProps {
    modalContainerWrapperName?: string, 
    handleModal: () => void,
    placeCloseButtonLeft?: boolean, 
    dontUseDefaultModalChildContainer?: boolean,
    dontShowCloseButton?: boolean, 
    modalContainer?: string, 
    children: React.ReactNode,
}

export function ModalBox({ 
    modalContainerWrapperName, 
    handleModal,
    placeCloseButtonLeft, 
    dontUseDefaultModalChildContainer,
    dontShowCloseButton, 
    modalContainer, 
    children,
}: ModalBoxProps): JSX.Element {  
    return(
        <div 
        className = { modalContainerWrapperName || styles.container }
        onClick = { handleModal }
        >  
        {dontShowCloseButton ? children : (
            <div className = {
                `${styles.bttnWrapper} ${placeCloseButtonLeft ? styles.bttnLeftWrapper : ""}`
            }
            onClick = { handleModal }
            >
                <IconContext.Provider value={{className: "nav-icon"}}>
                    <RiCloseFill/>
                </IconContext.Provider>
            </div>
        )}
        {dontUseDefaultModalChildContainer ? children : (
            <div className = { modalContainer || styles.child }>
                { children }
            </div> 
        )}
        </div>
    )
}