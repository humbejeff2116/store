import { Product, ProductLike } from "@/context/products/context";
import { backendAPI } from "./http.config";

class ProductHTTPService {
    async create(productDetails: Product) {
        try {
            const response = await backendAPI.post(`/product`,  productDetails, {headers: {"Content-Type": "multipart/form-data"}});
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async getAll() {
        try {
            const response = await backendAPI.get(`/products`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async getWithQuery(
        category: string,
        subCategory: string,
        gender: string
    ) {
        try {
            const response = await backendAPI.get(`/products?category=${category}&subCategory=${subCategory}&gender=${gender}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async getWithLimitAndSkip(limit: number, skip: number) {
        try {
            const response = await backendAPI.get(`/products?limit=${limit}&skip=${skip}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async get(productId: string) {
        try {
            const response = await backendAPI.get(`/product/${productId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    // TODO... implement at backend
    async getSimilar(query: string) {
        try {
            const response = await backendAPI.get(`/product/similar/${query}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async update<Type>(productId: string, key: string, newValue: Type) {
        const updateData = {
            key: key,
            value: newValue
        }
        try {
            if (key === "image") {
                const response = await backendAPI.post(`/product/update/${productId}`, updateData, {headers: {"Content-Type": "multipart/form-data"}});
                return response.data;
            }
            const response = await backendAPI.post(`/product/update/${productId}`, updateData);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async remove(productId: string) {
        try {
            const response = await backendAPI.delete(`/product/remove/${productId}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
    async like(productId: string, userLike: ProductLike) {
        try {
            const response = await backendAPI.post(`/user/product/like/${productId}`, userLike);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
}

const productHTTPService = new ProductHTTPService();
export default productHTTPService;