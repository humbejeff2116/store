
import React, { useState } from 'react';
import { NavContext } from './context';


interface NavContextProvider {
    children: React.ReactElement
}

export function NavContextProvider({ children }: NavContextProvider) {
    const [showLeftSideBar, setShowLeftSideBar] = useState(false);
    const [showOutsideLoginNav, setShowOutsideLoginNav] = useState(false);

    const toggleLeftSideBar = () => {
        setShowLeftSideBar(prevState => !prevState);
    }

    const toggleOutsideLoginNav = () => {
        setShowOutsideLoginNav(prevState => !prevState);
    }

    const values = {
        showLeftSideBar: showLeftSideBar,
        showOutsideLoginNav: showOutsideLoginNav,
        toggleOutsideLoginNav: toggleOutsideLoginNav,
        toggleLeftSideBar: toggleLeftSideBar,
    }

    return (
        <NavContext.Provider value = { values }>
            { children }
        </NavContext.Provider>
    )  
}