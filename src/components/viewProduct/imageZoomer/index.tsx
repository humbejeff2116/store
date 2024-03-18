import { ModalBox } from '@/components/modal/centerModals';
import styles from './index.module.css';


interface ImageZoomerProps {
    images?: Array<any>
    showChild: boolean
    handleCloseZoomer: () => void
}

export default function ImageZoomer({
    images,
    showChild,
    handleCloseZoomer
}: ImageZoomerProps) {
    return (
        <ModalBox 
        dontUseDefaultModalChildContainer
        handleModal={handleCloseZoomer}
        >
            <div 
            className={`${styles.container} ${showChild && styles.showChild}`} 
            onClick={(e) => e.stopPropagation()}
            >
            {/* TODO... implement image zoomer here */}
            </div>
        </ModalBox>
    )
}