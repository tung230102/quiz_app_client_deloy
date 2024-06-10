import { adminServicePost } from "../services";

export const register = async (data) => {
  const res = await adminServicePost({
    target: "authentication/register",
    data,
  });
  return res;
};

export const login = async (data) => {
  const res = await adminServicePost({
    target: "authentication/login",
    data,
  });
  return res;
};

export const forgotPassword = async (data) => {
  const res = await adminServicePost({
    target: "authentication/forgot-password",
    data,
  });
  return res;
};
