import {  SessionStorage as Session } from ".";

const redirectToKey = 'redirect-to';

const redirect = {
    set(pathName: string) {
        Session.set(redirectToKey, pathName);
    },
    get() {
        return Session.getParse(redirectToKey);
    },
    clear() {
        Session.remove(redirectToKey);
    }
}

export default redirect;