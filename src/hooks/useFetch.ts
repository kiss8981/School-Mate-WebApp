import { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import client from "@/lib/fetch";
import { toast } from "@/lib/webviewHandler";

type UseFetchParams = {
  fetchInit?: AxiosRequestConfig;
  successToast?: {
    message: string;
  };
  failureToast?: {
    [statusCode: number]: {
      message: string;
    };
    fallback: {
      message: string;
    };
  };
  onError?: (statusCode: number, statusText: string, body: any) => void;
  onSuccess?: (statusCode: number, statusText: string, body: any) => void;
  onPending?: () => void;
};

export default function useFetch(
  url: string,
  type: Method,
  {
    fetchInit,
    successToast,
    failureToast,
    onError,
    onSuccess,
    onPending,
  }: UseFetchParams
) {
  return {
    triggerFetch({
      failureToast: oFailureToast,
      fetchInit: oFetchInit,
      successToast: oSuccessToast,
      onError: oOnError,
      onSuccess: oOnSuccess,
      onPending: oOnPending,
    }: UseFetchParams): Promise<{ response?: AxiosResponse; body: any }> {
      oOnPending ? oOnPending() : onPending && onPending();
      const successToastObject = oSuccessToast ?? successToast;
      const requestEndpoint = oFetchInit?.url ? oFetchInit.url : url;
      return client(requestEndpoint, {
        method: type,
        ...oFetchInit,
        ...fetchInit,
      })
        .then(response => {
          if (successToastObject) {
            toast("success", successToastObject.message);
          }

          if (oOnSuccess || onSuccess) {
            oOnSuccess
              ? oOnSuccess(
                  response.status,
                  response.data.message,
                  response.data.data
                )
              : onSuccess &&
                onSuccess(
                  response.status,
                  response.data.message,
                  response.data.data
                );
          }

          return { response, body: response.data };
        })
        .catch((error: AxiosError) => {
          const failureToastObject = oFailureToast ?? failureToast;
          if (failureToastObject) {
            if (failureToastObject[error.response?.status ?? 0]) {
              toast(
                "error",
                failureToastObject[error.response?.status ?? 500].message
              );
            }
          }

          const response = error.response as unknown as {
            data: { message: string; data: any };
          };

          if (oOnError || onError) {
            onError
              ? onError(
                  error.response?.status ?? 500,
                  response ? response.data.message : error.message,
                  response ? response.data.data : null
                )
              : oOnError &&
                oOnError(
                  error.response?.status ?? 500,
                  response ? response.data.message : error.message,
                  response ? response.data.data : null
                );
          }

          return { response: error.response, body: response.data };
        });
    },
  };
}
