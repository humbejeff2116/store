import emptyImage from '@/images/error/error2.png';
import styles from './index.module.css';
import { StaticImageData } from 'next/image';
import { SpinnerSmall } from '@/components/loader/spinner';
import EmptyState from '@/components/emptyState';



interface LoadingErrorAndEmptyStateCompProps {
    loading: boolean
    error: boolean
    loaded: boolean
    array: Array<any> | null
    children: JSX.Element
    emptyStateComp?: JSX.Element
    errorStateComp?: JSX.Element 
    emptyStateHeading?: string
    emptyStateBody?: string
    emptyStateImage?: StaticImageData
    errorStateHeading?: string
    errorStateBody?: string
    errorStateImage?: StaticImageData
}


/**
 * returns loading, empty or error states
 * no need to pass EmptyState component props if a custom 
 * emptyStateComp or errorStateComp is used
 * @param 
 * @returns 
 */
export function LoadingErrorAndEmptyStateComp({
    loading,
    error,
    loaded,
    array,
    emptyStateComp,
    errorStateComp,
    emptyStateHeading,
    emptyStateBody,
    emptyStateImage,
    errorStateHeading,
    errorStateBody,
    errorStateImage,
    children
}: LoadingErrorAndEmptyStateCompProps) {

    return (
        <>
        {loading ? (
            <div className={styles.loadingContainer}>
                <SpinnerSmall/>
            </div>
        ) : error ? (
            errorStateComp ?? (
                <div className={styles.emptyStateWrapper}>
                    <EmptyState 
                    heading={errorStateHeading} 
                    writeUp={errorStateBody} 
                    imageSrc={errorStateImage ?? emptyImage}
                    />
                </div>
            )
        ) : !error && array && array.length < 1 ? (
            emptyStateComp ?? (
                <div className={styles.emptyStateWrapper}>
                    <EmptyState 
                    heading={emptyStateHeading} 
                    writeUp={emptyStateBody} 
                    imageSrc={emptyStateImage ?? emptyImage}
                    />
                </div>
            )
        ) : ( 
            children
        )}
        </>
    )
}