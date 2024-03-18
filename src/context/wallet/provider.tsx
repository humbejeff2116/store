import React, { useEffect, useState } from 'react';
import { Context, Wallet } from './context';

interface ContextProviderProps {
    children: React.ReactNode
}

export function WalletContextProvider({children}: ContextProviderProps) {
    const [wallet, setWallet] = useState<Wallet | null>(null);
 
    function getUserWallet(userId: string) {
        // TODO... get user wallet from backend API
    }

    function getWallet(walletId: string) {
        // TODO... get wallet from backend API
    }

    const values = {
        wallet: wallet,
        getUserWallet: getUserWallet,
        getWallet: getWallet,
    }

    return (
        <Context.Provider value = { values }>
            { children }
        </Context.Provider>
    )  
}