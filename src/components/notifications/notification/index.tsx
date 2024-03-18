import { IconContext } from 'react-icons';
import styles from './index.module.css';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BsCalendarDate } from 'react-icons/bs';
import { FiTag } from 'react-icons/fi';



interface NotificationProps {
    type: string
    date: number | string
    title: string
    text: string    
}
export default function Notification({
    type,
    date,
    title,
    text,
}: NotificationProps) {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.topLeft}>
                    <div className={styles.type}>
                        <IconContext.Provider value={{className: styles.topIcon}}>
                            <FiTag/>
                        </IconContext.Provider>
                        {type}
                    </div>
                    <div className={styles.date}>
                        <IconContext.Provider value={{className: styles.topIcon}}>
                            <BsCalendarDate/>
                        </IconContext.Provider>
                        {date}
                    </div>
                </div>
                <div className={styles.topRight}>
                    <IconContext.Provider value={{className: styles.icon}}>
                        <RiDeleteBin2Line/>
                    </IconContext.Provider>
                </div>
            </div>
            <div className={styles.bottom}>
                {text}
            </div>
        </div>
    )
}