import { IconContext } from 'react-icons';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import styles from './index.module.css';


interface IntroTemplateProps {
    heading: string
    href: string
    resultsReturned?: boolean
    children: JSX.Element
    icon?: JSX.Element
    dontShowViewMoreButton?: boolean
}

export default function IntroTemplate({
    heading,
    icon,
    href,
    resultsReturned,
    dontShowViewMoreButton,
    children
}: IntroTemplateProps) {

    return (
        <div className={styles.container}>
            <Header icon={icon} heading={heading}/>
            {children}
            {dontShowViewMoreButton ? null : (
                resultsReturned && (
                    <div className={styles.buttonWrapper}>
                        <Link href={href}>
                            View More
                            <IconContext.Provider value={{className: styles.moreIcon}}>
                                <FiArrowRight/>
                            </IconContext.Provider>
                        </Link>
                    </div>
                
                )
            )}
        </div>
    )
}


interface HeadingProps {
    wrapperClass?: string
    headerClass?: string
    icon?: JSX.Element
    iconClassName?: string
    heading: string
}

export function Header({
    wrapperClass,
    headerClass,
    icon,
    iconClassName,
    heading
}: HeadingProps) {
    return (
        <div className={wrapperClass ?? styles.headerWrapper}>
            <div className={wrapperClass ?? styles.heading}>
                {icon && (
                    <span className={styles.headingIcon}>
                        <IconContext.Provider value={{className: iconClassName ?? styles.icon}}>
                        {icon}
                        </IconContext.Provider>
                    </span>
                )}
                {heading}
            </div>
        </div>
    )
}