const errorHandler = (e) => {
  if (process.env.NODE_ENV === "development") {
    console.error("QQ AxiosError: ", e);
  }
  if (e) {
    return Promise.resolve(e);
  }
  return Promise.resolve();
};

// Config for GET method with API

const getAPI = ({ axiosInstance, target, params, settings = {} }) =>
  axiosInstance
    .get(target, {
      ...settings,
      params: params || {},
    })
    .then((resp) => Promise.resolve(resp))
    .catch(errorHandler);

export const generateGetMethod =
  (axiosInstance) =>
  ({ target, params, settings = {} }) =>
    getAPI({ axiosInstance, target, params, settings });

// Config for POST method with API

const postAPI = ({ axiosInstance, target, data, config }) =>
  axiosInstance
    .post(target, data, config)
    .then((resp) => Promise.resolve(resp))
    .catch(errorHandler);

export const generatePostMethod =
  (axiosInstance) =>
  ({ target, data, config }) =>
    postAPI({ axiosInstance, target, data, config });

// Config for PATCH method with API

const patchAPI = ({ axiosInstance, target, data }) =>
  axiosInstance
    .patch(target, data)
    .then((resp) => Promise.resolve(resp))
    .catch(errorHandler);

export const generatePatchMethod =
  (axiosInstance) =>
  ({ target, data }) =>
    patchAPI({ axiosInstance, target, data });

// Config for DELETE method with API

const delAPI = ({ axiosInstance, target, data }) =>
  axiosInstance
    .delete(target, data)
    .then((resp) => Promise.resolve(resp))
    .catch(errorHandler);

export const generateDeleteMethod =
  (axiosInstance) =>
  ({ target, data }) =>
    delAPI({ axiosInstance, target, data });

// Config for POST FILE method with API

const postFileAPI = ({ axiosInstance, target, data }) =>
  axiosInstance
    .post(target, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp) => Promise.resolve(resp))
    .catch(errorHandler);

export const generateUploadFileMethod =
  (axiosInstance) =>
  ({ target, data }) =>
    postFileAPI({ axiosInstance, target, data });
