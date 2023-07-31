import { component$, useVisibleTask$ } from "@builder.io/qwik";

import { initSwiper } from "~/components/carousel";
import { useProductLoader } from "~/routes";
import FrontPageCard from "./frontPageCard";



export default component$(() => {
  const products = useProductLoader();

  if ("errorMessage" in products.value) {
    products.value.errorMessage;
    return null;
  }

  useVisibleTask$(() => {
    // init Swiper:
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const swiper = initSwiper(".swiper", {
      // Optional parameters

      height: 600,
      slidesOffsetBefore: 5,
      slidesPerView: 1,
      spaceBetween: 10,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      // breakpoints
      breakpoints: {
        // mobile
        768: {
          slidesPerView: 2.2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3.3,
          spaceBetween: 56,
        },
      },
    });
  });
  return (
    <section class="text-gray-600 body-font h-full overflow-hidden">
      <div class="container px-5 py-12 mx-auto">
        <div class="flex flex-wrap w-full mb-20">
          <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              繪本商店
            </h1>
            <div class="h-1 w-20 bg-bgRed-500 rounded"></div>
          </div>
          <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep jianbing selfies heirloom prism
            food truck ugh squid celiac humblebrag.
          </p>
        </div>
      </div>
      {/* Slider main container */}
      <div class="swiper max-w-5xl h-[600px]">
        {/* Additional required wrapper */}
        <div class="swiper-wrapper rounded-md h-full">
          {/* Slides */}
          {products.value.map((product) => (
            <div
              class="swiper-slide w-[30.3%] h-[550px] flex items-center justify-center"
              key={product.attributes.slug}
            >
              <FrontPageCard {...product.attributes} />
            </div>
          ))}
        </div>
        {/* <!-- If we need pagination --> */}
        <div class="swiper-pagination"></div>
      </div>
    </section>
  );
});
