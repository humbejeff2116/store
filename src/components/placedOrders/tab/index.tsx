import { ButtonEvent } from '@/components/types/events';
import styles from './index.module.css';
import BackButton from '@/components/buttons/back';

interface Tabs {
    [key: string]: string
    pending: string
    delivered: string
    canceled: string
}

export const tabs: Tabs = {
    pending: "Pending",
    delivered: "Delivered",
    canceled: "Canceled"
}

interface PlacedOrdersTabProps {
    activeTab: string
    toggleTab: (e: ButtonEvent, tab: string) => void
}

export default function PlacedOrdersTab({
    activeTab,
    toggleTab
}: PlacedOrdersTabProps) {

    return (
        <div className={styles.container}>
            <BackButton buttonClassName={styles.backButton}/>
            {Object.keys(tabs).map((key, i) =>
                <TabItem 
                key={i} 
                name={tabs[key]}
                toggleTab={toggleTab}
                activeTab={activeTab}
                /> 
            )}
        </div>
    )
}

interface TabItemProps extends PlacedOrdersTabProps {
    name: string
}

function TabItem({
    name,
    activeTab,
    toggleTab
}: TabItemProps) {
    const buttonClass = `${styles.button} ${name === activeTab && styles.activeTab}`;
    
    return (
        <button 
        className={buttonClass} 
        onClick={(e) => toggleTab(e, name)}
        >
            {name}
        </button>
    )
}