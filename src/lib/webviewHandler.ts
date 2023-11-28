import { toast as WebToast } from "react-toastify";
export type TitleType = "leftheader" | "centerheader";
type RouterEvent = {
  ROUTER_EVENT: {
    path: string;
    type: "stack" | "reset";
    scroll?: boolean;
    title: string;
    titleType: TitleType;
  };
  LOGIN_EVENT: any;
  TOAST_EVENT: {
    type: "success" | "error";
    message: string;
  };
  PERMISSION_EVENT: any;
  OPEN_BROWSER_EVENT: {
    url: string;
  };
};

export const sendWebviewEvent = <T extends keyof RouterEvent>(
  type: T,
  data: RouterEvent[T]
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
