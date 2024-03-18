// TODO... move code to library to avoid duplication
export const calculateSubTotal = (
    price: number,
    quantity: number,
    discount?: number,
) => {
    if (discount) {
        const percentOffPrice = (discount / 100) * price;
        const newPrice = price - percentOffPrice;

        return newPrice * quantity
    }
    return price * quantity
}