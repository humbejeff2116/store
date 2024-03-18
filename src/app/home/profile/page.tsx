import _Profile from "@/components/_profile";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'profile Page',
    description: 'This is the profile page',
}


export default function ProfilePage() {
    return (
        <div>
            <_Profile/>
        </div>
    )
}