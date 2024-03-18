
export default function config(
    totalSum: number,
    fullName: string, 
    userEmail: string,
    transactionReference: string | number,
    contactNumber?: string, 
) {
    return ({
        public_key: process.env.REACT_APP_FLUTTER_WAVE_KEY,
        tx_ref: transactionReference,
        amount: totalSum,
        currency: "NGN",
        payment_options: "card, mobilemoney, ussd, account, banktransfer",
        customer: {
            email: userEmail,
            contactNumber: contactNumber || 'NA',
            name: fullName,
        },
        customizations: {
            title: "My store",
            description: "Payment for bought items",
            logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
        },
    })
}



