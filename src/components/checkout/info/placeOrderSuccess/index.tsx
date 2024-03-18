import styles from './index.module.css';





export default function Success() {
    return (
        <div>
            <div>
                close icon
            </div>
            <div className={styles.messageWrapper}>
                <div>
                    Order has been placed Successfully
                </div>
                <div>
                    <button>
                        Clear Checkout
                    </button>
                    <button>
                        Track Order
                    </button>
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