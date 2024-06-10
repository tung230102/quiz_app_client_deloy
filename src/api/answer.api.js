import {
  adminServicePost,
  adminServicePatch,
  adminServiceDelete,
} from "../services";

export const createAnswer = async (data) => {
  const res = await adminServicePost({
    target: `answers`,
    data,
  });
  return res;
};

export const updateAnswer = async (id, data) => {
  const res = await adminServicePatch({
    target: `answers/${id}`,
    data,
  });
  return res;
};

export const removeAnswer = async (id) => {
  const res = await adminServiceDelete({
    target: `answers/${id}`,
  });
  return res;
};
