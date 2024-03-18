import Image, { StaticImageData } from 'next/image';
import defaultAvatar from '@/images/avatar/avatar4.png';
import avatar from '@/images/avatar/avatar2.png';
import styles from './index.module.css';



interface UserAvatarProps {
    imgSrc?: StaticImageData | string
    imgAlt?: string
    userName: string
}

export default function UserAvatar({
    imgSrc,
    imgAlt,
    userName
}: UserAvatarProps) {
    return (
        <div className={styles.container}>
            <div className={styles.child}>
                <div className={styles.top}>
                    <div className={styles.avatarWrapper}>
                        <Image src={imgSrc ?? defaultAvatar} alt={imgAlt ?? ""}/>
                    </div>
                </div>
                <div className={styles.userName}>
                    {userName ?? "John Doe"}
                </div>
            </div>
        </div>
    )
}