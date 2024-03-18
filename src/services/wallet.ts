import { backendAPI } from "./http.config";


interface OrderDetails {

}

class WalletHTTPService {
    async create(userId: string, orderDetails: OrderDetails) {
        try {
            const response = await backendAPI.post(`/user/order/${userId}`, orderDetails);
            return response.data;
        } catch (err) {
            console.error(err);
        }

    }
    async getAll() {
        try {
            const response = await backendAPI.get(`/orders`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async get(orderId: string) {
        try {
            const response = await backendAPI.get(`/order/${orderId}`);
            return response.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async getUserWallet(userId: string) {
        try {
            const response = await backendAPI.get(`/user/orders/${userId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async getWithLimitAndSkip(limit: number, skip: number) {
        try {
            const response = await backendAPI.get(`/orders?limit=${limit}&skip=${skip}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async remove(orderId: string, userId: string) {
        try {
            const response = await backendAPI.delete(`/user/order/remove/${orderId}/${userId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
}

const walletHTTPService = new WalletHTTPService();
export default walletHTTPService;