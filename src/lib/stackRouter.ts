import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NextRouter } from "next/router";

// react native app 환경인지 판단
const isApp = () => {
  let isApp = false;

  if (typeof window !== "undefined" && window.ReactNativeWebView) {
    isApp = true;
  }

  return isApp;
};

// ReactNative Webview에 postMessage 요청
const sendRouterEvent = (
  path: string,
  type?: "stack" | "reset",
  scroll?: boolean
): void => {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type: "ROUTER_EVENT",
      data: {
        path: path,
        type: type ?? "stack",
        scroll: scroll ?? true,
      },
    })
  );
};

// 뒤로가기 하는 경우
export const stackRouterBack = (router: AppRouterInstance) => {
  if (isApp()) {
    sendRouterEvent("back");
  } else {
    router.back();
  }
};

// push 하는 경우
export const stackRouterPush = (
  router: AppRouterInstance,
  url: string,
  type?: "stack" | "reset",
  scroll?: boolean
) => {
  if (isApp()) {
    sendRouterEvent(url, type, scroll);
  } else {
    router.push(url);
  }
};
