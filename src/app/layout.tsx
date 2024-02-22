import type { Metadata } from "next";
import AuthSession from "./_component/AuthSession";
import { classNames } from "@/lib/uitls";
import { NanumGothic } from "@/lib/fonts";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "next-client-cookies/server";

import "dayjs/locale/ko";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "./globals.css";
import "github-markdown-css/github-markdown.css";

// notion 테마 스타일링 (필수)
import "react-notion-x/src/styles.css";

// 코드 하이라이트 스타일용
import "prismjs/themes/prism-tomorrow.css";
// 공식등 수학적 기호 스타일용
import "katex/dist/katex.min.css";
import Script from "next/script";
import GoogleAnalytics from "./GoogleAnalytics";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=0, viewport-fit=cover, maximum-scale=1.0"
        />
        <GoogleAnalytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function logEvent(name, params) {
                if (!name) {
                  return;
                }
              
                if (window.AnalyticsWebInterface) {
                  // Call Android interface
                  window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));
                } else if (window.webkit
                    && window.webkit.messageHandlers
                    && window.webkit.messageHandlers.firebase) {
                  // Call iOS interface
                  var message = {
                    command: 'logEvent',
                    name: name,
                    parameters: params
                  };
                  window.webkit.messageHandlers.firebase.postMessage(message);
                } else {
                  // No Android or iOS interface found
                  console.log("No native APIs found.");
                }
              }
              
              function setUserProperty(name, value) {
                if (!name || !value) {
                  return;
                }
              
                if (window.AnalyticsWebInterface) {
                  // Call Android interface
                  window.AnalyticsWebInterface.setUserProperty(name, value);
                } else if (window.webkit
                    && window.webkit.messageHandlers
                    && window.webkit.messageHandlers.firebase) {
                  // Call iOS interface
                  var message = {
                    command: 'setUserProperty',
                    name: name,
                    value: value
                };
                  window.webkit.messageHandlers.firebase.postMessage(message);
                } else {
                  // No Android or iOS interface found
                  console.log("No native APIs found.");
                }
              }
        `,
          }}
        />
      </head>
      <body className={classNames(NanumGothic.className)}>
        <CookiesProvider>
          <AuthSession>
            {children}
            {modal}
          </AuthSession>
          <ToastContainer />
        </CookiesProvider>
      </body>
    </html>
  );
}
