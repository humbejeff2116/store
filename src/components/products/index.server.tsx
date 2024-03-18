import productHTTPService from '@/services/product';
import ProductsWrapper from '../productsWrapper';
import { products } from '@/testData/products';

const getProducts = async () => {
    // try {
        return products
        // const response = await productHTTPService.getAll();
        // return response.data;
    // } catch (err) {
    //     console.error(err);
    // }
}

export default async function Products() {
    const products = await getProducts();

    return (
        <ProductsWrapper products={products}/>
    )
}