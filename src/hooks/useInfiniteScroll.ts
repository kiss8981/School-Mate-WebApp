import {
  PaginationParams,
  PaginationResponse,
  Response,
} from "@/types/fetcher";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

interface InfiniteScrollOptions {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}

export const useInfiniteScroll = <T>(
  fetcher: (
    params: PaginationParams
  ) => Promise<AxiosResponse<Response<PaginationResponse<T>>>>,
  { onSuccess, onError }: InfiniteScrollOptions
) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<T[]>([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const resetPage = () => {
    setPage(1);
    executeFetch();
  };

  useEffect(() => {
    fetchNextPage();
  }, []);

  const executeFetch = useCallback(async () => {
    try {
      setFetching(true);
      const {
        data: {
          data: { contents, totalPage, numberPage },
        },
      } = await fetcher({
        page,
      });
      if (numberPage === 1) {
        setData(contents);
      } else {
        setData(prev => prev.concat(contents));
      }
      setPage(numberPage + 1);
      setNextPage(totalPage > numberPage);
      onSuccess?.();
    } catch (err) {
      onError?.(err);
    } finally {
      setFetching(false);
    }
  }, [page]);

  const fetchNextPage = () => {
    if (hasNextPage) executeFetch();
    else if (!hasNextPage) setFetching(false);
  };

  return { page, data, isFetching, hasNextPage, resetPage, fetchNextPage };
};
