import { useEffect, useState } from 'react';
import userHTTPService from '@/services/user';
import { Spinner } from '../loader/spinner';
import EmptyState from '../emptyState';
import failureImage from '@/images/error/error2.png';
import styles from './index.module.css';


interface Activity {
    _id?: string
    timestamp: string
    title: string
    message: string
}

interface ActivitiesProps {
    userId: string 
}
export default function Activities({
    userId
}: ActivitiesProps) {
    const [activities, setActivities] = useState<Array<Activity> | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserActivity(userId);
    }, [userId])

    const getUserActivity = async (userId: string) => {
        setLoading(true);
        try {
            const response = await userHTTPService.getActivity(userId);
            if (!response.error) {
                setActivities(response.data);
            } 
            setLoading(true);     
        } catch (err) {
            
        }
    }

    return (
        <div className={styles.container}>
        {loading || !activities ? (
            // TODO... return skeleton screen
            <Spinner/>
        ) : !loading && activities.length < 1 ? (
            <EmptyState
            emptyContainerClassName={styles.emptyContainer}
            imageSrc={failureImage}
            imageAlt="Illustration represnting user activity"
            heading="User Activity"
            writeUp="You are yet to have an activity at the moment."
            >
            </EmptyState>
        ): (
            activities.map((activity, i) =>
                <UserActivity key={i} {...activity}/> 
            )
        )}
        </div>
    )
}

interface UserActivityProps extends Activity {}

function UserActivity({
    _id,
    timestamp,
    title,
    message
}: UserActivityProps) {
    return (
        <div>

        </div>
    )
}