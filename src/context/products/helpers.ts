import { Products } from "./context";


export function sortByLowestPrice(products: Products, callback: (products: Products) => void) {
    if (!products) {
        return;
    }

    const sortProducts = products.sort((a, b) => a.price - b.price);
    return callback(sortProducts);
}

export function sortByHighestPrice(products: Products, callback: (products: Products) => void) {
    if (!products) {
        return;
    }

    const sortProducts = products.sort((a, b) => b.price - a.price);
    return callback(sortProducts);
}

export function sortByMostSold(products: Products, callback: (products: Products) => void) {
    if (!products) {
        return;
    }

    const sortProducts = products.sort((a, b) => b.numSold - a.numSold);
    return callback(sortProducts);
}

export function sortByLeastSold(products: Products, callback: (products: Products) => void) {
    if (!products) {
        return;
    }

    const sortProducts = products.sort((a, b) => a.numSold - b.numSold);
    return callback(sortProducts);
}

export function sortByMostLikes(products: Products, callback: (products: Products) => void) {
    if (!products) {
        return;
    }

    const sortProducts = products.sort((a, b) => b.likesCount - a.likesCount);
    return callback(sortProducts);
}