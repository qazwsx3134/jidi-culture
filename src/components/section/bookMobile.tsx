import { component$, useVisibleTask$ } from "@builder.io/qwik";
// import Swiper from "swiper";

// import { EffectCards } from "swiper/modules";
import StylingTitle from "../stylingTitle";

export default component$(() => {
  useVisibleTask$(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const swiper = new Swiper(".bookSwiper", {
    //   effect: "cards",
    //   grabCursor: true,
    //   // configure Swiper to use modules
    //   modules: [EffectCards],
    // });
  });
  return (
    <>
      <div class="container p-2">
        <StylingTitle title="名為基地的書" />
      </div>

      <div class="bookSwiper swiper w-[95vw] h-[90vh] bg-bgGray-500 lg:hidden">
        <div class="swiper-wrapper">
          <div class="swiper-slide mobileBook-image h-[90vh] w-[90vw] rounded-md bg-[url('/images/book-section/1.webp')] bg-contain bg-no-repeat bg-center"></div>

          {/* <div class="swiper-slide mobileBook-image h-[90vh] w-[90vw] rounded-md bg-[url('/images/book-section/2.webp')] bg-contain bg-no-repeat bg-center"></div>

          <div class="swiper-slide mobileBook-image h-[90vh] w-[90vw] rounded-md bg-[url('/images/book-section/3.webp')] bg-contain bg-no-repeat bg-center"></div>

          <div class="swiper-slide mobileBook-image  h-[90vh] w-[90vw] rounded-md bg-[url('/images/book-section/4.webp')] bg-contain bg-no-repeat bg-center"></div> */}
        </div>
      </div>
    </>
  );
});
