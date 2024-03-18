
export const Org = {
    name: "Afro Store",
    name2: "AfroStore",
    siteUrl: "afrostore.com"
}

export function parseLocalStorage(key: string) {
    const item  = localStorage.getItem(key);

    if (typeof item  === 'string') {
       return JSON.parse(item);
    }
    return item; 
}

export function saveToLocalStorage<Type>(key: string, value: Type) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage<Type>(key: string) {
    const item  = localStorage.getItem(key);

    if (typeof item  === 'string') {
       return JSON.parse(item);
    }
    return item; 
}

function removeFromLocalStorage(key: string) {
    return localStorage.removeItem(key);
}

function saveToSessionStorage<Type>(key: string, val: Type) {
    sessionStorage.setItem(key, JSON.stringify(val));
}

function parseSessionStorage(key: string) {
    const item  = sessionStorage.getItem(key);

    if (typeof item  === 'string') {
       return JSON.parse(item);
    }
    return item; 
}

function removeSessionStorage(key: string) {
    return sessionStorage.removeItem(key);
}

export const SessionStorage = {
    set<Type>(key: string, value: Type) {
        saveToSessionStorage(key, value);
    },
    getParse(key: string) {
        return parseSessionStorage(key);
    },
    remove(key: string) {
        return removeSessionStorage(key);
    }
}

export const LocalStorage = {
    set<Type>(key: string, value: Type) {
        saveToLocalStorage(key, value);
    },
    getParse(key: string) {
        return parseLocalStorage(key);
    },
    remove(key: string) {
        return removeFromLocalStorage(key);
    }
}

interface Length {
    length: number
}

export function getLength<Type extends Length>(param: Type): number {
    return param.length;
}

export function getObjectValue<Type>(obj: Type, key: keyof Type) {
    return obj[key];
}


export function getBrowserWidth() {
    return true;
    // return window.innerWidth;
}

export function generateRandomId() {
    return Math.floor(Math.random() * Date.now()).toString(16);
}