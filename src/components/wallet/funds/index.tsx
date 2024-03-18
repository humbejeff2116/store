import styles from './index.module.css';
import { BiWallet } from 'react-icons/bi';
import { SpinnerSmall } from '@/components/loader/spinner';
import { Header } from '../template';
import { IconContext } from 'react-icons';
import FundsBottomNav from './bottomNav';
import { transactions } from '..';
// import PageHeading from '@/components/pageHeading';
// import Image from 'next/image';


interface TotalProps {
    handleShowModal: (tabName: string) => void
    loading: boolean
    error: boolean
    message: string
    walletId: string
    amount: number | null
}

export default function Funds({
    loading,
    error,
    message,
    walletId,
    amount,
    handleShowModal
}: TotalProps) {

    return (
        <>
        <div className={styles.container}>
        <FundsChildWrapper>
            <div className={styles.heading}>
                <IconContext.Provider value={{className: styles.headingIcon}}>
                    <BiWallet/>
                </IconContext.Provider>
                Funds
            </div>
        </FundsChildWrapper>
        {loading ? (
            <SpinnerSmall/>
        ) : (
            <>
                <FundsChildWrapper>
                    <UserTotalFunds
                    walletId={walletId} 
                    amount={amount}
                    />
                </FundsChildWrapper>
                <FundsChildWrapper>
                    <div className={styles.buttonsWrapper}>
                        <Button 
                        icon={<BiWallet/>} 
                        handleClick={handleShowModal}
                        tabName={transactions.deposit}
                        buttonText='Deposit'                        
                        />
                        <Button 
                        icon={<BiWallet/>} 
                        handleClick={handleShowModal}
                        tabName={transactions.withdraw}
                        buttonText='Withdraw'                        
                        />
                        <Button 
                        icon={<BiWallet/>} 
                        handleClick={handleShowModal}
                        tabName={transactions.transfer}
                        buttonText='Transfer'                        
                        />
                    </div>
                </FundsChildWrapper>
            </>  
        )}
        </div>
        <FundsBottomNav/>
        </>
    )
}

function FundsChildWrapper({
   children 
}:{children: React.ReactNode}) {
    return (
        <div className={styles.childWrapper}>
        {children}
        </div>
    )
}

interface ButtonProps {
    icon: React.ReactElement
    handleClick: (tabName: string) => void
    tabName: string
    buttonText: string
}
function Button({
    icon,
    handleClick,
    tabName,
    buttonText
}: ButtonProps) {
    return (
        <div className={styles.buttonWrapper}>
            <button onClick={() => handleClick(tabName)}>
                <IconContext.Provider value={{className: styles.buttonIcon}}>
                    {icon}
                </IconContext.Provider>
                {buttonText}
            </button>
        </div>
    )
}

interface UserTotalFundsProps {
    wrapperModificationClass?: string
    childClass?: string
    walletId: string | null
    amount: number | null
}
export function UserTotalFunds({
    wrapperModificationClass,
    childClass,
    walletId,
    amount
}: UserTotalFundsProps) {
    return (
        <div>
            {/* <div className={styles.id}>
                id: {walletId}
            </div> */}
            <div className={`${styles.amountWrapper} ${wrapperModificationClass}`}>
                <span>NGN</span>
                <div className={`${styles.amount} ${childClass}`}>
                    {amount}
                </div>
                {/* <BackgroundImages/> */}
            </div>
        </div>
    )
}

function BackgroundImages() {
    return (
        <div>

        </div>
    )
}