'use client'
import { useMemo, useState } from 'react';
import useProductsNavContext from '@/context/productsNav/context';
import styles from './index.module.css';
import ProductsFilter, { FilterMenu } from './productsFilter';
import { DivEvent } from '../types/events';
import DropDown from './dropDown';
import { SpinnerSmall } from '../loader/spinner';
import ProductsLinks, { SubLink } from './productsLinks';


export default function ProductsNav() {
    const [activeSubLink, setActiveSubLink] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const { 
        mainLinksFormData, 
        subLinks, 
        getSubLinkData 
    } = useProductsNavContext();

    const openDropdown = (e: DivEvent, name: string) => {
        e.stopPropagation();
        if (showFilterMenu) { 
            setShowFilterMenu(false);
        }
        if (name === activeSubLink && showDropdown) {
            return;  
        }

        if (name === activeSubLink && !showDropdown) {
            setShowDropdown(true);
            return;  
        }
        setActiveSubLink(name);
        setShowDropdown(true);
    }

    const closeDropdown = () => {
        setShowDropdown(false);
    }

    const toggleFilterMenu = () => {
        if (showDropdown) { 
            closeDropdown();
        }
        setShowFilterMenu(prevState => !prevState);
    }

    const dropDownLinks = useMemo(() => {
        return getSubLinkData(activeSubLink);
    }, [getSubLinkData, activeSubLink]);
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <section className={styles.left}>
                {!mainLinksFormData ? (
                    <SpinnerSmall unsetMarginTop/>
                ) : (
                    <ProductsLinks 
                    mainLinksForm={mainLinksFormData} 
                    subLinkComp={
                        <>
                        {subLinks?.map((link, i) => 
                            <SubLink  
                            openDropdown={openDropdown} 
                            key={i} 
                            {...link}
                            />
                        )}
                        </>
                    }
                    />
                )}
                </section>
                <section className={styles.right}>
                    <ProductsFilter toggleMenu={toggleFilterMenu}/>
                </section>
            </div>
            <div className={styles.dropDownWrapper}>
                <DropDown
                activeSubLink={activeSubLink}
                closeDropdown={closeDropdown}
                show={showDropdown}
                links={dropDownLinks}
                subCategory={activeSubLink}
                /> 
                <FilterMenu 
                show={showFilterMenu} 
                toggleFilterMenu={toggleFilterMenu}
                />
            </div>
        </div>
    )
}