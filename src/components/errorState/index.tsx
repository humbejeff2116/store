import { StaticImageData } from "next/image";
import EmptyState, {  ReloadButton } from "../emptyState";
import failureImage from '@/images/error/error2.png';
// import styles from './errorState.module.css';


interface ErrorStateProps {
    imageSrc?: StaticImageData 
    imageAlt: string 
    heading: string 
    writeUp: string
    dontShowReloadButton?: boolean
    reloadContent?: () => void
    reloadButtonText?: string
    containerClassName?: string
}

export function ErrorState({ 
    imageSrc, 
    imageAlt, 
    heading, 
    writeUp,
    dontShowReloadButton,
    reloadContent,
    reloadButtonText,
    containerClassName,
}: ErrorStateProps) {
    return (
        <EmptyState
        emptyContainerClassName={containerClassName}
        imageSrc={failureImage}
        imageAlt={imageAlt}
        heading={heading}
        writeUp={writeUp}
        >
        {dontShowReloadButton ? null : (
            <ReloadButton
            handleClick={reloadContent}
            reloadButtonText={reloadButtonText ?? 'Realod'}
            />
        )}
        </EmptyState>
    )
}