import _Wallet from "@/components/_wallet";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: 'wallet Page',
    description: 'This is the wallet page',
}


export default function WalletPage() {
    return (
        <div>
            <_Wallet/>
        </div>
    )
}
  