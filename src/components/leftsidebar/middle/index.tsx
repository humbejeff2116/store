import NavigationLink from '../navLink';
import styles from './index.module.css';
import useSideBarContext from '@/context/sideBar/context';


export default function MiddleLeftSideBar() {
    const { links } = useSideBarContext();

    return (
        <div className={styles.container}>
        {!links ? (
            <MiddleLeftSideBarSkeleton/>
        ) : (
            links?.main.map((link, i) =>
                <NavigationLink key={i} {...link}/>
            )
        )}
        </div>
    )
}


function MiddleLeftSideBarSkeleton() {
    return (
        <div>
           hghghghgh 
        </div>
    )
}