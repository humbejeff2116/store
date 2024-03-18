


interface TransactionCookie {
    id: string
    userId: string
    expireAt: string
    passwordVerified: boolean
    emailVerified: boolean
    timeStamp: string
}

const fundsService = {
    async transfer(transactionCookie: TransactionCookie, userId: string, amount: number) {
        // TODO... talk to transfer endpoint here
    },

    async withdraw(transactionCookie: TransactionCookie, userId: string, amount: number) {
        // TODO... talk to withdraw endpoint here
    },
    async checkBalance(userId: string) {
        // TODO... talk to balance endpoint here
    },
    async validWithdrawAmount(withdrawAmount: number, totalFunds: number) {
        if (withdrawAmount < 0.00) {
            return false;
        }

        if (totalFunds < withdrawAmount) {
            return false;
        }
        return true;        
    }
}

export default fundsService;