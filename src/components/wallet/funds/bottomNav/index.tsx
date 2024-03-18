import styles from './index.module.css';





export default function FundsBottomNav() {
    return (
        <div className={styles.container}>
            <NavWrapper>
                child
            </NavWrapper>
            <NavWrapper>
                child
            </NavWrapper>
        </div>
    )
}



function NavWrapper({
    children
}: {children: React.ReactNode}) {
    return (
        <div className={styles.childWrapper}>
            <div className={styles.child}>
               {children}
            </div>
        </div>
    )
}