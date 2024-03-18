import { IconContext } from 'react-icons';
import styles from './index.module.css';
import { RiArrowDownFill, RiWallet3Line } from 'react-icons/ri';


interface PaymentOptionsProps {
    externalPaymentMethodComp: React.ReactNode 
    internalPaymentMethodComp: React.ReactNode
}

export default function PaymentOptionsWrapper({
    externalPaymentMethodComp,
    internalPaymentMethodComp
}: PaymentOptionsProps) {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                Make Payment Using
            </div>
            <DetailWrapper>
            {externalPaymentMethodComp}
            </DetailWrapper>
            <DetailWrapper>
                <div className={styles.orWrapper}>
                    <div className={styles.or}>
                        Or
                        {/* <IconContext.Provider value={{className: styles.orIcon}}>
                            <RiArrowDownFill/>
                        </IconContext.Provider> */}
                    </div>
                </div>
            </DetailWrapper>
            <DetailWrapper>
            {internalPaymentMethodComp}
            </DetailWrapper>
        </div>
    )
}

interface DetailWrapperProps {
    children: React.ReactNode  
}

function DetailWrapper({
    children
}: DetailWrapperProps) {
    return (
        <div className={styles.detailWrapper}>
            {children}
        </div>
    )
}

interface ExternalPaymentButtonWrapperProps {
    children: React.ReactNode
}

export function ExternalPaymentButtonWrapper({
    children
}: ExternalPaymentButtonWrapperProps) {
    return (
        <div className={styles.buttonWrapper}>
            <AcceptedPayments/> 
            {children}
        </div>
    )
}
const acceptedPayments = [
    {id: '1', name: "USSD", icon: <></>},
    {id: '2', name: "Visa", icon: <></>},
    {id: '3', name: "Verve", icon: <></>},
]

function AcceptedPayments() {
    return (
        <div className={styles.acceptedPaymentsWrapper}>
        {acceptedPayments.map(payment =>
            <div key={payment.id} className={styles.acceptedPayment}>
                {payment.name}
            </div> 
        )}
        </div>
    )
}

interface InternalPaymentButtonProps {
    handlePayment: () => void
}

export function InternalPaymentButton({
    handlePayment
}: InternalPaymentButtonProps) {
    return (
        <div className={styles.buttonWrapper}>
            <button onClick={handlePayment}>
                <IconContext.Provider value={{className: styles.buttonIcon}}>
                    <RiWallet3Line/>
                </IconContext.Provider>
                Wallet
            </button>
        </div>
    )
}