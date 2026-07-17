import { toast } from "react-toastify";

const baseOptions = {
  position: "top-center",
  autoClose: 2800,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  theme: "light",
};

export const notifySuccess = (message) =>
  toast.success(message, {
    ...baseOptions,
    className: "srinaar-toast srinaar-toast--success",
  });

export const notifyError = (message) =>
  toast.error(message, {
    ...baseOptions,
    autoClose: 3500,
    className: "srinaar-toast srinaar-toast--error",
  });

export const notifyInfo = (message) =>
  toast.info(message, {
    ...baseOptions,
    className: "srinaar-toast srinaar-toast--info",
  });
