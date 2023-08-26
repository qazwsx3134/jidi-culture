import { component$, useVisibleTask$ } from "@builder.io/qwik";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default component$(() => {
  useVisibleTask$(
    () => {
      // initialize Lenis and register it as a global variable
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.normalizeScroll(true);

      // book flip animation
      gsap.set("#bookCover", {
        transformStyle: "preserve-3d",
        perspective: 1024,
        webkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      });

      // 讓頁面翻轉時，頁面的背面不會顯示出來
      gsap.set([".page-3d"], {
        transformStyle: "preserve-3d",
        perspective: 1024,
        webkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      });

      // 提前翻轉頁面，讓頁面翻轉時，頁面成為正面
      gsap.set([".back-page"], {
        rotateY: 180,
      });

      gsap.to(".page-animation", {
        scrollTrigger: {
          trigger: "#bookSection",
          start: "-20% top",
          end: "bottom bottom",
          scrub: 1,
        },
        duration: 1,
        translateX: -5,
        rotationY: 180,
        transformOrigin: "left center",
        ease: "none",
      });
    }
  );
  return (
    <div>
      <div class="text-6xl flex items-center justify-center mb-24">
        基地的故事
      </div>
      <div id="bookContainer" class="w-[1024px] h-[860px]">
        <div
          id="bookCover"
          class="w-full h-full bg-bgRed-500 rounded-lg flex p-8 gap-2"
        >
          <div class="flex-1 flex justify-end relative">
            {/* Empty pages */}
            <div class="w-full h-full text-6xl bg-bgWhite-500 border border-bgRed-700 rounded absolute z-[5] top-0" />
            <div class="w-[99%] h-full text-6xl bg-bgWhite-500 border border-bgRed-700 rounded absolute z-[6] top-0" />
            <div class="w-[98%] h-full text-6xl bg-bgWhite-500 border border-bgRed-700 rounded absolute z-[7] top-0" />
            <div class="w-[97%] h-full text-6xl bg-bgWhite-500 border border-bgRed-700 rounded absolute z-[8] top-0" />

            {/* First page */}
            <div class="w-[96%] h-full text-6xl bg-bgWhite-500 border border-bgRed-700 rounded absolute z-[9] top-0 p-3">
              <div class="w-full h-full bg-[url('/images/book-section/1.webp')] bg-contain bg-no-repeat bg-center rounded" />
            </div>
          </div>
          <div class="flex-1 relative">
            <div class="page-3d page-animation w-[95%] h-full bg-bgWhite-500 rounded relative z-10">
              {/* Second page frontside */}
              <div class="front-page text-6xl absolute w-full h-full bg-bgWhite-500 border border-bgRed-700 rounded z-[2] p-3">
                <div class="w-full h-full bg-[url('/images/book-section/2.webp')] bg-contain bg-no-repeat bg-center rounded" />
              </div>

              {/* Second page backside */}
              <div class="back-page absolute text-6xl w-full h-full bg-bgWhite-500 border border-bgRed-700 rounded z-[1] p-3">
                <div class="w-full h-full bg-[url('/images/book-section/3.webp')] bg-contain bg-no-repeat bg-center rounded" />
              </div>
            </div>

            {/* Third page */}
            <div class="w-[96%] h-full text-6xl  border border-bgRed-700 rounded absolute z-[9] top-0 p-3">
              <div class="w-full h-full bg-[url('/images/book-section/4.webp')] bg-contain bg-no-repeat bg-center rounded" />
            </div>

            {/* Empty pages */}
            <div class="w-[97%] h-full text-6xl bg-bgWhite-500 border border-bgRed-700 rounded absolute z-[8] top-0" />
            <div class="w-[98%] h-full text-6xl bg-bgWhite-500 border border-bgRed-700 rounded absolute z-[7] top-0" />
            <div class="w-[99%] h-full text-6xl bg-bgWhite-500 border border-bgRed-700 rounded absolute z-[6] top-0" />
            <div class="w-full h-full text-6xl bg-bgWhite-500 border border-bgRed-700 rounded absolute z-[5] top-0" />
          </div>
        </div>
      </div>
    </div>
  );
});
