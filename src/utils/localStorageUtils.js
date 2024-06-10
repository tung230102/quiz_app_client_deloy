import { authKey } from "../constants";
import { b64DecodeUnicode, b64EncodeUnicode } from "./base64";

export const getDataLocalStorage = (key) => {
  const item = window.localStorage.getItem(b64EncodeUnicode(key));
  return item ? JSON.parse(b64DecodeUnicode(item)) : null;
};

export const setDataLocalStorage = (key, valueToStore) => {
  window.localStorage.setItem(
    b64EncodeUnicode(key),
    b64EncodeUnicode(JSON.stringify(valueToStore))
  );
};

export const userDataLocalStorage = () => {
  const userData = getDataLocalStorage(authKey.userData);

  const email = userData?.email;
  const avatar = userData?.avatarLink;
  const name = userData?.userName;
  const isAdmin = userData?.role?.includes("admin");

  return {
    email,
    avatar,
    name,
    isAdmin,
    userData,
  };
};
