import useProductsNavContext from '@/context/productsNav/context';
import { SubLinkData } from '@/data/header/products';
import { Spinner, SpinnerSmall } from '@/components/loader/spinner';
import styles from './index.module.css';
import { ButtonEvent, DivEvent } from '@/components/types/events';
import { IconContext } from "react-icons";
import { useEffect, useMemo } from 'react';
import { Timer } from '@/components/types';


interface DropDownProps {
    // loading: boolean
    activeSubLink: string
    show: boolean
    links: SubLinkData | null | undefined 
    closeDropdown: () => void
    subCategory: string
}

export default function DropDown({
    // loading,
    activeSubLink,
    show,
    links,
    subCategory,
    closeDropdown
}: DropDownProps) {
    const linksWrapperClass = `${styles.linksWrapper} ${show && styles.showDropDown}`;
    const { activeMainLink } = useProductsNavContext();
    const chunkedLinks = useMemo(() => chunkLinks(links?.data), [links?.data]);

    function chunkLinks(links?: Array<any>) {
        if (!links) {
            return;
        }
        const chunkedLinks = [];
        let start = 0;
        let end = 4;
        let sliceLength = 4;
        let len = links.length;
        let chunkInto = Math.ceil(len / end);

        if (links.length < 4) {
            return links; 
        }

        for (let i = 0; i < chunkInto; i++) {
            chunkedLinks.push(links.slice(start, end));
            start = start + sliceLength;
            end = end + sliceLength; 
        }
        return chunkedLinks;
    }

    return (
        <div onMouseLeave={closeDropdown} className={linksWrapperClass}>
            <div className={styles.top}>
                <span>
                <IconContext.Provider value={{className: styles.icon}}>
                    {links?.icon}
                </IconContext.Provider>
                </span>
                <span>
                    {activeMainLink?.name}
                </span>
                <span>
                    {activeSubLink}
                </span>
            </div>
            {!links ? (
                <Spinner/>
            ) : (
                <div className={styles.links}>
                {links?.data.length <= 4 ? (
                    <Links 
                    links={links?.data} 
                    subCategory={subCategory} 
                    closeDropdown={closeDropdown}
                    />
                ) : (
                    chunkedLinks?.map((links, i) => (
                        <Links 
                        key={i} 
                        links={links} 
                        closeDropdown={closeDropdown}
                        subCategory={subCategory}
                        />
                    ))
                )}
                </div>
            )}
        </div>
    )
}

interface LinksProps {
    links: Array<any>
    subCategory: string
    closeDropdown: () => void
}

function Links({
    links,
    subCategory,
    closeDropdown
}: LinksProps) {
    return (
        <div className={styles.linksSegment}>
        {links && links?.map((link, i) => (
            <Link 
            key={i} 
            closeDropdown={closeDropdown}
            subCategory={subCategory} 
            {...link}
            />
        ))}
        </div>
    )
}

interface LinkProps {
    icon?: React.ReactNode | React.ReactElement
    subCategory: string
    name: string
    closeDropdown: () => void
}

function Link({
    icon,
    subCategory,
    name,
    closeDropdown
}: LinkProps) {
    const { handleClickSubLink } = useProductsNavContext();
    let timer: Timer;

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [timer]);

    const handleClickLink = (e: ButtonEvent, subCategory: string, name: string) => {
        handleClickSubLink(e, subCategory, name);
        timer = setTimeout(() => closeDropdown(), 200);
    }

    return (
        <div className={styles.buttonWrapper}>
            <button 
            onClick={(e) => handleClickLink(e, subCategory, name)}
            >
            {icon && (
                <IconContext.Provider value={{className: styles.buttonIcon}}>
                {icon}
                </IconContext.Provider>
            )}
            {name}
            </button>
        </div>
    )
}