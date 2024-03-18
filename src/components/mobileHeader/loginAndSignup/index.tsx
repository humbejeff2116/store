import { usePathname } from "next/navigation";
import Link from 'next/link';
import { IconContext } from "react-icons";
import { RiLoginBoxFill, RiLoginCircleFill, RiUserAddFill } from 'react-icons/ri';
import styles from './index.module.css';
import appRoutes from "@/routes";


const loginAndSignupLinks = [
    {
        name: 'Sign up',
        href: appRoutes.signUp,
        icon: <RiUserAddFill/>
    },
    {
        name: 'Sign In',
        href: appRoutes.signIn,
        icon: <RiLoginBoxFill/>
    }
]

interface LoginAndSignupLinksProps {
    closeLinks: () => void
}
export default function LoginAndSignupLinks({
    closeLinks
}: LoginAndSignupLinksProps) {
    return (
        <div className={styles.container}>
        {loginAndSignupLinks.map((link, i) => 
            <LoginAndSignupLink 
            key={i} 
            {...link}
            closeLinks={closeLinks}
            />
        )}
        </div>
    )
}

interface LoginAndSignupLinkProps {
    name: string
    href: string
    icon: React.ReactElement
    closeLinks: () => void
}
function LoginAndSignupLink({
    name,
    href,
    icon,
    closeLinks,
}: LoginAndSignupLinkProps) {
    const pathName = usePathname();

    const isActivePath = (pathname: string , href: string) => {
        return pathname === href
    }

    const navItemClassName = `${styles.linkWrapper} ${isActivePath(pathName, href) ? styles.linkWrapperActive : ''}`;
    const linkClassName = `${styles.link} ${href === appRoutes.signIn ? styles.loginLink : styles.signupLink} ${isActivePath(pathName, href) ? styles.linkActive : ''}`;
    
    return (
        <div className={navItemClassName}>
            <Link 
            onClick={closeLinks}
            href={href}
            className={linkClassName}
            >
            {href === appRoutes.signUp ? (
                <>
                <IconContext.Provider value={{className: styles.signupIcon}}>
                    {icon}
                </IconContext.Provider>
                {name}
                </>
            ) : (
                <>
                {name}
                <IconContext.Provider value={{className: styles.navIcon}}>
                    {icon}
                </IconContext.Provider>
                </>
            )}
            </Link>
        </div>
    )
}