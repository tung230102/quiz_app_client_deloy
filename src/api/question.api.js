import {
  adminServiceGet,
  adminServicePost,
  adminServicePatch,
  adminServiceDelete,
  adminServiceUpload,
} from "../services";

export const getListQuestions = async (params) => {
  const data = await adminServiceGet({
    target: "questions",
    params,
  });
  return data?.data;
};

export const getDetailQuestion = async (id) => {
  const data = await adminServiceGet({
    target: `questions/${id}`,
  });
  return data?.data;
};

export const createQuestion = async (data) => {
  const res = await adminServicePost({
    target: "questions",
    data,
  });
  return res;
};

export const updateQuestion = async (id, data) => {
  const res = await adminServicePatch({
    target: `questions/${id}`,
    data,
  });
  return res;
};

export const removeQuestion = async (id) => {
  const res = await adminServiceDelete({
    target: `questions/${id}`,
  });
  return res;
};

export const uploadThumbnail = async (data) => {
  const res = await adminServiceUpload({
    target: "questions/upload-thumbnail",
    data,
  });
  return res;
};

export const getListQuestionsPlay = async (params) => {
  const res = await adminServiceGet({
    target: `questions/play`,
    params,
  });
  return res;
};

export const getListQuestionsCategories = async (params) => {
  const res = await adminServiceGet({
    target: `questions/categories`,
    params,
  });
  return res;
};

export const questionsSubmit = async (data) => {
  const res = await adminServicePost({
    target: "questions/submit",
    data,
  });
  return res;
};
