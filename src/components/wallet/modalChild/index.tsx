import styles from './index.module.css';


interface FundsModalChildProps {
    containerClass?: string
    show: boolean
    children: React.ReactNode
}

export default function ModalChild({
    containerClass,
    show,
    children

}: FundsModalChildProps) {
    return (
        <div 
        className={`${containerClass ?? styles.container} ${show && styles.show}`}
        onClick={(e)=> e.stopPropagation()}
        >
            {children}
        </div>
    )
}