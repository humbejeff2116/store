import { useRouter } from 'next/router';
import styles from './index.module.css';





export default function AppCurrentPath() {
    const router = useRouter();
    const pathName = router.asPath;

    return (
        <div>
            
        </div>
    )
}