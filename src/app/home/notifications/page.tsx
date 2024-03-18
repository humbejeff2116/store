import _Notifications from "@/components/_notifications";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: 'Notifications',
    description: 'This is the notifications page',
}


export default function NotificationsPage() {
    return (
        <div>
            <_Notifications/>
        </div>
    )
}
  