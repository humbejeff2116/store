import _Cart from "@/components/_cart";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: 'Cart',
    description: 'This is the cart',
}


export default function CartPage() {
    return (
        <div>
            <_Cart/>
        </div>
    )
}
  