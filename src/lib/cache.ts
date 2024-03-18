import { SessionStorage } from "."

const cache = {
    set<Value>(key: string, value: Value) {
        return SessionStorage.set(key, value);
    },
    get(key: string) {
        return SessionStorage.getParse(key);
    }
}
export default cache;