import { backendAPI } from "./http.config";

export interface CollectionProduct {
    id: string 
}

export interface Collection {
    _id?: string
    userId: string
    products: Array<CollectionProduct>
} 

class CollectionHTTPService {
    async create(userId: string, collection: Collection) {
        try {
            const response = await backendAPI.post(`/user/collection/${userId}`,  collection);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async add(collectionId: string, userId: string, product: CollectionProduct) {
        try {
            const response = await backendAPI.post(`/user/collection/add/${userId}/${collectionId}`,  product);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async getAll() {
        try {
            const response = await backendAPI.get(`/collections`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async getWithLimitAndSkip(limit: number, skip: number) {
        try {
            const response = await backendAPI.get(`/collections?limit=${limit}&skip=${skip}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async get(collectionId: string) {
        try {
            const response = await backendAPI.get(`/collection/${collectionId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async getUser(userId: string) {
        try {
            const response = await backendAPI.get(`/user/collection/${userId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async remove(collectionId: string, userId: string) {
        try {
            const response = await backendAPI.delete(`/user/collection/remove/${collectionId}/${userId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    async removeProduct(userId: string, productId: string,  collectionId: string) {
        try {
            const response = await backendAPI.post(`/user/collection/product/remove/${collectionId}/${userId}`, productId);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
}

const collectionHTTPService = new CollectionHTTPService();
export default collectionHTTPService;