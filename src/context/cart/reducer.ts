import { Cart } from "./context";

const types = {
    addToCart: 'addToCart',
    removeFromCart: 'removeFromCart',
    reduceQuantity: 'reduceQuantity',
    addQuantity: 'addQuantity',
}

// export default function cartReducer<Action>(cart: Cart, action: any) {
//     switch (action.type) {
//         case types.addToCart:
//             return addToCart(cart, action)
//         case types.removeFromCart:
//             return removeFromCart(cart, action)
//         case types.reduceQuantity:
//             return reduceQuantity(cart, action)
//         case types.addQuantity:
//                 return addQuantity(cart, action)
//         default:
//             break;
//     }
// }