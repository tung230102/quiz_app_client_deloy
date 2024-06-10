import { toast } from "react-toastify";

export const showToast = (
  message,
  type = "success",
  onClose = 1000,
  position = "top-right"
) => {
  const toastConfig = {
    position: position,
    autoClose: onClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  if (type === "success") {
    toast.success(message, toastConfig);
  } else if (type === "error") {
    toast.error(message, toastConfig);
  } else if (type === "info") {
    toast.info(message, toastConfig);
  } else if (type === "warn") {
    toast.warn(message, toastConfig);
  }
};
