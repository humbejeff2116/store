import styles from './index.module.css';




interface ModalChildWrapperProps {
    show: boolean
    showClass?: string
    children: React.ReactNode
}

export default function ModalChildWrapper({
    show,
    showClass,
    children
}: ModalChildWrapperProps) {
    const wrapperClass = `${styles.container} ${show &&  (showClass ?? styles.show)}`;

    return (
        <div className={wrapperClass}>
            {children}
        </div>
    )
}