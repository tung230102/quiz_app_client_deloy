import axios from "axios";
import { authKey, statusCode } from "../constants";
import {
  getAccessToken,
  getRefreshToken,
  handleLogout,
  setDataLocalStorage,
} from "../utils";
import {
  generateDeleteMethod,
  generateGetMethod,
  generatePatchMethod,
  generatePostMethod,
  generateUploadFileMethod,
} from "./methods";

const adminServiceInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    timeout: 5000,
  },
  withCredentials: false,
});

adminServiceInstance.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const getNewPairTokens = async (currentRefreshToken) => {
  const res = await adminServiceInstance.post("authentication/refresh-token", {
    refresh_token: currentRefreshToken,
  });
  return res?.data?.newTokens;
};

const getNewTokens = async (error, logout) => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    logout();
    return;
  }

  try {
    const metaData = await getNewPairTokens(refreshToken);

    if (!metaData?.access_token) {
      logout();
    }

    const tokensReceived = {
      accessToken: metaData?.access_token,
      refreshToken: metaData?.refresh_token,
    };
    setDataLocalStorage(authKey.tokens, tokensReceived);

    const originalConfig = error.config;
    return adminServiceInstance(originalConfig);
  } catch (error) {
    logout();
    return;
  }
};

const handleResponseSuccess = (response) => {
  if (response.status === statusCode.UNAUTHORIZED) {
    handleLogout();
  }
  return response.data ? response.data : {};
};

const handleResponseError = (error) => {
  if (error.response?.status !== statusCode.UNAUTHORIZED) {
    const errMessage = error.response?.data || error?.response || error;
    return Promise.reject(errMessage);
  } else {
    return getNewTokens(error, () => {
      handleLogout();
    });
  }
};

adminServiceInstance.interceptors.response.use(
  handleResponseSuccess,
  handleResponseError
);

export const adminServiceGet = generateGetMethod(adminServiceInstance);
export const adminServicePost = generatePostMethod(adminServiceInstance);
export const adminServicePatch = generatePatchMethod(adminServiceInstance);
export const adminServiceDelete = generateDeleteMethod(adminServiceInstance);
export const adminServiceUpload =
  generateUploadFileMethod(adminServiceInstance);
