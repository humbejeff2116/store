import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { RiAddFill, RiSubtractFill } from 'react-icons/ri';



interface DetailProps {
    title: string
    showDetails: boolean
    children: React.ReactNode
}

export default function DetailAccordion({
    title,
    showDetails,
    children, 
    ...props
}: DetailProps) {
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (showDetails) {
            setShowMore(true);
        }
    },[showDetails])

    const viewMoreDetails = () => {
        setShowMore(prevState => !prevState);
    }

    const showMoreIcon = showMore ? ( 
        <RiSubtractFill className = {styles.showMoreIcon}/>
    ) : (
        <RiAddFill className = {styles.showMoreIcon}/>
    )

    const itemClassName = `${styles.allProductDetailsBody} ${showMore ? styles.showMoreText : ""}`
    const itemHeaderClassName = `${styles.allProductDetailsheader} ${showMore ? styles.detailsOpen : ""}`

    return (
        <div className = {styles.allProductDetailsItem}>
            <div className = {itemHeaderClassName} onClick={viewMoreDetails}>
                <div className = {styles.allProductDetailsHeaderText}>
                    { title || "" }
                </div>
                <div className = {styles.allProductDetailsHeaderIconWrapper}>
                   {showMoreIcon}
                </div>
            </div>
            <div className={itemClassName}>
                {children}
            </div>
        </div>
    )
}