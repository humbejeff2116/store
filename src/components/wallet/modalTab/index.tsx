import { IconContext } from 'react-icons';
import styles from './index.module.css';
import { BiArrowToBottom, BiArrowToTop } from 'react-icons/bi';
import { transactions } from '..';





interface ModalTabProps {
    headingText: string
    activeTab: string
    setActiveTab: (tabName: string)=> void
}
export default function ModalTab({
    headingText,
    setActiveTab,
    activeTab,
}: ModalTabProps) {
    const { deposit, withdraw, transfer } = transactions
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                {headingText}
            </div>
            <div className={styles.buttonsWrapper}>
            <button 
                disabled={activeTab === deposit ? true : false} 
                onClick={() => setActiveTab(deposit)} 
                className={`${styles.button} ${activeTab === deposit && styles.activeTab}`}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <BiArrowToBottom/>
                    </IconContext.Provider>
                    Deposit
            </button>
                <button 
                disabled={activeTab === withdraw ? true : false} 
                onClick={() => setActiveTab(withdraw)} 
                className={`${styles.button} ${activeTab === withdraw && styles.activeTab}`}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <BiArrowToBottom/>
                    </IconContext.Provider>
                    Withdraw
                </button>
                <button 
                disabled={activeTab === transfer ? true : false}
                onClick={() => setActiveTab(transfer)}  
                className={`${styles.button} ${activeTab === transfer && styles.activeTab}`}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <BiArrowToTop/>
                    </IconContext.Provider>
                    Transfer
                </button>
            </div>
        </div>
    )
}