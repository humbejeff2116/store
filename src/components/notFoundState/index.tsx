import { StaticImageData } from 'next/image';
import EmptyState, { ReloadButton } from '../emptyState';

interface NotFoundStateProps {
    imageSrc: StaticImageData, 
    imageAlt: string, 
    heading: string, 
    writeUp:string,
    dontShowReloadButton: boolean,
    reloadContent: () => void,
    reloadButtonText: string
}

export function NotFoundState({ 
    imageSrc, 
    imageAlt, 
    heading, 
    writeUp,
    dontShowReloadButton,
    reloadContent,
    reloadButtonText
}: NotFoundStateProps) {
    return (
        <EmptyState
        imageSrc = { imageSrc }
        imageAlt = { imageAlt }
        heading = { heading }
        writeUp = { writeUp }
        >
        {dontShowReloadButton ? "" : (
            <ReloadButton
            handleClick = { reloadContent }
            reloadButtonText = { reloadButtonText }
            />
        )}
        </EmptyState>
    )
}