import _TrackOrder from "@/components/_trackOrder";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: 'Track order Page',
    description: 'This is the track order page',
}


export default function OrderPage() {
    return (
        <div>
            <_TrackOrder/>
        </div>
    )
}
  