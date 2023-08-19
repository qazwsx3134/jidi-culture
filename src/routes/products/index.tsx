import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import ProductCard from "~/components/productCard";
import StylingTitle from "~/components/stylingTitle";

import { useProductLoader } from "~/routes/layout";

export default component$(() => {
  const products = useProductLoader();

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
          <div class="stats stats-vertical sm:stats-horizontal shadow">
            <div class="stat">
              <div class="stat-title">閱讀人數</div>
              <div class="stat-value">3100</div>
              <div class="stat-desc"></div>
            </div>

            <div class="stat">
              <div class="stat-title">售出繪本</div>
              <div class="stat-value">4,200</div>
              <div class="stat-desc">好評</div>
            </div>

            <div class="stat">
              <div class="stat-title">繪本數</div>
              <div class="stat-value">20</div>
              <div class="stat-desc">持續增加中</div>
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

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
