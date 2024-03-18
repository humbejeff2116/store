import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Timer } from '@/components/types';
import { SessionStorage } from '@/lib';



export const  useWindowsWidth = () => {
    const [screenWidth, setScreenWidth] = useState(0);
    const checkScreenSize = () => setScreenWidth(window.innerWidth);

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize)
    }, []);

    return screenWidth;
}


export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    const windowsWidth = useWindowsWidth();

    useEffect(() => {
        if (windowsWidth <= 500) {
            setIsMobile(true);
        }
        return () => {
            setIsMobile(false);
        }
    }, [windowsWidth]);

    return isMobile;
}



export function usePageScrollTo() {
    const [cords, setCords] = useState({x: 0, y: 0});
    const router = useRouter();
    const scrollCordsKey = `${router.pathname}-pageScroll`;

    const setScrollPoints = () => {
        const scrollCords = {
           x: window.scrollX || document.documentElement.scrollLeft, 
           y: window.scrollY || document.documentElement.scrollTop
        }
        setCords(scrollCords);
    }

    useEffect(() => {
        window.addEventListener("scroll", setScrollPoints);
        return () => { 
            window.removeEventListener("scroll", setScrollPoints);
            SessionStorage.set(scrollCordsKey, cords);
        }
    }, [router.pathname, cords]);

    useEffect(() => {
        const pageScrollCords = SessionStorage.getParse(scrollCordsKey);
        let timer: Timer = null;
        
        if (!pageScrollCords) {
            return;
        }
        const { x, y } = pageScrollCords;

        if (!x && !y) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });     
        } else {
            timer = setTimeout(() => {
                window.scrollTo({
                    top: y,
                    behavior: "smooth",
                }); 
            }, 1000)
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [router.pathname]);
}


export function useDataFetch<TFetch>(req: TFetch) {
    const [data, setData] = useState<any | null>(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData(req);
    }, [req]);

    const fetchData = async (req: any) => {
        setLoading(true);
        try {
            const { error, message, data } = await req;
            if (error) {
                setError(error);
            }
            setMessage(message);
            setData(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError(true);
            setMessage("An Error has occured");
        }
    }

    return {loading, data, message, error};
}