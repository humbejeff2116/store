import { backendAPI } from "./http.config";

interface ReviewUser {
    userId: string
}

interface Review {
    userId: string
    productId: string
    starRating: number
    review: string
    timestamp: string | Date
}

class ReviewHTTPService {
    async create(reviewDetails: Review) {
        try {
            const response = await backendAPI.post(`/user/review`, reviewDetails);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async getAll() {
        try {
            const response = await backendAPI.get(`/reviews`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async get(reviewId: string) {
        try {
            const response = await backendAPI.get(`/review/${reviewId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async getAllUser(userId: string) {
        try {
            const response = await backendAPI.get(`/user/reviews/${userId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async getUser(userId: string, productId: string) {
        try {
            const response = await backendAPI.get(`/user/review/${userId}/${productId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async getAllProduct(productId: string) {
        try {
            const response = await backendAPI.get(`/reviews/product/${productId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }

    }

    async update<Type>(userId: string, productId: string, key: string,value: Type) {
        const updateDetails = {
            key: key,
            value: value
        }
        try {
            const response = await backendAPI.put(`/review/product/${productId}/${userId}`, updateDetails);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async addHelpful(userId: string, productId: string, helpful: ReviewUser) {
        try {
            const response = await backendAPI.put(`/review/product/add/helpful/${productId}/${userId}`, helpful);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async removeHelpful(userId: string, productId: string, helpful: ReviewUser) {
        try {
            const response = await backendAPI.put(`/review/product/remove/helpful/${productId}/${userId}`, helpful);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async addNotHelpful(userId: string, productId: string, notHelpful: ReviewUser) {
        try {
            const response = await backendAPI.put(`/review/product/add/not-helpful/${productId}/${userId}`, notHelpful);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async removeNotHelpful(userId: string, productId: string, notHelpful: ReviewUser) {
        try {
            const response = await backendAPI.put(`/review/product/remove/not-helpful/${productId}/${userId}`, notHelpful);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async remove(reviewId: string) {
        try {
            const response = await backendAPI.post(`/review/remove/${reviewId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    } 
}

const reviewHTTPService = new ReviewHTTPService();
export default reviewHTTPService;