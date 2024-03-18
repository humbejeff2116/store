// import Footer from '../../footer';
import Footer from '@/components/footer/flat';
import styles from './index.module.css';


interface ChildrenProps {
    children: React.ReactNode
}

function ChildrenTemplateWithFooter({ 
    children
}: ChildrenProps) {
    return (
        <div className={styles.childrenWithFooterWrapper}>
            <ChildrenTemplate>
                { children }
            </ChildrenTemplate>
            <Footer/>
        </div>
    )
}

function ChildrenTemplate({ children }: ChildrenProps) {
    return (
        <div className={styles.childrenContainer}>
            { children }
        </div>
    )
}

export{ 
    ChildrenTemplateWithFooter, 
    ChildrenTemplate
};