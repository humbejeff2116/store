import React from 'react';
import useNavContext from '@/context/navigation/context';
import Logo from './logo';
import TopLeftSideBar from './top';
import MiddleLeftSideBar from './middle';
import BottomLeftSideBar from './bottom';
import styles from './index.module.css';


interface LeftSideBar {
    fixed?: boolean
    sidebarClassName?: string
    logo?: React.ReactNode
    top?: React.ReactNode
    middle?: React.ReactNode 
    bottom?: React.ReactNode
}

export default function LeftSideBar({
    fixed,
    sidebarClassName,
    logo,
    top,
    middle,
    bottom,
}: LeftSideBar) {
    return (
        <LeftSideBarTemplate 
        sidebarClassName={sidebarClassName}
        fixed ={fixed}
        logo={logo ?? <Logo/>}
        top={top ?? <TopLeftSideBar/>}
        middle={middle ?? <MiddleLeftSideBar/>}  
        bottom={bottom ?? <BottomLeftSideBar/>} 
        />
    )
}

function LeftSideBarTemplate({
    fixed,
    sidebarClassName,
    logo,
    top,
    middle,
    bottom,
}: LeftSideBar) {
    const { showLeftSideBar } = useNavContext();
    let leftSidebarClassName;

    if (sidebarClassName) {
        leftSidebarClassName = `${sidebarClassName} ${showLeftSideBar && styles.show} ${styles.fixed}`;
    } else {
        leftSidebarClassName = `${styles.container} ${showLeftSideBar && styles.show} ${styles.fixed}`;
    } 
  
    return (
        <section className = { leftSidebarClassName }>
            <section className={styles.logo}>{logo}</section>
            <div className={styles.navWrapper}>
                <section className={styles.top}>{top}</section>
                <section className={styles.middle}>{middle}</section>
                <section className={styles.bottom}>{bottom}</section>
            </div>
        </section>
    )
}