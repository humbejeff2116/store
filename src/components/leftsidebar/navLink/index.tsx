// import React from 'react';
import useNavContext from '@/context/navigation/context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './index.module.css';
import { IconContext } from 'react-icons';

interface NavigationLinkProps {
    name: string
    href: string
    icon?: React.ReactNode
}

export default function NavigationLink({ 
    href,
    icon,
    name, 
}: NavigationLinkProps) {
    const pathName = usePathname ();
    const { showLeftSideBar, toggleLeftSideBar } = useNavContext();

    const linkClassName = `${styles.navLink} ${pathName === href && styles.activeLink}`;  

    const closeLeftSideBar = () => {
        if (showLeftSideBar) return toggleLeftSideBar();
    }

    return (
        <div className={styles.navItem}>
            <Link
            onClick={()=> closeLeftSideBar()}
            href={href} 
            className={linkClassName} 
            >
                <div className={styles.iconWrapper}>
                    <IconContext.Provider value={{className: styles.icon}}>
                    {icon}
                    </IconContext.Provider>
                </div> 
                { name } 
            </Link>   
        </div>
    ) 
}

export function NavigationLink2({ 
    href,
    icon,
    name, 
}: NavigationLinkProps) {
    const pathName = usePathname ();
    const { showLeftSideBar, toggleLeftSideBar } = useNavContext();

    const linkClassName = `${styles.navLink2} ${pathName === href && styles.activeLink2}`;  

    const closeLeftSideBar = () => {
        if (showLeftSideBar) return toggleLeftSideBar();
    }

    return (
        <div className={styles.navItem2}>
            <Link
            onClick={()=> closeLeftSideBar()}
            href={href} 
            className={linkClassName} 
            >
                <div className={styles.iconWrapper}>
                    <IconContext.Provider value={{className: styles.icon}}>
                    {icon}
                    </IconContext.Provider>
                </div> 
                { name } 
            </Link>   
        </div>
    ) 
}