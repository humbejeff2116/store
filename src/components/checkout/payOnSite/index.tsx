
import styles from './index.module.css';



interface PayOnSiteProps {
    children: React.ReactNode  
}
export default function PayOnSite({
    children
}: PayOnSiteProps) {
    return (
        <PaymentChild>
            {children}
        </PaymentChild>
    )
}

interface PaymentChildProps {
    children: React.ReactNode 
}
export function PaymentChild({
    children
}: PaymentChildProps) {
    return (
        <div> 
            {children}
        </div>
    )
}  