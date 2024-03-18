import React, { useEffect, useState } from 'react';
import { AuthContext, OutSidePopupMessage, defaultOutsidePopupMessage } from './context';
import { parseLocalStorage, saveToLocalStorage } from '@/lib';


const USER = 'user';
const TOKEN = 'x-access-token';
const TOKEN_EXPIRATION = 'x-access-token-expiration';
const defaultToken = '';
const defaultTokenExpiration = 0;

interface AuthContextProviderProps {
    children: React.ReactNode
}
export function AuthContextProvider({children}: AuthContextProviderProps) {
    const [user, setUser] = useState(null);
    const [signingIn, setSigningIn] = useState(false);
    const [signingUp, setSigningUp] = useState(false);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [outsidePopUpMessage, setOutsidePopUp] = useState(defaultOutsidePopupMessage);
    const [token, setToken] =  useState('');
    const [viewUserProfileData, setViewUserProfileData] = useState({});
    const [tokenExpiration, setTokenExpiration] = useState(0);
   
    useEffect(()=> {
        setStateOnload();
    }, []);

    const setStateOnload = () => {
        const user = parseLocalStorage(USER);
        setUser(user);
    }

    const setUserData = (user: any) => {
        saveToLocalStorage(USER, user);
        setUser(user);
    }

    const setTokenData = (token: string, tokenExpiration: number) => {
        saveToLocalStorage(TOKEN, token);
        saveToLocalStorage(TOKEN_EXPIRATION, tokenExpiration);
        setToken(token);
        setTokenExpiration(tokenExpiration);
    }

    const isAuthenticated = (): boolean => { 
        const token = parseLocalStorage(TOKEN);
        const tokenExpiration = parseLocalStorage(TOKEN_EXPIRATION);

        if (token && (tokenExpiration > Date.now())) {
            return true;
        }
        return false;
    }

    const wipeToken = () => {
        setUser(null);
        setUserIsLoggedIn(false);
        setToken(defaultToken);
        setTokenExpiration(defaultTokenExpiration);
    }

    const logOut = () => {
        setUser(null);
        setUserIsLoggedIn(false);
        setOutsidePopUp(defaultOutsidePopupMessage);
        setViewUserProfileData({});
        setToken(defaultToken);
        setTokenExpiration(defaultTokenExpiration);
        localStorage.removeItem('user');
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(TOKEN_EXPIRATION);
        sessionStorage.removeItem('currentLocation');
    }

    const setOutsidePopUpMessage = (showMessage: boolean, popUpMessage?: OutSidePopupMessage) => {
        if (popUpMessage) {
            const { type, show, message } = popUpMessage;

            if (outsidePopUpMessage.show) {
                return;
            }
            setOutsidePopUp({ type, show, message });
        }
        if (!showMessage) {
            setOutsidePopUp(prevState => ({ ...prevState, show: false }));
            return;
        }
    }
   
    const values = {
        user: user,
        signingIn: signingIn,
        signingUp: signingUp,
        userIsLoggedIn: userIsLoggedIn,
        token: token,
        tokenExpiration: tokenExpiration,
        viewUserProfileData: viewUserProfileData,
        outsidePopUpMessage: outsidePopUpMessage,
        setSigningIn: setSigningIn,
        setSigningUp: setSigningUp,
        setOutsidePopUpMessage: setOutsidePopUpMessage,
        setUserData: setUserData,
        setUserIsLoggedIn: setUserIsLoggedIn,
        setTokenData: setTokenData,
        isAuthenticated: isAuthenticated,
        setViewUserProfileData: setViewUserProfileData,
        logOut: logOut,
        wipeToken: wipeToken
    }

    return(
        <AuthContext.Provider value = { values }>
            { children }
        </AuthContext.Provider>
    )  
}