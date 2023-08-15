import axios from "axios";
import env from "dotenv";

import type { ApiError, ProductsAPI, ProductAPI } from "./type";

env.config();

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    common: {
      Authorization: `Bearer ${process.env.PRODUCTION_TOKEN}`,
    },
  },
});

// Get

// Get all products
export const getProducts = async (): Promise<ProductsAPI | ApiError> => {
  try {
    const { data } = await axiosInstance.get<ProductsAPI>(
      "/api/products?populate=*"
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
  slug: string
): Promise<ProductAPI | ApiError> => {
  try {
    const { data } = await axiosInstance.get<ProductAPI>(
      `/api/products/${slug}`
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
