import React, { useEffect, useState } from 'react';
import { Context } from './context';
import linksService, { Links } from '@/data/sidenavLinks';

interface ContextProviderProps {
    children: React.ReactNode
}

export function SidebarContextProvider({children}: ContextProviderProps) {
    const [links, setLinks] = useState<Links | null>(null);


    // effect is meant to run on initial render alone;
    useEffect(() => {
        setPublicSideNavLinks();
    }, []);

    function setAllSideNavLinks() {
        const links = linksService.getAllLinks();
        setLinks(links);
    }

    function setPublicSideNavLinks() {
        const links = linksService.getPublicLinks();
        setLinks(links);
    }


    const values = {
        links: links,
        setPublicSideNavLinks: setPublicSideNavLinks,
        setAllSideNavLinks: setAllSideNavLinks,
    }

    return (
        <Context.Provider value = { values }>
            { children }
        </Context.Provider>
    )  
}