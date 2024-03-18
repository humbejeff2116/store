import { SpinnerSmall } from '@/components/loader/spinner';
import styles from './index.module.css';


interface LoaderProps {
    show: boolean
    text: string
}

export default function Loader({
    show,
    text
}: LoaderProps) {
    const wrapperClassName = `${styles.loaderWrapper} ${show && styles.show}`
    return (
        <div className={wrapperClassName}>
            <SpinnerSmall unsetMarginTop/>
            {text}
        </div>
    )
}