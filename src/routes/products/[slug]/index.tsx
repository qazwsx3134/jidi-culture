import {
  $,
  component$,
  useSignal,
  useContext,
  useComputed$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";

import Swiper from "swiper";
import { Pagination, Thumbs } from "swiper/modules";

import Ckeditor from "~/components/ckeditor";
import { ArrowDownIcon } from "~/components/icon/arrowDown";
import { FacebookIcon } from "~/components/icon/facebookIcon";
import { MessageIcon } from "~/components/icon/MessageIcon";
import { LoadingIcon } from "~/components/icon/loadingIcon";
import { cartContextId } from "~/routes/layout";

import { api } from "~/api";
import type { ProductAPI } from "~/api/type";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/pagination";
import "~/components/carousel/productCarousel.css";

export const useProductLoader = routeLoader$(
  async ({ params, status, fail, env }) => {
    // Example database call using the id param
    // The database could return null if the product is not found
    const res = await api<ProductAPI>(
      `${env.get("API_URL")}/api/products/${params.slug}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${env.get("PRODUCTION_TOKEN")}`,
        },
      }
    ).catch((error: any) => {
      return {
        error: error,
        status: error?.response?.data?.error?.status,
        name: error?.response?.data?.error?.name,
        errorMessage: error?.response?.data?.error?.message,
      };
    });

    if ("error" in res) {
      return fail(404, {
        errorMessage: res.error.message,
      });
    }
    if (!res.data) {
      // Product data was not found
      // Set the status code to 404
      status(404);
    }

    // return the data (which may be null)
    return res.data;
  }
);

/**
 * This is the product page for a single product.
 * It is rendered at /products/[slug]
 *
 * The signal `product` is loaded by the `useProductLoader` function above.
 *
 * Input signals are used to track the quantity of the product to add to the cart.
 *
 * addToCartState is used to track the state of the add to cart button.
 *
 *
 * 1. out of stock error : if the quantity is greater than the available quantity
 * 2. no input number error : if the input is null or undefined
 */

