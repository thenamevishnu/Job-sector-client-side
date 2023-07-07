import { toast } from "react-toastify";

export const promiseAlert = async (message) => {
    toast.promise(message, {
        pending: 'Uploading...',
        success: "Upload successful!",
        error: 'Upload Faild!!',
        position: "top-center",
    });
} 

export const errorAlert = async (message) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
} 

export const successAlert = async (message) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}

export const warnAlert = async (message) => {
    toast.warning(message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}