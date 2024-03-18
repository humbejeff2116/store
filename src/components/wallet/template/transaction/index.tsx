import useAuth from "@/context/auth/context";
import walletHTTPService from "@/services/wallet";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import UserAvatar from "../../userAvatar";
import { SpinnerSmall } from "@/components/loader/spinner";
import { UserTotalFunds } from "../../funds";
import styles from './index.module.css';






interface WithdrawAndTransferTemplateProps {
    imgSrc?: StaticImageData | string
    imgAlt?: string
    userName: string
    userId: string
    walletId: string
    amount: number | null
    children: React.ReactNode
}

export default function TransactionTemplate({
    imgSrc,
    imgAlt,
    userName,
    userId,
    walletId,
    amount,
    children
}: WithdrawAndTransferTemplateProps) {

    return (
        <>
            <UserAvatar 
            imgSrc={imgSrc}
            imgAlt={imgAlt}
            userName={userName}
            />
            <UserTotalFunds
            wrapperModificationClass={styles.fundsWrapper}
            childClass={styles.funds}
            walletId={walletId} 
            amount={amount}
            />
           {children}
        </>
    )
}