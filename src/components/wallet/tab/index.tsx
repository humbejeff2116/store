import { IconContext } from 'react-icons';
import { FiActivity, FiArrowLeft } from 'react-icons/fi';
import styles from './index.module.css';
import { BiWallet } from 'react-icons/bi';

export const tabs = {
    funds: 'funds',
    transactions: 'transactions'
}
interface FundsTabProps {
    activeTab: string
    handleSetTab: (tabName: string) => void
}
export default function FundsTab({
    activeTab,
    handleSetTab
}: FundsTabProps) {
    const { funds, transactions } = tabs;
    return (
        <div className={styles.container}>
            <div className={styles.child}>
                <button 
                title='Funds'
                className={`${styles.button} ${activeTab === funds && styles.isActive}`} 
                onClick={() => handleSetTab(funds)}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <BiWallet/>
                    </IconContext.Provider>
                </button>
                <button 
                title='Transactions' 
                className={`${styles.button} ${activeTab === transactions && styles.isActive}`}
                onClick={() => handleSetTab(transactions)}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <FiActivity/>
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    )
}