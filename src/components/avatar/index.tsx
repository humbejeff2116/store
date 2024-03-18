import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import defaultAvatar from '@/images/avatar/avatar4.png';
import noAvatarImage from '@/images/avatar/avatar4.png';
import styles from './avatar.module.css';


interface UserAvatarProps {
    loading?: boolean
    fullName?: string,
    email?: string,
    profileImage?: StaticImageData | string
}

export default function UserAvatar({
    loading,
    fullName, 
    email, 
    profileImage
}: UserAvatarProps) {
    return (
        
        <div className={styles.container}>
        {loading ? (
            // TODO... return skeleton screen
            <div>
                Loading...
            </div>
        ) : (
            <>
            <div className={styles.imageWrapper}>
                <Image src={profileImage || noAvatarImage} alt={`${fullName}'s avatar`}/>
            </div>

            <div className={styles.avatarDetailsWrapper}>
                <div className={styles.avatarUserName}>
                   {fullName || "John Doe"}
                </div>
                <div className={styles.avatarUserEmail}>
                   {email || "user@gamil.com"}
                </div>
            </div>
            </>      
        )}
        </div>
    )
}

interface ReviewAvatarProps {
    fullName?: string
    profileImage?: StaticImageData | string
}

export function ReviewAvatar({
    fullName, 
    profileImage
}: ReviewAvatarProps) {
    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <Image src={profileImage || defaultAvatar} alt={`${fullName}'s avatar`}/>
            </div>

            <div className={styles.avatarDetailsWrapper}>
                <div className={styles.avatarUserName}>
                {fullName || "John Doe"}
                </div>
            </div>
        </div>
    )
}


interface AvatarProps {
    image?: StaticImageData
    alt?: string
}

function Avatar({
    image,
    alt
}: AvatarProps) {
    return (
        <div className={styles.avatarContainer}>
            <Link href = "/home/profile">
                <div className={styles.avatarWrapper}>
                <Image src={image || defaultAvatar} alt={alt || ""}/>
                </div>
            </Link>
        </div>
    )
}