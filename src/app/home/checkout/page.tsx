import _Checkout from "@/components/_checkout";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: 'Checkout Page',
    description: 'This is the home page',
}


export default function CheckoutPage() {
    return (
        <div>
            <_Checkout/>
        </div>
    )
} 