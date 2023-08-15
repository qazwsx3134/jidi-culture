import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import type { ApiError, ProductsAPI, ProductAPI } from "./type";

// Get

// Get all products
export const getProducts = async (
  config: AxiosRequestConfig
): Promise<ProductsAPI | ApiError> => {
  try {
    const { data } = await axios.get<ProductsAPI>(
      "/api/products?populate=*",
      config
    );
    return data;
  } catch (error: any) {
    return {
      error: {
        status: error?.response?.data?.error?.status,
        name: error?.response?.data?.error?.name,
        message: error?.response?.data?.error?.message,
      },
    };
  }
};

// Get a product by slug (id)

export const getProductBySlug = async (
  axios: AxiosInstance,
  slug: string
): Promise<ProductAPI | ApiError> => {
  try {
    const { data } = await axios.get<ProductAPI>(`/api/products/${slug}`);
    return data;
  } catch (error: any) {
    return {
      error: {
        status: error?.response?.data?.error?.status,
        name: error?.response?.data?.error?.name,
        message: error?.response?.data?.error?.message,
      },
    };
  }
};
