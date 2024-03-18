import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavLink } from '@/data/interfaces';
import headerLinksService from '@/data/header/appLinks';
import useCartContext from '@/context/cart/context';
import useAuth from '@/context/auth/context';
import SearchBar from '../searchBar';
import styles from './index.module.css';

const links = headerLinksService.links();


interface RightHeaderProps {
    searchBarIsActive: boolean
    toggleSearchBar: () => void
}
export default function RightHeader({
    searchBarIsActive,
    toggleSearchBar
}: RightHeaderProps) {
    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
            {links.map((link, i) => (
                link.name.toLowerCase() === "search" ? (
                    <SearchLink
                    key={i} 
                    {...link}
                    hanldeClick={toggleSearchBar}
                    isActive={searchBarIsActive} 
                    />
                ) : (
                    <HeaderLink 
                    key={i} 
                    {...link}
                    />
                )
            ))}  
            </div>
            {/* <SearchBar show={showSearchUI}/> */}
        </div>
    )
}

interface HeaderLinkProps extends NavLink {}

function HeaderLink({
    name,
    href,
    icon,
}: HeaderLinkProps) {
    const pathName = usePathname();
    const linkClassName = `${styles.navLink} ${pathName === href && styles.activeLink}`; 

    return (
        <>
        {name.toLocaleLowerCase() === "notification" ? (
            <NotificationLink className={linkClassName} {...{ name, href, icon}}/>
        ) : name.toLocaleLowerCase() === "cart" ? (
            <CartLink className={linkClassName} {...{ name, href, icon}}/>
        ) : (
            <div className={styles.linkWrapper}>
                <Link 
                href={href}
                title={name}
                className={linkClassName}
                >
                    {icon}
                </Link>
            </div>
        )}
        </>
    )
}

interface NotificationLinkProps extends NavLink {
    className: string
} 

function NotificationLink({
    href,
    name,
    icon,
    className
}: NotificationLinkProps) {
    const {} = useAuth();
    
    return (
        <div className={styles.linkWrapper}>
            <Link 
            href={href}
            title={name}
            className={className}
            >
            {/* {cartHasNotification && ( */}
                <NotificationIcon/>
            {/* )} */}
                {icon}
            </Link>
        </div>
    )
}

function CartLink({
    href,
    name,
    icon,
    className
}: NotificationLinkProps) {
    const { cartHasNotification } = useCartContext();

    return (
        <div className={styles.linkWrapper}>
            <Link 
            href={href}
            title={name}
            className={className}
            >
            {cartHasNotification && (
                <NotificationIcon/>
            )}
            {icon}
            </Link>
        </div>
    )
}

interface SearchLinkProps {
    hanldeClick?: () => void
    name: string
    icon: React.ReactNode
    isActive: boolean
}

function SearchLink({
    hanldeClick,
    name,
    icon,
    isActive
}: SearchLinkProps) {
    const buttonClass = `${styles.navLink} ${isActive && styles.searchButtonActive}`;

    return (
        <div className={styles.linkWrapper}>
            <button 
            onClick={hanldeClick}
            title={name}
            className={buttonClass}
            >
                {icon}
            </button>
        </div>
    )
}

function NotificationIcon() {
    return (
        <div className={styles.notificationIcon}>

        </div>
    )
}