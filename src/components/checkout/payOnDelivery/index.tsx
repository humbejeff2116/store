
import { PaymentChild } from '../payOnSite';
import styles from './index.module.css';





interface PayOnDeliveryProps {
    children: React.ReactNode  
}
export default function PayOnDelivery({
    children
}: PayOnDeliveryProps) {
    const user= {deliveryAddress: ""};
    
    return (
        <PaymentChild>
            {children}
        </PaymentChild>
    )
}