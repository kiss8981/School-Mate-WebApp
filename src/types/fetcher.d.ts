export interface Response<T> {
  message: string;
  data: T;
  status: number;
  requestId: string;
}

export interface PaginationResponse<T> {
  contents: T[];
  totalPage: number;
  numberPage: number;
}

export interface PaginationParams {
  page: number;
}
