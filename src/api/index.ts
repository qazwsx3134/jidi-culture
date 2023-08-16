import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import type { ApiError, ProductsAPI, ProductAPI } from "./type";

export function api<T>(
  url: string,
  config: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    mode?: "cors" | "no-cors" | "same-origin";
    headers?: Record<string, string>;
    body?: any;
  }
) {
  return fetch(url, config).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}

// Get

// Get all products
export const getProducts = async (
  baseUrl: string,
  config: AxiosRequestConfig
): Promise<ProductsAPI | ApiError> => {
  try {
    const { data } = await axios.get<ProductsAPI>(
      `${baseUrl}/api/products`,
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
