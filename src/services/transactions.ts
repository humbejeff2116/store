import httpBase, { API_DOMAIN } from './http.config';
const backendAPI = httpBase(`${API_DOMAIN}/api/v1`);


interface AuthenticateEmailVerificationCode {
    transactionId: string
    userId: string
    code: string
}

const transactionService = {
    transactionCookie: null,
    user: null,
    async transferFunds() {

    },
    async withdrawFunds() {

    },
    /**
     * used to generate verification code, send to user email and store on the server
     * returns an object from server holding transaction id and user id 
     * 
     * @returns - { transactionId and userId }
     */
    async generateVerificationCode(userId: string) {
        const response =  await backendAPI.post(`/gen-email-verification-code`, {userId});
        return response.data;
    },
    async authenticateUserPassword({userId, password}: {userId: string, password: string}) {
        const response =  await backendAPI.post(`/auth-user`, {userId, password});
        return response.data;
    },
    async authenticateEmailVerificationCode({userId, transactionId, code}: AuthenticateEmailVerificationCode) {
        const response =  await backendAPI.post(`/auth-email-code`, {userId, transactionId, code});
        return response.data;
    }
} 

export default transactionService;