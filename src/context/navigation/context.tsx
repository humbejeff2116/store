import { createContext, useContext } from 'react';


interface InitialContext {
    showLeftSideBar: boolean,
    showOutsideLoginNav: boolean,
    toggleOutsideLoginNav: () => void,
    toggleLeftSideBar: () => void,
}

const initialContext: InitialContext = {
    showLeftSideBar: false,
    showOutsideLoginNav: false,
    toggleOutsideLoginNav: () => null,
    toggleLeftSideBar: () => null,
}


export const NavContext = createContext<InitialContext>(initialContext);

export default function useNavContext() {
    return useContext(NavContext);
}
