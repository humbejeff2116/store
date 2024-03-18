import { ActiveLink, Form, MainLinks, SubLink, SubLinkData, SubLinks } from '@/data/header/products';
import { ButtonEvent } from '@/components/types/events';
import { createContext, useContext } from 'react';

export interface ClickedLink {
    name: string
    value: string
}
interface InitialContext {
    mainLinks: MainLinks | null
    mainLinksFormData: Form | null
    subLinks: SubLinks | null
    activeMainLink: ActiveLink | null
    activeSubLink: ActiveLink | null
    clickedSubLink: ClickedLink | null
    setActiveMainLink: (activeMainLink: ActiveLink) => void
    getSubLinkData: (subLlink: string) => SubLinkData | null 
    handleClickSubLink: (e: ButtonEvent, subLink: string, link: string) => void
}

const initialContext: InitialContext = {
    mainLinks: null,
    mainLinksFormData: null,
    subLinks: null,
    activeMainLink: null,
    activeSubLink: null,
    clickedSubLink: null,
    setActiveMainLink: () => null,
    getSubLinkData: () => null,
    handleClickSubLink: () => null
}

export const Context = createContext<InitialContext>(initialContext);
export default function useProductsNavContext() {
    return useContext(Context);
}
