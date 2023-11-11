export const sendWebviewEvent = (
  type: "ROUTER_EVENT" | "LOGIN_EVENT" | "TOAST_EVENT",
  data: any
): void => {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type: type,
      data: data,
    })
  );
};

export const toast = (type: "success" | "error", message: string): void => {
  sendWebviewEvent("TOAST_EVENT", {
    type: type,
    message: message,
  });
};
