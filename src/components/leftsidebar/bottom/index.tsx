import useSideBarContext from '@/context/sideBar/context';
import { NavigationLink2 } from '../navLink';
import styles from './index.module.css';


export default function BottomLeftSideBar() {
    const { links } = useSideBarContext();

    return (
        <div className={styles.container}>
        {!links ? (
            <BottomLeftSideBarSkeleton/>
        ) : (
            links?.footer.map((link, i) =>
                <NavigationLink2 key={i} {...link}/>
            )
        )}
        </div>
    )
}


function BottomLeftSideBarSkeleton() {
    return (
        <div>
            
        </div>
    )
}
