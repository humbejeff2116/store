import Image from 'next/image';
import eror404Image from '@/images/error/error404.png';
import styles from './index.module.css';

interface NotFoundProps {
    usedForHomeRoutes?: boolean
}
export default function NotFound({ 
    usedForHomeRoutes 
}: NotFoundProps) {

   const wrapperClassName = usedForHomeRoutes ? `${styles.wrapper} ${styles.protectedRoutesWrapper}` : styles.wrapper;

    return (
        <div className={styles.container}>
            <div className= { wrapperClassName }>
                <div className={styles.details}>
                    <div className={styles.imageWrapper}>
                        <Image src={ eror404Image } alt=""/>
                    </div>
                    <h3 className={styles.heading}>
                        Oops! We could not find that page.
                    </h3>
                    <div className={styles.body}>
                        The link you entered or followed is either broken, removed or does not exist.
                    </div>
                </div>
            </div>         
        </div>
    )
}