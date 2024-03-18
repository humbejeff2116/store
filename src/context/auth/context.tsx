import { StaticImageData } from 'next/image';
import { createContext, useContext } from 'react';


interface Purchase {
    itemId:  string 
    timestamp: Date, 
}

export interface User {
    _id: string
    name: string
    fullName: string
    email: string
    userName: string
    password?: string
    contactNumber?: string
    profileImage: string | StaticImageData
    purchaseHistory: Array<Purchase>
    hasActiveNotification?: boolean
    deliveryAddress: string
}

export interface OutSidePopupMessage {
    type: string,
    show: boolean,
    message: string
}

export const defaultOutsidePopupMessage: OutSidePopupMessage = {
    type: '',
    message: '',
    show: false,
}


interface initialAuthContextType {
    user: User | null
    signingIn: boolean
    signingUp: boolean
    userIsLoggedIn: boolean
    token: string
    tokenExpiration: number
    viewUserProfileData: any
    outsidePopUpMessage: OutSidePopupMessage
    setSigningIn: (status: boolean) => void
    setSigningUp: (status: boolean) => void
    setOutsidePopUpMessage: (showMessage: boolean, popUpMessage?: OutSidePopupMessage) => void
    setUserData: (user: any) => void
    setUserIsLoggedIn: (isLoggedInd: boolean) => void
    setTokenData: (token: string, tokenExpiration: number) => void
    isAuthenticated: () => boolean
    setViewUserProfileData: (user: any) => void
    logOut: () => void
    wipeToken: () => void
}

const initialAuthContext: initialAuthContextType = {
    user: null,
    signingIn: false,
    signingUp: false,
    userIsLoggedIn: false,
    token: '',
    tokenExpiration: 0,
    viewUserProfileData: null,
    outsidePopUpMessage: {
        type: "",
        show: false,
        message: ""
    },
    setSigningIn: () => null,
    setSigningUp: () => null,
    setOutsidePopUpMessage: () => null,
    setUserData: () => null,
    setUserIsLoggedIn: () => null,
    setTokenData: () => null,
    isAuthenticated: () => false,
    setViewUserProfileData: () => null,
    logOut: () => null,
    wipeToken: () => null 
}



export const AuthContext = createContext<initialAuthContextType>(initialAuthContext);
export default function useAuth() {
    return useContext(AuthContext);
}
