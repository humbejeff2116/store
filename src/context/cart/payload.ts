import { Product } from "../products/context";
import { AddQuantityAction, AddToCartAction, ReduceQuantityAction, RemoveFromCartAction } from "./helpers";

function addToCartActionPayload(product: Product, quantity: number): AddToCartAction {
    const { _id, name, price, discount, images, } = product;
    return ({
        productId: _id,
        name,
        images, 
        quantity, 
        price, 
        discount
    })
}

function removeFromCartActionPayload(productId: string): RemoveFromCartAction {
    return ({
        productId
    })
}

function addCartProductQuantityActionPayload(productId: string, quantity: number): AddQuantityAction {
    return ({
        productId, 
        quantity
    })
}

function reduceCartProductActionPayload(productId: string, quantity: number): ReduceQuantityAction {
    return ({
        productId, 
        quantity
    })
}

export {
    reduceCartProductActionPayload,
    addCartProductQuantityActionPayload,
    removeFromCartActionPayload,
    addToCartActionPayload
}