import _PlacedOrders from "@/components/_placedOrders";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: 'Order Page',
    description: 'This is the order page',
}


export default function OrderPage() {
    return (
        <div>
            <_PlacedOrders/>
        </div>
    )
}
  