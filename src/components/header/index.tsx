import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import useHeaderContext from '@/context/productsNav/context';
import LeftHeader from './left';
import RightHeader from './right';
import styles from './index.module.css';
import { useState } from 'react';
import SearchBar from './searchBar';

export default function Header() {
    const [showSearchUI, setShowSearchUI] = useState(false);
    const { mainLinks, subLinks } = useHeaderContext();

    const toggleSearchBar = () => {
        setShowSearchUI(prevState => !prevState);
    }

    return (
        <>
        <header className={styles.container}>
            <section className={styles.left}>
                <LeftHeader/>
            </section>
            <section className={styles.right}>
                <RightHeader
                searchBarIsActive={showSearchUI}
                toggleSearchBar={toggleSearchBar}
                />
            </section>
            <SearchBar show={showSearchUI}/>
        </header>
        </>
    )
}

// function MobileNavIcon() {
//     const { showLeftSideBar, toggleLeftSideBar } = useNavContext();
//     return (
//         <div 
//         className={`${styles.mobileNavIcon} ${ showLeftSideBar ? styles.mobileNavIconOpen : ""}`}
//         onClick = { toggleLeftSideBar }
//         >
//            <IconContext.Provider value={{className: styles.navIcon}}>
//                 <BiMenu/>
//             </IconContext.Provider>
//         </div>
//     )
// }
