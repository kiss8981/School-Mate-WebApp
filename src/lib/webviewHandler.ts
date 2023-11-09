export const sendWebviewEvent = (
  type: "ROUTER_EVENT" | "LOGIN_EVENT",
  data: any
): void => {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type: type,
      data: data,
    })
  );
};
