import styles from './index.module.css';


export default function ScrollToTopButton() {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div className={styles.buttonWrapper}>
            <button onClick={handleScrollToTop}>
                {/* <IconContext.Provider value={{className: styles.icon}}>

                </IconContext.Provider> */}
            </button>
        </div>
    )
}