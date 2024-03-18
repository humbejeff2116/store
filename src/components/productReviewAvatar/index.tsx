import userHTTPService from "@/services/user";
import { ReviewAvatar } from "../avatar";
import { useDataFetch } from "@/hooks";
import styles from './index.module.css';

interface ProductReviewAvatarProps {
    userId: string
}

export default function ProductReviewAvatar({
    userId
}: ProductReviewAvatarProps) {
    const { loading, error, message, data:user } = useDataFetch(userHTTPService.getById(userId));

    return (
        <>
        {loading || !user ? (
                // TODO... return avatar skeleton screen here
                // <>Loading...</>
                <ReviewAvatar fullName="John Doe"/>
            ) : error ? (
                <ReviewAvatar fullName="Error"/>
            ): (
                <ReviewAvatar 
                fullName={user.fullName || "John doe"} 
                profileImage={user.profileImage}
                />
            )}
        </>
    )
}