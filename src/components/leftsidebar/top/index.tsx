import { NavLinksType } from '@/data/sidenavLinks';
import useAuth, { User } from '@/context/auth/context';
import Image from 'next/image';
import noAvatarImage from '@/images/avatar/avatar2.png';
import { SpinnerSmall } from '@/components/loader/spinner';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './index.module.css';
import appRoutes from '@/routes';

export default function TopLeftSideBar() {
    const { user, signingIn, userIsLoggedIn } = useAuth();

    return (
        <div className={styles.container}>
        {signingIn ? (
            <SpinnerSmall unsetMarginTop/>
        ) : (
            user && userIsLoggedIn ? (
                <UserSidenavAvatar {...user}/>
            ) : (
                <>
                <UserSidenavAvatar _id={''} profileImage={''} fullName={''} />
                <SigninButton/> 
                </>
            )
        )}
        </div>
    )
}

type UserSidenavAvatarProps = Pick<User, "_id" | "profileImage" | "fullName">
function UserSidenavAvatar({
    _id,
    profileImage,
    fullName
}:UserSidenavAvatarProps) {
    return (
        <div className={styles.avatarContainer}>
            <div className={styles.avatarImageWrapper}>
                <Image src={profileImage || noAvatarImage} alt={`${fullName}'s avatar`}/>
            </div>
            <div className={styles.avatarUserName}>
                {fullName || "John Doe"}
            </div>
        </div>
    )
}

function SigninButton() {
    const pathName = usePathname();
    const href = pathName === appRoutes.signIn ?  appRoutes.signUp : appRoutes.signIn;
    
    return (
        <Link className={styles.signinLink} href={href}>
            {pathName === appRoutes.signIn ? "Sign Up" : "Log In"}
        </Link> 
    )
}
