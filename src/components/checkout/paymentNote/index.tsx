import styles from './index.module.css';




interface PaymentIntroNoteProps {
    heading: string
    bodyText: string
}

export default function PaymentIntroNote({
    heading,
    bodyText
}: PaymentIntroNoteProps) {
    return (
        <div className={styles.container}>
            <div className={styles.childWrapper}>
                <div className={styles.textWrapper}>
                    <div className={styles.heading}>
                        {heading} Lorem ispium
                    </div>
                    <div className={styles.body}>
                        {bodyText} lorem is pium de va ckyut tuh pre brak
                    </div>
                </div>
            </div>
            <div className={styles.childWrapper}>
                illustration
            </div>
        </div>
    )
}