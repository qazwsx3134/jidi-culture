import type { Product } from "./type/product";
import type { Project } from "./type/project";

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

export interface ProjectAPI {
  data: Project | null;
  meta: {};
}

export interface LinePayCreateOrderCallback {
  paymentUrl: {
    web: string;
    app: string;
  };
}

export interface LinePayConfirmOrderAPI {
  email: string;
  buyerName: string;
  orderId: string;
  transactionId: string;
  status: string;
}
