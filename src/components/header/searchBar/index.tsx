import styles from './index.module.css';



interface SearchBarProps {
    show: boolean
}
export default function SearchBar({
    show
}: SearchBarProps) {
    const containerClass = `${styles.container} ${show && styles.show}`
    
    return (
        <div className={containerClass}>

        </div>
    )
}