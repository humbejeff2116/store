'use client'
import Link from "next/link";
import styles from './index.module.css';
import { IconContext } from "react-icons";
import { RiAdvertisementLine } from "react-icons/ri";




const data = {
    left: {
        heading: 'Lorem ispiem at peck',
        writeup: `Lorem ispium de vec tu lep rec rep ct 
        duc jus trep le pi cyt isump lorem gut de la ruk`,
        href: '#',
        linkText: 'link text',
        linkIcon: <RiAdvertisementLine/>
    },
    right: {
        writeup: `Lorem ispium de vec tu lep rec`   
    }
}


export default function ProductsIntro() {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <LeftComponent {...data.left}/>
            </div>
            <div className={styles.right}>
                <RightComponent{...data.right}/>
            </div>
        </div>
    )
}


interface LeftComponentProps {
    heading: string
    writeup: string
    href: string,
    linkText: string
    linkIcon:React.ReactElement
}
function LeftComponent({
    heading,
    writeup,
    href,
    linkText,
    linkIcon
}: LeftComponentProps) {
    return (
        <div className={styles.leftComponent}>
            <div className={styles.heading}>
                {heading}
            </div>
            <div className={styles.writeup}>
                {writeup}
            </div>
            <div className={styles.linkWrapper}>
                <Link
                href={href}
                // title={name}
                className={styles.link}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                    {linkIcon}
                    </IconContext.Provider>
                    {linkText}
                </Link>
            </div>
        </div>
    )
}


// TODO... return an illustration here
interface RightComponentProps {
    writeup: string 
}

function RightComponent({
    writeup
}: RightComponentProps) {
    return (
        <div className={styles.rightComponent}>
            <div className={styles.writeup}>
                {writeup}
            </div>
        </div>
    )
}