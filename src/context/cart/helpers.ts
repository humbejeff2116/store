
import { Cart } from "./context"


export function productIsInCart(productId: string, cart: Cart) {
    return cart.findIndex(cartItem => cartItem.productId === productId) > -1 ? true : false
}

export function incrementProductQuantity(
    cart: Cart, 
    productId: string, 
    quantity: number
) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === productId) {
            cart[i].quantity += quantity;
            break;
        }
    }
    return cart;
}

export function decrementProductQuantity(
    cart: Cart, 
    productId: string, 
    quantity: number
) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === productId && cart[i].quantity > quantity) {
            if(cart[i].quantity === 1) {
                break;
            }
            cart[i].quantity -= quantity;
            break;
        }
    }
    return cart;
}

export function  calculateCartTotalPrice(state: Cart) {
    let totalCartSum = 0.00;

    for (let i = 0; i < state.length; i++) {
        if (state[i].discount) {
            const percentOffPrice = (state[i].discount / 100) * state[i].price;
            const newPrice = state[i].price - percentOffPrice;
            totalCartSum += newPrice * state[i].quantity;
        } else {
            totalCartSum += state[i].price * state[i].quantity;
        }
    }
    return Number(totalCartSum.toFixed(2));
}

export function getCartTotalItems(state: Cart) {
    return state.length;
}
