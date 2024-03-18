import { RiBugFill} from 'react-icons/ri';
import styles from './insideFooter.module.css';
import { IconContext } from 'react-icons';
import Link from 'next/link';


const links = [
    {name: "Terms", href: "/#"},
    {name: "Privacy", href: "/#"},
    {name: "Help", href: "/#"},
    {name: "About", href: "/#"},
    {name: "Invest", href: "/#"},
    {name: "Bug", href: "/#", icon:<RiBugFill/>}
]


interface FooterProps {
    footerContainerClassName?: string 
    footerLinks?: Array<any> 
}
export default function Footer({ 
    footerContainerClassName, 
    footerLinks
}: FooterProps) {
    return (
        <footer className={styles.container}>
            <nav className={styles.navContainer}>
                <div className={ styles.copyright }>
                    <span>&copy;{ new Date().getFullYear() } Harns & Hun</span>
                </div>              
                {links.map((link, i) =>
                    <FooterLink  key={i} {...link} />
                )}    
            </nav>
            <div className={ styles.landingFooterItem }>
                <span className={ styles.flagIcon }>&#127475;&#127468;</span>
                <span className={ styles.flagCountry }>Nigeria</span>
            </div>  
        </footer>
    )
}


interface FooterLinkProps {
    href: string 
    name: string 
    icon?: JSX.Element 
}
function FooterLink({ 
    href, 
    name, 
    icon, 
}: FooterLinkProps) {
    return (
        <div className={ `${styles.landingFooterItem} ${styles.nav}` }>
            <Link href={ href }>
                <IconContext.Provider value={{className: styles.bugIcon }}>
                {icon || ""}
                </IconContext.Provider>
                {name}
            </Link>
        </div>  
    )
}