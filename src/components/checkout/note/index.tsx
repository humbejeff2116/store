import styles from './index.module.css';



const CheckoutIntroNoteData = {
    heading: "",
    body: ""
}

interface Data {
    heading: string
    body: string
}
interface CheckoutIntroNoteProps {
    data?: Data
}

export default function CheckoutIntroNote({
    data
}: CheckoutIntroNoteProps) {
    return (
        <div>
            {data?.heading || CheckoutIntroNoteData.heading && (
                <div>
                    {data?.heading || CheckoutIntroNoteData.heading}
                </div>
            )}
            <div>
                {data?.body || CheckoutIntroNoteData.body}
            </div>
        </div>
    )
}