import { toast as WebToast } from "react-toastify";

export const sendWebviewEvent = (
  type:
    | "ROUTER_EVENT"
    | "LOGIN_EVENT"
    | "TOAST_EVENT"
    | "PERMISSION_EVENT"
    | "OPEN_BROWSER_EVENT",
  data: any
): void => {
  if (!window || !window.ReactNativeWebView) {
    if (type === "OPEN_BROWSER_EVENT") {
      window.open(data.url, "_blank");
    }
  } else {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: type,
        data: data,
      })
    );
  }
};

export const toast = (type: "success" | "error", message: string): void => {
  if (window && window.ReactNativeWebView) {
    sendWebviewEvent("TOAST_EVENT", {
      type: type,
      message: message,
    });
  } else {
    WebToast[type](message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
    });
  }
};
