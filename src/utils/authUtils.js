import { authKey } from "../constants";
import { getDataLocalStorage, setDataLocalStorage } from "./localStorageUtils";

export const isAuthenticated = () => {
  return !!getDataLocalStorage(authKey.tokens)?.accessToken;
};

export const getAccessToken = () => {
  return getDataLocalStorage(authKey.tokens)?.accessToken;
};

export const getRefreshToken = () => {
  return getDataLocalStorage(authKey.tokens)?.refreshToken;
};

export const handleLogout = () => {
  window.location.replace("login");
  setDataLocalStorage(authKey.tokens, {});
};
