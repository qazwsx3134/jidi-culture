import { AxiosRequestConfig } from "axios";
import { Product } from "./type/product";

export interface ApiError {
  error: {
    status: number;
    name: string;
    message: string;
  };
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
}

export interface ProductsAPI {
  data: Product[];
  meta: {
    pagination: Pagination;
  };
}

export interface ProductAPI {
  data: Product | null;
  meta: {};
}

export interface AxiosConfig extends AxiosRequestConfig {
  options?: {
    [key: string]: any;
  }
}