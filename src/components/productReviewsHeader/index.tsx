import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { RiFilter2Fill } from 'react-icons/ri';

interface ReviewsHeaderProps {
    // loading: boolean
    total?: string | number
}

export default function ProductReviewsHeader({
    // loading,
    total
}: ReviewsHeaderProps) {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(prevState => !prevState);
    }
    return (
        <div className={styles.container}>
            <div className={styles.reviewsHeaderWrapper}>
                <div className={styles.reviewsHeader}>
                    <div className={styles.reviewsHeaderLeft}>
                        {total} review&apos;s
                    </div>

                    <div className={styles.reviewsHeaderRight}>
                        <SortReviews toggleMenu={toggleMenu}/>
                    </div>
                </div>
                <div className={styles.sortMenuWrapper}>
                <SortMenu show={showMenu}/>
                </div>
            </div>
            <ReviewsStat/>
        </div>
    )
}


function ReviewsStat() {
    return (
        <div className={styles.reviewStat}>
            Review stat
        </div>
    )
}

interface SortReviewsProps {
    toggleMenu: () => void
}

function SortReviews({
    toggleMenu
}: SortReviewsProps) {
    return (
        <button onClick={toggleMenu}>
            <IconContext.Provider value={{className: styles.filterIcon}}>
                <RiFilter2Fill/>
            </IconContext.Provider>
        </button>
    )
}

interface SortMenuProps {
    show: boolean
}

function SortMenu({
    show
}: SortMenuProps) {
    const containerClass = `${styles.sortMenu} ${show && styles.showMenu}`;

    return (
        <div className={containerClass}>
            menu  
        </div>
    )
}