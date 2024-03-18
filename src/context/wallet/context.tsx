import { createContext, useContext } from 'react';

export interface Wallet {
    id: string
    userId: string
    totalFunds: number
}

interface InitialContext {
    wallet: Wallet | null
    getUserWallet: (userId: string) => void
    getWallet: (walletId: string) => void
}

const initialContext: InitialContext = {
    wallet: null,
    getUserWallet: () => null,
    getWallet: () => null
}

export const Context = createContext<InitialContext>(initialContext);
export default function useWalletContext() {
    return useContext(Context);
}
