import { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { FiActivity } from 'react-icons/fi';
import { RiCalendarFill, RiCoinsFill } from 'react-icons/ri';
import IntroTemplate from '../template';
import { LoadingErrorAndEmptyStateComp } from '../state';
import { GoKebabHorizontal } from 'react-icons/go';



interface Transaction {
    type: string
    date: string,
    amount: number
}

const mockTransactions: Array<Transaction> = [
    {
        type: "Withdrawal",
        date: "20.2.2030",
        amount: 4.00
    },
    {
        type: "Withdrawal",
        date: "20.2.2030",
        amount: 4.00
    },
    {
        type: "Transfer",
        date: "20.2.2030",
        amount: 4.00
    }
]

export default function Transactions() {
    const [transactions, setTransactions] = useState<Array<Transaction> | null>(null);
    const [currPageTransactions, setCurrPageTransactions] = useState<Array<Transaction> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [loaded, setLoaded] = useState(false);
    const pageLimit = 15;
    const endChunk = useRef(15);
    const skip = useRef(0);

    useEffect(() => {
        setTransactions(mockTransactions);
        setLoading(false);
        setLoaded(true);
        if (!transactions) {
            // getReferedUsers();
        }
    }, [transactions])
    
    return (
        <div className={styles.container}>
            <IntroTemplate 
            dontShowViewMoreButton
            heading="Transactions"
            href='/home/funds'
            resultsReturned={transactions ? transactions.length > 0 : undefined}
            icon={
                <IconContext.Provider value={{className: styles.icon}}>
                    <FiActivity/>
                </IconContext.Provider>
            }
            >
                <LoadingErrorAndEmptyStateComp
                loading={loading}
                error={error}
                loaded={loaded}
                array={transactions}
                emptyStateHeading='Transactionss'
                emptyStateBody='You have not made any transactions at the moment.'
                errorStateHeading='Error!!!'
                errorStateBody='An error occured while getting Transactions'
                >
                    <div className={styles.transactionsContainer}>
                        {transactions && transactions.map((Transaction, i) =>
                            <TransactionComp key={i} {...Transaction}/>
                        )}          
                    </div>
                </LoadingErrorAndEmptyStateComp>
            </IntroTemplate>
        </div>
    )
}

interface TransactionProps {
    type: string
    date: string,
    amount: number
}
export function TransactionComp ({
    type,
    date,
    amount
}: TransactionProps) {
    return (
        <div className={styles.transactionContainer}>
            <div className={styles.kebabWrapper}>
                <div className={styles.transactionType}>
                    {type}
                </div>
                <div className={styles.kebab}>
                    <IconContext.Provider value={{className: styles.icon}}>
                        <GoKebabHorizontal/>
                    </IconContext.Provider>
                </div>
            </div>

            <div className={styles.transactionDetailsWrapper}>
                <div className={styles.transactionDetail}>
                    <span>
                        <IconContext.Provider value={{className: styles.transactionDetailIcon}}>
                            <RiCalendarFill/>
                        </IconContext.Provider>
                    </span>
                    {date}
                </div>
                <div className={styles.transactionDetail}>
                    <span>
                        <IconContext.Provider value={{className: styles.transactionDetailIcon}}>
                            <RiCoinsFill/>
                        </IconContext.Provider>
                    </span>
                    <span className={styles.transactAmount}>£{amount.toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}