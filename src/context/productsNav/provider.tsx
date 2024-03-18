import React, { useEffect, useState } from 'react';
import { ClickedLink, Context } from './context';
import linksService, { ActiveLink, Form, MainLinks, SubLinks } from '@/data/header/products';
import { ButtonEvent } from '@/components/types/events';

interface ContextProviderProps {
    children: React.ReactNode
}

export function ProductsNavContextProvider({children}: ContextProviderProps) {
    const [mainLinks, setMainLinks] = useState<MainLinks | null>(null);
    const [mainLinksFormData, setMainLinksFormData] = useState<Form | null>(null);
    const [subLinks, setSubLinks] = useState<SubLinks | null>(null);
    const [activeMainLink, setActiveMainLink] = useState<ActiveLink | null>(null);
    const [activeSubLink, setActiveSubLink] = useState<ActiveLink | null>(null);
    const [clickedSubLink, setClickedSubLink] = useState<ClickedLink | null>(null);
    useEffect(() => {
        if (!mainLinks) {
            const mainLinks = linksService.getMainLinks();
            const activeMainLink = linksService.getDefaultActiveMainLink();
            const activeSubLink = linksService.getDefaultActiveSubLink();
            const subLinks = linksService.getSubLinks(activeMainLink.name);
            const mainLinksFormData = linksService.getMainLinksFormData(mainLinks);

            setMainLinks(mainLinks);
            setMainLinksFormData(mainLinksFormData);
            setSubLinks(subLinks);
            setActiveMainLink(activeMainLink);
            setActiveSubLink(activeSubLink);
        }
    }, [mainLinks]);


    // TODO... remove commented code
    // NOTE... serve the same function as setDefaultActiveSubLinkData function
    // useEffect(() => {
    //     if (activeMainLink) {
    //         const activeSubLink = linksService.getActiveSubLink(activeMainLink.name);
    //         const subLinks = linksService.getSubLinks(activeMainLink.name);

    //         setSubLinks(subLinks);
    //         setActiveSubLink(activeSubLink);
    //     }
    // }, [activeMainLink]);

    function setActiveLinks(activeMainLink: ActiveLink) {
        setActiveMainLink(activeMainLink);
        setDefaultActiveSubLinkData(activeMainLink); 
        setClickedSubLink(null); 
    }

    function setDefaultActiveSubLinkData(activeMainLink: ActiveLink) {
        const subLinks = linksService.getSubLinks(activeMainLink.name);

        setActiveSubLink(subLinks[0]);
        setSubLinks(subLinks);   
    }

    function handleClickSubLink(e: ButtonEvent, subLink: string, link: string) {
        setActiveSubLink(prevState => prevState?.name !== subLink && {name: subLink});
        setClickedSubLink(prevState => {
            return prevState?.name === subLink ? {...prevState, value: link} : {name: subLink, value: link}
        });
    }


    function getSubLinkData(subLink: string) {
        if (!activeMainLink) {
            return null;
        }
        const links = linksService.getSubLinkData(activeMainLink.name, subLink);
        return links;
    }

    const values = {
        mainLinks: mainLinks,
        mainLinksFormData: mainLinksFormData,
        subLinks: subLinks,
        activeMainLink: activeMainLink,
        activeSubLink: activeSubLink,
        clickedSubLink: clickedSubLink,
        setActiveMainLink: setActiveLinks,
        getSubLinkData: getSubLinkData,
        handleClickSubLink: handleClickSubLink
    }

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )  
}