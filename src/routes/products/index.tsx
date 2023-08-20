import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { api } from "~/api";
import { ShopPageAPI } from "~/api/type";

import ProductCard from "~/components/productCard";
import StylingTitle from "~/components/stylingTitle";

import { useProductsLoader } from "~/routes/layout";

export const useProductPage = routeLoader$(async ({ env, fail }) => {
  const res = await api<ShopPageAPI>(
    `${env.get("API_URL")}/api/shop-page?populate[0]=seo&populate[1]=seo.metaSocial.image&populate[2]=firstBlock&populate[3]=secondBlock&populate[4]=thirdBlock`,
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

  // return the data (which may be null)
  return res.data;
});

export default component$(() => {
  const productPage = useProductPage();
  const products = useProductsLoader();

  if ("errorMessage" in products.value) {
    return (
      <section class="h-full bg-bgGray-500">
        <div class="bg-bgWhite-500">
          <div class="container px-5 py-12 mx-auto">
            <StylingTitle title="故事商店" />
            {products.value.errorMessage}
          </div>
        </div>
      </section>
    );
  }

  if ("errorMessage" in productPage.value) {
    return (
      <section class="h-full bg-bgGray-400">
        <div class="bg-bgWhite-500">
          <div class="container px-5 py-12 mx-auto">
            <StylingTitle title="故事商店" />
          </div>
        </div>
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
            <div class="w-full sm:p-4 px-4 mb-6">
              <h1 class="title-font font-medium text-2xl mb-2 text-gray-900">
                家族、文化和認同
              </h1>
              <div class="leading-relaxed text-gray-500">
                原住民的神話故事以優美的原住民語言詞書寫，讓讀者感受到古老的傳說之美。
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="flex flex-wrap gap-4 md:justify-start justify-center">
            {products.value.map((product) => (
              <ProductCard {...product.attributes} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section class="h-full bg-bgGray-400">
      <div class="bg-bgWhite-500">
        <div class="container px-5 py-12 mx-auto">
          <StylingTitle title="故事商店" />
        </div>
      </div>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
          <div class="w-full sm:p-4 px-4 mb-6">
            <h1 class="title-font font-medium text-2xl mb-2 text-gray-900">
              {productPage.value.attributes.title}
            </h1>
            <div class="leading-relaxed text-gray-500">
              {productPage.value.attributes.shopDescription}
            </div>
          </div>
          <div class="stats stats-vertical sm:stats-horizontal shadow">
            <div class="stat">
              <div class="stat-title">
                {productPage.value.attributes.firstBlock.title}
              </div>
              <div class="stat-value">
                {productPage.value.attributes.firstBlock.number}
              </div>
              <div class="stat-desc">
                {productPage.value.attributes.firstBlock.description}
              </div>
            </div>

            <div class="stat">
              <div class="stat-title">
                {productPage.value.attributes.secondBlock.title}
              </div>
              <div class="stat-value">
                {productPage.value.attributes.secondBlock.number}
              </div>
              <div class="stat-desc">
                {productPage.value.attributes.secondBlock.description}
              </div>
            </div>

            <div class="stat">
              <div class="stat-title">
                {productPage.value.attributes.thirdBlock.title}
              </div>
              <div class="stat-value">
                {productPage.value.attributes.thirdBlock.number}
              </div>
              <div class="stat-desc">
                {productPage.value.attributes.thirdBlock.description}
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="flex flex-wrap gap-4 md:justify-start justify-center">
          {products.value.map((product) => (
            <ProductCard {...product.attributes} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const productPage = resolveValue(useProductPage);
  if ("errorMessage" in productPage || !productPage.attributes.seo) {
    return {
      title: "基地文化-故事商店",
      meta: [
        {
          name: "description",
          content: "基地文化-故事商店",
        },
        // Open graph
        {
          property: "og:title",
          content: "基地文化-故事商店",
        },
        {
          property: "og:description",
          content: "基地文化-故事商店",
        },
      ],
      links: [
        {
          rel: "canonical",
          href: "https://jidiculture.com/products",
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
