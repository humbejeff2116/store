import { User } from "@/context/auth/context";
import { backendAPI } from "./http.config";

interface LoginDetails {
    email: string,
    password: string
}

interface SignupDetails {
    fullName: string
    email: string
    password: string
}

class UserHTTPService {
    async signUp(details: SignupDetails) { 
        try {
            const response = await backendAPI.postForm(`/user/signup`,  details);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async signIn(userDetails: LoginDetails) {
        const response =  await backendAPI.post(`/user/signin`, userDetails);
        return response.data;
    }
    async getAll() {
        try {
            const response = await backendAPI.get(`/users`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async getByEmail(userEmail: string) {
        try {
            const response = await backendAPI.get(`/user/${userEmail}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async getById(userId: string) {
        try {
            const response = await backendAPI.get(`/user/${userId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async updateImage(userId: string, profileImageData: FormData) {
        try {
            const response = await backendAPI.postForm(`/user/update/image/${userId}`,  profileImageData, {headers: {"Content-Type": "multipart/form-data"}});
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async updateActiveNotificationStatus(userId: string, hasActiveNotification: boolean) {
        try {
            const response = await backendAPI.put(`/user/update/active-notification/${userId}`, hasActiveNotification);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async getPurchaseHistory(userId: string) {
        try {
            const response = await backendAPI.get(`/user/purchase-history/${userId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    // TODO... implement route at backend
    async getActivity(userId: string) {
        try {
            const response = await backendAPI.get(`/user/activity/${userId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
}

const userHTTPService = new UserHTTPService();
export default userHTTPService;