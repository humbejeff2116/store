import { useState } from 'react';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { GoKebabHorizontal } from 'react-icons/go';
import { ButtonEvent } from '@/components/types/events';
import { RiEye2Line, RiSave2Line, RiSave3Fill } from 'react-icons/ri';

const menuData = [
    {
        icon: <RiSave3Fill/>, 
        name: "save"
    },
    {
        icon: <RiEye2Line/>, 
        name: "view"
    }
]

export default function ProductMenu() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = (e: ButtonEvent) => {
        e.stopPropagation();
        setShowMenu(prevState => !prevState);
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.sellerName}>
                    seller name
                </div>
            </div>
            <div className={styles.right}>
                <button
                onClick={toggleMenu}
                className={styles.menuButton}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <GoKebabHorizontal/>
                    </IconContext.Provider>
                </button>
                <div className={styles.menuItemsWrapper}>
                    <MenuItems show={showMenu} items={menuData}/>
                </div>
            </div>
        </div>
    )
}

interface MenuItem {
    icon: React.ReactElement | JSX.Element
    name: string
}

interface MenuItemsProps {
    show: boolean
    items: Array<MenuItem>
}

function MenuItems({
    show,
    items
}: MenuItemsProps) {
    const containerClass = `${styles.menuItems} ${show && styles.showMenuItems}`;

    return (
        <div className={containerClass}>
            {items.map((item, i) => 
                <MenuItem key={i} {...item}/>
            )}
        </div>
    )
}

interface MenuItemProps extends MenuItem{}

function MenuItem({
    icon,
    name
}: MenuItemProps) {
    return (
        <div className={styles.menuItem}>
            <IconContext.Provider value={{className: styles.menuItemIcon}}>
                {icon}
            </IconContext.Provider>
            {name}
        </div>
    )
}