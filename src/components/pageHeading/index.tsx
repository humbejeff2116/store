import styles from './index.module.css';



interface PageHeadingProps {
    heading: string
    body?: string 
    illustration: React.ReactNode  
}
export default function PageHeading({
    heading,
    body, 
    illustration
}: PageHeadingProps) {
    return (
        <div className={styles.container}>
            <div className={`${styles.child} ${styles.left}`}>
                <div className={styles.writeupWrapper}>
                    <div className={styles.heading}>
                        {heading}
                    </div>
                    {body && (
                        <div className={styles.body}>
                        {body}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.emptyChild}>
                {illustration}
            </div>
        </div>
    )
}