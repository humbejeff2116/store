import { useState } from 'react';
import styles from './index.module.css';
import DeliveryAddressForm from '../form';





export default function DeliverTo() {
    const [showForm, setShowForm] = useState(false);

    const toggleDeliverTo = () => {
        setShowForm(prevState => !prevState);
    }
    return (
        <div>
            {showForm ? (
                <DeliveryAddressForm/>   
            ) : (
                <DeliveryAdress/>
            )}
            <div className={styles.bottom}>
                <UpdateAddress
                buttonText={showForm ? "Go Back" : "Change Address"} 
                handleOnClick={toggleDeliverTo}
                />
            </div>

        </div>
    )
}


function DeliveryAdress() {
    return (
        <div className={styles.deliveryAdressWrapper}>
            <Detail>
                Full name
            </Detail>
            <Detail>
                Email
            </Detail>
            <Detail>
                Contact number
            </Detail>

            <Detail>
                Delivery Address
            </Detail>
        </div>
    )
}

interface DetailProps {
    children: React.ReactNode
}

function Detail({
    children
}: DetailProps) {
    return (
        <div className={styles.detailWrapper}>
            {children}
        </div>
    )
}


interface UpdateAddressProps {
    buttonText: string
    handleOnClick: () => void
}

// TODO... write functionality to bring up form when button is clicked
function UpdateAddress({
    buttonText,
    handleOnClick
}: UpdateAddressProps) {
    return (
        <div>
            <button onClick={handleOnClick}>
            {buttonText}
            </button>
        </div>
    )
}