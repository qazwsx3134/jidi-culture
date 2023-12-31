import { component$, useVisibleTask$ } from "@builder.io/qwik";

import { initSwiper } from "~/components/carousel";
import StylingTitle from "~/components/stylingTitle";
import { useLimitedProductsLoader } from "~/routes/layout";
import FrontPageCard from "./frontPageCard";
import { useHomePage } from "~/routes";

export default component$(() => {
  const products = useLimitedProductsLoader();
  const homePage = useHomePage();

  if ("errorMessage" in products.value) {
    products.value.errorMessage;
    return null;
  }

  useVisibleTask$(() => {
    // init Swiper:
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const swiper = initSwiper(".shopSwiper", {
      // Optional parameters

      height: 600,
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 10,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      // breakpoints
      breakpoints: {
        // mobile
        300: {
          slidesPerView: 1.2,
          spaceBetween: 10,
          centeredSlides: true,
        },
        768: {
          slidesPerView: 2.2,
          spaceBetween: 40,
          slidesOffsetBefore: 50,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 3.3,
          spaceBetween: 56,
          slidesOffsetBefore: 50,
          centeredSlides: false,
        },
      },
    });
  });
  return (
    <section class="h-full overflow-hidden">
      <div class="container px-5 py-12 mx-auto">
        <div class="flex flex-wrap w-full mb-20">
          <StylingTitle title="故事商店" />
          <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">
            {"errorMessage" in homePage.value
              ? "Jidi Culture publishing house"
              : homePage.value.attributes.shopText}
          </p>
        </div>
      </div>
      {/* Slider main container */}
      <div class="shopSwiper swiper container h-[600px]">
        {/* Additional required wrapper */}
        <div class="swiper-wrapper rounded-md h-full">
          {/* Slides */}
          {products.value.map((product) => (
            <div
              class="swiper-slide w-[95%] md:w-[45.4%] lg:w-[30.3%] h-[550px] flex items-center justify-center"
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
