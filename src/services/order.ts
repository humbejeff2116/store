import { backendAPI } from "./http.config";


interface OrderDetails {

}

class OrderHTTPService {
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
    async getUserOrders(userId: string) {
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
    // async update<Type>(
    //     orderId: string, 
    //     userId: string, 
    //     key: string, 
    //     newValue: Type
    // ) {
    //     const updateData = {
    //         key: key,
    //         value: newValue
    //     }
    //     try {
    //         const response = await backendAPI.put(`/order/update/${orderId}/${userId}`, updateData);
    //         return response.data;
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    async remove(orderId: string, userId: string) {
        try {
            const response = await backendAPI.delete(`/user/order/remove/${orderId}/${userId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
}

const orderHTTPService = new OrderHTTPService();
export default orderHTTPService;