export default component$(() => {
  const product = useProductLoader();

  const inputSignal = useSignal<string | undefined>("1");
  const addToCartState = useSignal<"idle" | "loading" | "added">("idle");

  const cartCtx = useContext(cartContextId);

  const quantityInCart = useComputed$(() => {
    if (!product.value) {
      return 0;
    }

    if ("errorMessage" in product.value) {
      return 0;
    }

    const productId = product.value.id;

    const item = cartCtx.items.find((item) => item.id === productId);
    if (!item) {
      return 0;
    }
    return item.quantity;
  });

  const outOfStock = useComputed$(() => {
    if (!inputSignal.value) {
      return false;
    }
    if (!product.value || "errorMessage" in product.value) {
      return false;
    }

    if (product.value.attributes.availableQuantity === 0) {
      return true;
    }

    return (
      Number(inputSignal.value) + quantityInCart.value >
      product.value.attributes.availableQuantity
    );
  });

  const noInputNumber = useComputed$(() => {
    // init
    if (inputSignal.value === undefined) {
      return false;
    }

    if (!inputSignal.value || Number(inputSignal.value) <= 0) {
      return true;
    }
    return false;
  });

  if (!product.value || "errorMessage" in product.value) {
    // no product data found
    // so render our own custom product 404
    return <p>Sorry, looks like we don't have this product.</p>;
  }

  const {
    id,
    attributes: {
      slug,
      name,
      price,
      availableQuantity,
      description,
      detail,
      image,
      images,
      categories,
    },
  } = product.value;

  const delayButtonState = $(() => {
    addToCartState.value = "loading";
    setTimeout(() => {
      addToCartState.value = "added";
      setTimeout(() => {
        addToCartState.value = "idle";
      }, 800);
    }, 800);
  });

  const addToCartOnClick = $(() => {
    //   id: string;
    // slug: string;
    // name: string;
    // price: number;
    // quantity: number;
    // thumbnail?: string;
    if ("errorMessage" in product.value) {
      return;
    }

    if (inputSignal.value === undefined) {
      inputSignal.value = "0";
      return;
    }

    if (inputSignal.value && Number(inputSignal.value) > 0) {
      delayButtonState();

      // check if the item is already in the cart
      const item = cartCtx.items.find((item) => item.id === id);
      if (item) {
        item.quantity += Number(inputSignal.value);
      } else {
        cartCtx.items.push({
          id: id,
          slug: slug,
          name: name,
          price: price,
          quantity: Number(inputSignal.value),
          thumbnail: {
            url:
              image?.data.attributes.formats?.small?.url ||
              image?.data.attributes.url,
            width:
              image?.data.attributes.formats?.small?.width ||
              image?.data.attributes.width,
            height:
              image?.data.attributes.formats?.small?.height ||
              image?.data.attributes.height,
          },
          availableQuantity: availableQuantity,
        });
      }

      inputSignal.value = "1";
    }
  });

  useVisibleTask$(() => {
    const swiper = new Swiper(".productSubSwiper", {
      loop: false,
      spaceBetween: 20,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    new Swiper(".productMainSwiper", {
      spaceBetween: 10,
      slidesPerView: 1,

      thumbs: {
        swiper: swiper,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      modules: [Pagination, Thumbs],
    });
  });

  return (
    <>
      <section class="text-gray-600 body-font bg-bgwhite-500 overflow-hidden">
        <div class="container p-4 mx-auto">
          <Link
            class="text-2xl title-font font-bold flex items-center justify-start gap-4 hover:text-accent"
            href="/products"
          >
            <ArrowDownIcon class="rotate-90" /> 商品列表
          </Link>
        </div>

        <div class="bg-white py-6 border-t border-gray-300">
          <div class="container px-5 pt-24 mx-auto">
            <div class="lg:w-4/5 mx-auto flex flex-wrap lg:min-h-[800px] mb-6">
              <div class="lg:w-1/2 w-full h-auto max-h-[800px] flex flex-col">
                {/* Main Swiper */}
                <div class="h-5/6 lg:h-full w-full swiper productMainSwiper ">
                  <div class="swiper-wrapper w-full h-full">
                    {images?.data?.map((productImage) => (
                      <div
                        class="swiper-slide w-full h-full flex items-center justify-center"
                        key={productImage.attributes.hash}
                      >
                        <img
                          alt={productImage.attributes.alternativeText}
                          class="h-full w-auto object-contain object-center rounded"
                          src={
                            productImage.attributes.url ||
                            "https://dummyimage.com/600x600"
                          }
                          width={productImage.attributes.width || 600}
                          height={productImage.attributes.height || 600}
                        />
                      </div>
                    )) ?? (
                      <div class="swiper-slide w-full h-full flex items-center justify-center">
                        <img
                          alt="placeholder"
                          class="h-full w-auto object-contain object-center rounded"
                          src={"https://dummyimage.com/600x600"}
                          width={600}
                          height={600}
                        />
                      </div>
                    )}
                  </div>
                  <div class="swiper-pagination visible lg:invisible"></div>
                </div>

                {/* Sub Swiper */}
                <div class="h-1/6 w-full swiper productSubSwiper hidden lg:block ">
                  <div class="swiper-wrapper h-full ">
                    {images?.data?.map((productImage) => (
                      <div
                        class="swiper-slide h-full w-auto flex items-center justify-center"
                        key={productImage.attributes.hash}
                      >
                        <img
                          alt={productImage.attributes.formats?.thumbnail?.name}
                          class="h-full w-auto object-contain object-center rounded-md"
                          src={
                            productImage.attributes.formats?.thumbnail?.url ||
                            "https://dummyimage.com/300x300"
                          }
                          width={
                            productImage.attributes.formats?.thumbnail?.width ||
                            300
                          }
                          height={
                            productImage.attributes.formats?.thumbnail
                              ?.height || 300
                          }
                        />
                      </div>
                    )) ?? (
                      <div class="swiper-slide h-full w-auto flex items-center justify-center">
                        <img
                          alt="placeholder"
                          class="h-full w-auto object-contain object-center rounded-md"
                          src={"https://dummyimage.com/300x300"}
                          width={300}
                          height={300}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-4 lg:mt-0">
                <h2 class="text-base mb-4">
                  {categories?.data?.map((category) => (
                    <div
                      key={category.attributes.slug}
                      class="badge badge-outline badge-accent badge-lg mr-2"
                    >
                      {category.attributes.name}
                    </div>
                  ))}
                </h2>
                <h1 class="text-gray-900 text-4xl title-font font-bold mb-3 tracking-widest">
                  {name}
                </h1>

                <div class="flex mb-8">
                  <span class="flex items-center">
                    <span class="text-gray-400 m-2">
                      庫存: {availableQuantity}
                    </span>
                  </span>
                  <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a class="text-gray-400">
                      <FacebookIcon />
                    </a>

                    <a class="text-gray-400">
                      <MessageIcon />
                    </a>
                  </span>
                </div>

                <div class="flex mb-8">
                  <span class="title-font font-normal text-3xl text-gray-900">
                    NT $ {price}
                  </span>
                </div>

                <p class="leading-relaxed break-all">{description}</p>
                <div class="flex flex-col mt-6 items-start gap-8 pb-5 my-5 ">
                  <div class="flex flex-1 form-control w-full md:max-w-xs">
                    <label class="label">
                      <span class="label-text text-gray-500 text-lg">數量</span>
                      <span class="label-text-alt text-red-500 text-lg">
                        {outOfStock.value && "庫存不足"}
                        {noInputNumber.value && "請輸入數量"}
                      </span>
                    </label>
                    <input
                      min={0}
                      type="number"
                      placeholder="1"
                      class="input input-bordered w-full bg-white focus:outline-gray-500"
                      value={inputSignal.value}
                      onChange$={(event) => {
                        inputSignal.value = event.target.value;
                      }}
                    />
                  </div>
                  <button
                    class="flex flex-1 my-2 btn btn-outline border-2 text-bgRed-600 bg-white rounded-full md:max-w-xs hover:bg-bgRed-700 hover:text-white btn-block disabled:bg-gray-700 disabled:text-white disabled:cursor-not-allowed"
                    onClick$={addToCartOnClick}
                    disabled={
                      Number(inputSignal.value) <= 0 ||
                      addToCartState.value !== "idle" ||
                      outOfStock.value
                    }
                  >
                    {addToCartState.value !== "idle" &&
                      !outOfStock.value &&
                      !noInputNumber.value && (
                        <LoadingIcon class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      )}
                    <p class="text-xl font-black">
                      {/* Loading */}

                      {addToCartState.value === "loading" && "加入中..."}
                      {addToCartState.value === "added" && "已加入購物車"}

                      {/* Error */}
                      {outOfStock.value && "庫存不足"}
                      {noInputNumber.value &&
                        addToCartState.value === "idle" &&
                        "請輸入數量"}

                      {/* Idle */}
                      {!outOfStock.value &&
                        !noInputNumber.value &&
                        addToCartState.value === "idle" &&
                        "加入購物車"}
                    </p>
                  </button>
                </div>

                <div class="flex max-w-xs mt-6"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full bg-bgWhite-500 min-h-screen">
          <div class="container mx-auto p-12">
            <Ckeditor html={detail} />
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const productPage = resolveValue(useProductLoader);
  if (
    !productPage ||
    "errorMessage" in productPage ||
    !productPage.attributes.seo
  ) {
    return {
      title: "基地文化",
      meta: [
        {
          name: "description",
          content: "基地文化",
        },
        // Open graph
        {
          property: "og:title",
          content: "基地文化",
        },
        {
          property: "og:description",
          content: "基地文化",
        },
      ],
      links: [
        {
          rel: "canonical",
          href: "https://jidiculture.com/",
        },
      ],
    };
  }

  const { metaTitle, metaDescription, metaRobots, keywords } =
    productPage.attributes.seo;

  return {
    title: metaTitle,
    meta: [
      {
        name: "description",
        content: metaDescription,
      },
      {
        name: "robots",
        content: metaRobots,
      },
      {
        name: "keywords",
        content: keywords,
      },
      // Open graph
      {
        property: "og:title",
        content: metaTitle,
      },
      {
        property: "og:description",
        content: metaDescription,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://jidiculture.com/",
      },
    ],
  };
};
