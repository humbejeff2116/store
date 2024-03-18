import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { AiOutlineReload } from 'react-icons/ai';
import { IconContext } from "react-icons";
import failureImage from '@/images/error/error2.png';
import styles from './index.module.css';


interface EmptyStateProps {
    imageAlt?: string, 
    emptyContainerClassName?: string,
    emptyContentWrapperClassName?: string,
    emptyImageWrapperClassName?: string,
    emptyHeaderclassName?: string,
    emptyBodyClassName?: string, 
    children?: React.ReactNode
    heading?: string, 
    writeUp?: string,
    imageSrc?: StaticImageData | string, 
}

export default function EmptyState({ 
    emptyContainerClassName,
    emptyContentWrapperClassName,
    emptyImageWrapperClassName,
    emptyHeaderclassName,
    emptyBodyClassName, 
    children,
    imageSrc, 
    imageAlt, 
    heading, 
    writeUp, 
}: EmptyStateProps) {
    return (
        <div className={emptyContainerClassName || styles.emptyContainer}>
            <div className={emptyContentWrapperClassName || styles.emptyContentWrapper}>
                <div className={emptyImageWrapperClassName || styles.emptyImageWrapper}>
                    <Image src={imageSrc ?? failureImage} alt ={imageAlt ?? ""}/>
                </div>
                <div className={emptyHeaderclassName || styles.emptyHeader}>
                    {heading}
                </div>
                <div className={emptyBodyClassName || styles.emptyBody}>
                    {writeUp} 
                </div>
                {children}
            </div>
        </div> 
    )
}

interface ReloadButtonProps {
    handleClick?: () => void, 
    reloadButtonText?: string
}

export function ReloadButton({ 
    handleClick, 
    reloadButtonText
}: ReloadButtonProps) {
    return (
        <div className={styles.reloadButtonWrapper}>
            <button className={styles.reloadButton} onClick={handleClick}>
                <IconContext.Provider value={{className: styles.reloadButtonIcon}}>
                    <AiOutlineReload/>
                </IconContext.Provider>
                {reloadButtonText || "Reload"}
            </button>
        </div>
    )
}

interface EmptyStateButtonProps {
    handleClick?: () => void, 
    useLink: boolean,
    text: string,
    icon?: JSX.Element,
    href?: string 
}

export function EmptyStateButton({ 
    handleClick, 
    useLink,
    text,
    icon,
    href 
}: EmptyStateButtonProps) {

    const child = (
       <>
        {icon && (
            <IconContext.Provider value={{className: styles.reloadButtonIcon}}>
            {icon}
            </IconContext.Provider>
        )}
        {text}
       </> 
    )
        return (
            <div className={styles.reloadButtonWrapper}>
                {(useLink && href) ? (
                    <Link className={styles.reloadButton} href={href}>
                    {child}
                    </Link>
                ) : (
                    <button className={styles.reloadButton} onClick={handleClick}>
                    {child}
                    </button>   
                )}
            </div>
        )
}