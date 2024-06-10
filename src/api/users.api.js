import {
  adminServiceDelete,
  adminServiceGet,
  adminServicePatch,
  adminServicePost,
  adminServiceUpload,
} from "../services";

export const getListUsers = async (params) => {
  const data = await adminServiceGet({
    target: "users",
    params,
  });

  return data?.data;
};

export const changePassword = async (data) => {
  const res = await adminServicePatch({
    target: "users/change-password",
    data,
  });
  return res;
};

export const uploadAvatar = async (data) => {
  const res = await adminServiceUpload({
    target: "users/upload-avatar",
    data,
  });
  return res;
};

export const createUser = async (data) => {
  const res = await adminServicePost({
    target: "users",
    data,
  });
  return res;
};

export const updateUser = async (id, data) => {
  const res = await adminServicePatch({
    target: `users/${id}`,
    data,
  });
  return res;
};

export const removeUser = async (id) => {
  const res = await adminServiceDelete({
    target: `users/${id}`,
  });
  return res;
};

export const updateCurrentUser = async (data) => {
  const res = await adminServicePatch({
    target: `users/updateMe`,
    data,
  });
  return res;
};
