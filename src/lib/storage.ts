/**
 *
 * ALWAYS USE setToStorage AND getFromStorage FUNCTIONS FOR READ, WRITE operations.
 *
 */

type StorageType = Storage;

const setToStorage = (key: string, data: unknown, storage: StorageType): void => {
  storage.setItem(key, JSON.stringify(data));
};

const getFromStorage = <T = unknown>(key: string, storage: StorageType | undefined): T => {
  let data: T;
  if (storage) {
    const raw = storage.getItem(key);
    data = raw ? JSON.parse(raw) : {};
  } else {
    data = {} as T;
  }
  return data;
};

// Local Storage
export const setToLocalStorage = (key: string, data: unknown): void => {
  if (typeof window !== "undefined" && window.localStorage)
    setToStorage(key, data, window.localStorage);
};
export const getFromLocalStorage = <T = unknown>(key: string): T =>
  getFromStorage<T>(key, typeof window !== "undefined" ? window.localStorage : undefined);

// Session Storage
const setToSessionStorage = (key: string, data: unknown): void => {
  if (typeof window !== "undefined" && window.sessionStorage)
    setToStorage(key, data, window.sessionStorage);
};
const getFromSessionStorage = <T = unknown>(key: string): T =>
  getFromStorage<T>(key, typeof window !== "undefined" ? window.sessionStorage : undefined);

// Clear All Storages except PERSISTENT_DATA_KEYS
const clear = (): void => {
  if (typeof window !== "undefined" && window.localStorage) {
    // const PERSISTENT_DATA_KEYS = APP_CONFIG.STORAGE.PERSISTENT_DATA_KEYS as string[];
    // const tempStorage: Record<string, unknown> = {};
    // for (let key of PERSISTENT_DATA_KEYS) {
    //   tempStorage[key] = getFromLocalStorage(key);
    // }

    window.localStorage.clear();
    window.sessionStorage.clear();

    // for (let key of PERSISTENT_DATA_KEYS) {
    //   setToLocalStorage(key, tempStorage[key]);
    // }
  }
};

// User
const writeUserData = (details: unknown): void => setToSessionStorage("user", details);
const readUserData = <T = unknown>(): T => getFromSessionStorage<T>("user");

// Token
const writeTokens = (details: unknown): void => setToLocalStorage("tokens", details);
const readTokens = <T = unknown>(): T => getFromLocalStorage<T>("tokens");

// User accept cookies
const writeUserAcceptCookies = (value: unknown): void =>
  setToLocalStorage("USER_ACCEPT_COOKIES", value);
const readUserAcceptCookies = <T = unknown>(): T => getFromLocalStorage<T>("USER_ACCEPT_COOKIES");

// Create your custom functions here...
// const myCustomFunction = () => {
//     //
// }

const Storage = {
  // user
  writeUserData,
  readUserData,
  // tokens
  writeTokens,
  readTokens,
  // user accept cookies
  writeUserAcceptCookies,
  readUserAcceptCookies,
  // others
  clear,
};

export default Storage;