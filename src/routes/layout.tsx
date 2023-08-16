import {
  component$,
  Slot,
  useStyles$,
  useContextProvider,
  createContextId,
  useStore,
} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";

import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";

import type { Cart } from "~/types/cart";

import { api } from "~/api";
import type { ProductsAPI } from "~/api/type";

import styles from "./styles.css?inline";

export const cartContextId = createContextId<Cart>("shop.cart");

export const useProductLoader = routeLoader$(async (requestEvent) => {
  try {
    const res = await api<ProductsAPI>(
      `${requestEvent.env.get("API_URL")}/api/products?populate=*`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${requestEvent.env.get("PRODUCTION_TOKEN")}`,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    return {
      error: error,
      status: error?.response?.data?.error?.status,
      name: error?.response?.data?.error?.name,
      errorMessage: error?.response?.data?.error?.message,
    };
  }
});

export const onRequest: RequestHandler = async ({ next, sharedMap, env }) => {
  const axiosInstance = axios.create({
    baseURL: env.get("API_URL"),
    headers: {
      Authorization: `bearer ${env.get("PRODUCTION_TOKEN")}`,
    },
    withCredentials: true,
  });
  sharedMap.set("axios", axiosInstance);
  await next();
};

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  useStyles$(styles);
  const cart = useStore<Cart>({
    items: [],
  });
  useContextProvider(cartContextId, cart);

  return (
    <>
      <Header />
      <main class="min-h-screen flex flex-col">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
