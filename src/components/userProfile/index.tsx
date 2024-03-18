'use client'
import { useState } from 'react';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import useAuth from '@/context/auth/context';
import avatar from '@/images/avatar/avatar2.png';
import styles from './index.module.css';


export default function UserProfile() {
    const [openModal, setOpenModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false);
    const { user } = useAuth();
    
    const openEditComponent = (detailName: string, detail: string) => {
        alert(`${detailName}: ${detail}`);
    }


    const editValue = (key: string, value: string) => {

    }


    // TODO... implement empty user component
    // if (!user) {
    //     return (
    //         <div>
    //             no user component
    //         </div>
    //     )
    // }
    return (
        <div className={styles.container}>
            {openModal && (
                <div>
                    modal
                    {/* TODO... implement modal for editing here */}
                </div>
            )}
            <div className={styles.childWrapper}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatarWrapper}>
                        <Image 
                        src={user?.profileImage || avatar} 
                        alt={`${user?.fullName}'s picture`}
                        />
                    </div>
                </div>

                <div className={styles.userDetailsContainer}>
                    <UserDetail
                    detailName="fullName"
                    showEdit={openEditComponent} 
                    detailIcon={
                        <FaUser/>
                    }
                    detail={user?.fullName ?? 'John Doe'} 
                    />

                    <UserDetail
                    detailName="email"
                    showEdit={openEditComponent} 
                    detail={user?.email || 'josh@gmail.com'} 
                    detailIcon={
                        <MdEmail/>
                    }
                    />
                </div>
            </div>
        </div>
    )
}

interface UserDetailProps {
    detailName: string
    detailIcon: JSX.Element
    detail: string
    icon?: JSX.Element
    showEdit: (detailName: string, detail: string) => void
}

function UserDetail({
    detailName,
    detail,
    detailIcon,
    icon,
    showEdit
}: UserDetailProps) {
    return (
        <div className={styles.userDetailsChild}>
            <div className={styles.userDetail}>
                <span>
                    <IconContext.Provider value={{className: styles.detailIcon}}>
                        {detailIcon }
                    </IconContext.Provider>
                </span>
                {detail}
            </div>
            <div className={styles.userDetailButtonWrapper}>
                <button onClick={() => showEdit(detailName, detail)}>
                    <IconContext.Provider value={{className: styles.detailButtonIcon}}>
                        {icon ?? <RiEdit2Fill/>}
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    )
}