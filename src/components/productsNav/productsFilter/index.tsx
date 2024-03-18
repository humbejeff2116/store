import { useEffect, useMemo, useState } from 'react';
import styles from './index.module.css';
import useProductsContext from '@/context/products/context';
import { ButtonEvent, DivEvent } from '@/components/types/events';
import { sortProductsTypes, sortProductsTypesIcons } from '@/context/products/provider';
import { IconContext } from 'react-icons';
import { RiFilter2Line } from 'react-icons/ri';
import { Timer } from '@/components/types';




interface ProductsFilterProps {
    toggleMenu: () => void
}
export default function ProductsFilter({
    toggleMenu
}: ProductsFilterProps) {
    return (
        <div className={styles.container}>
            <FilterButton handleClick={toggleMenu}/>
        </div>
    )
}

interface FilterButtonProps {
    buttonClassName?: string
    handleClick: () => void
}

export function FilterButton({
    buttonClassName,
    handleClick
}: FilterButtonProps) {
    return (
        <button className={buttonClassName ?? styles.filterButton} onClick={handleClick}>
            <IconContext.Provider value={{className: styles.icon}}>
                <RiFilter2Line/>
            </IconContext.Provider>
        </button>
    )
}


interface FilterMenuProps {
    containerClass?: string
    show: boolean
    toggleFilterMenu: () => void
}

export function FilterMenu({
    containerClass,
    show,
    toggleFilterMenu
}: FilterMenuProps) {
    const { filter:productsFilter, sort } = useProductsContext();
    const filterMenu = useMemo(() => Object.keys(sortProductsTypes).map(key => ({
        icon: sortProductsTypesIcons[key],
        name: sortProductsTypes[key]
    })), []);

    let timer: Timer;

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [timer]);


    const handleFilter = (e: ButtonEvent, filter: string) => {
        e.stopPropagation();
        sort(filter);
        timer = setTimeout(() => toggleFilterMenu(), 500);
    }
    
    const containerClassName = `${styles.menuContainer} ${show && styles.showMenu}`;
    
    return (
        <div className={containerClass ?? containerClassName}>
        {filterMenu.map(({name, icon}, i) =>
            <button
            className={`${styles.filterItemButton} ${productsFilter === name && styles.filterItemButtonActive}`} 
            key={i} 
            onClick={(e) => handleFilter(e, name)}
            >
                {icon && (
                    <IconContext.Provider value={{className: styles.filterIcon}}>
                        {icon}
                    </IconContext.Provider>
                )}
                {name}
            </button> 
        )}
        </div>
    )
}