import { DeliveryStage, deliveryStages } from '@/context/order/context';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { BiIdCard } from 'react-icons/bi';
import { RiCheckFill } from 'react-icons/ri';


interface OrderDeliveryStageProps {
    orderId?: string
    timeStamp: string | number
    stages?: Array<DeliveryStage> 
}

export default function OrderDeliveryStage({
    timeStamp,
    orderId,
    stages
}: OrderDeliveryStageProps) {
    return (
        <div className={styles.container}>
        <div className={styles.orderId}>
            <IconContext.Provider value={{className: styles.orderIcon}}>
                <BiIdCard/>
            </IconContext.Provider>
            order id:<span>{orderId}</span>
        </div>
        {stages && stages.map((stage, i) => ( 
            stage.name === deliveryStages.placed  ? (
                <DeliveryStageComp key={i} {...stage} timeStamp={timeStamp}/>
            ) : (
                <DeliveryStageComp key={i} {...stage}/>
            ) 
        ))}
        </div>
    )
}

interface DeliveryStageProps {
    timeStamp?: string | number
    name: string
    isComplete: boolean
}

function DeliveryStageComp({
    name,
    timeStamp,
    isComplete
}: DeliveryStageProps) {
    const wrapperClass = `${styles.stage} ${isComplete && styles.stageComplete}`;

    return (
        <div className={wrapperClass}>
            <div className={styles.stageLeft}>
                <div>
                    {name}
                </div>
                <div>
                    {timeStamp}
                </div>
            </div>
            <div className={styles.stageRight}>
                <IconContext.Provider value={{className: styles.orderIcon}}>
                    <RiCheckFill/>
                </IconContext.Provider>
            </div>
        </div>
    )
}