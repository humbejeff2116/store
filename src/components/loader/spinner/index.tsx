import styles from './spinner.module.css';


interface SpinnerProps {
    containerClassName?: string, 
    loaderClassName?: string,
    unsetMarginTop?: boolean 
}

export function Spinner({
    containerClassName, 
    loaderClassName,
    unsetMarginTop 
}: SpinnerProps) {
    return (
        <div className={containerClassName || `${styles.smallContainer} ${unsetMarginTop ? styles.unsetMarginTop : ""}`}>
            <div className={loaderClassName || styles.child}> </div>
        </div>
    ) 
}


interface SpinnerSmallprops {
    unsetMarginTop?: boolean
}

export function SpinnerSmall({
    unsetMarginTop, 
}: SpinnerSmallprops) {
    return (
        <div className={`${styles.smallContainer} ${unsetMarginTop ? styles.unsetMarginTop : ""}`} >
            <div className={styles.smallChild}> </div>
        </div>
    ) 
}

interface SpinnerSmallWithTextProps {
    unsetMarginTop?: boolean,
    bottomPosition: boolean
    loadingText: string
}

export function SpinnerSmallWithText({
    unsetMarginTop,
    bottomPosition,
    loadingText
}: SpinnerSmallWithTextProps) {
    return (
        <div className={styles.smallWithTextContainer}>
            <SpinnerSmall unsetMarginTop={unsetMarginTop}/>
            <div className={styles.smallWithTextChild}>
            {loadingText}
            </div>
        </div>
    ) 
}

interface BottomSpinnerProps {
    showLoader: boolean, 
    loaderWrapperClassName?: string, 
    spinnerContainerClassName?: string, 
    spinnerClassName?: string, 
    children?: React.ReactNode
}

export function BottomSpinner({ 
    showLoader, 
    loaderWrapperClassName, 
    spinnerContainerClassName, 
    spinnerClassName, 
    children
}: BottomSpinnerProps) {
    const wrapperClassName = `${ loaderWrapperClassName || styles.bottomWrapperContainer}`
    const spinnerContainer = spinnerContainerClassName || styles.spinnerContainer;
    const spinner = spinnerClassName || styles.spinner;

    return (
        <div className={ 
            showLoader ? `${wrapperClassName} ${styles.showBottomLoader}` : wrapperClassName
        }>
            <Spinner
            containerClassName = { spinnerContainer }
            loaderClassName = { spinner }
            />
            { children }
        </div>
    )
}