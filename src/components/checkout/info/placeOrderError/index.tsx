import styles from './index.module.css';





export default function Error() {
    return (
        <div>
            <div>
                close icon
            </div>
            <div className={styles.messageWrapper}>
                <div>
                    Error occured while attempting to place order...
                </div>
            </div>
            <RateService/>
        </div>
    )
}




function RateService() {
    return (
        <div>

        </div>
    )
}