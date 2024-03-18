import { Links } from '@/data/sidenavLinks';
import { createContext, useContext } from 'react';
// import { ActiveLink, publicLinks, allLinks } from '@/data/mainLinks';

interface InitialContext {
    links: Links | null
    setPublicSideNavLinks: () => void
    setAllSideNavLinks: () => void
}

const initialContext: InitialContext = {
    links: null,
    setAllSideNavLinks: () => null,
    setPublicSideNavLinks: () => null
}

export const Context = createContext<InitialContext>(initialContext);
export default function useSideBarContext() {
    return useContext(Context);
}
