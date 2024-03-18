import React from "react";
import { useRouter } from 'next/navigation';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { IconContext } from "react-icons";
import styles from './index.module.css';

interface BackButtonProps {
    buttonClassName?: string 
    icon?: JSX.Element 
    buttonIconClassName?: string
}

export default function BackButton({ 
    buttonClassName, 
    icon, 
    buttonIconClassName, 
}: BackButtonProps) {
    const router = useRouter();

    // const goBack = (router: AppRouterInstance) => {
    //     return router.back();
    // }

    return (
        <button
        className={buttonClassName ?? styles.button} 
        onClick={()=> router.back()}
        >
        <IconContext.Provider value={{className: buttonIconClassName || styles.icon}}>
            {icon || <RiArrowGoBackFill/>}
        </IconContext.Provider>
        </button>     
    )
}