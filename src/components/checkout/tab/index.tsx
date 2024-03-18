import BackButton from '@/components/buttons/back';
import styles from './index.module.css';





export default function CheckoutTab() {
    return (
        <div className={styles.container}>
            <BackButton buttonClassName={styles.backButton}/>
        </div>
    )
}