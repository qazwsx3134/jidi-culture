import { component$, useVisibleTask$ } from "@builder.io/qwik";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default component$(() => {
  useVisibleTask$(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.normalizeScroll(true);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 800px)", () => {
      // desktop setup code here...
      gsap.from(".text-mask", {
        yPercent: -100,
        scrollTrigger: {
          trigger: ".wrapper",
          start: "0 top",
          end: "15% top",
          scrub: 1,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      });
      tl.to(".parallax-bg", {
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top",
          end: "450 top",
          scrub: 1,
        },
      });

      tl.to(
        ".right-div",
        {
          x: "50%",
          y: "50%",
          scale: 1.8,
          scrollTrigger: {
            trigger: ".wrapper",
            start: "top top",
            end: "350 top",
            scrub: 1,
          },
        },
        "<"
      );

      tl.to(".left-div", {
        scale: 1.8,
        x: "-50%",
        y: "50%",
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top",
          end: "350 top",
          scrub: 1,
        },
      });

      tl.to(
        ".up-div",
        {
          scale: 0.3,
          x: "-50%",
          y: "-50%",
          scrollTrigger: {
            trigger: ".wrapper",
            start: "top top",
            end: "350 top",
            scrub: 1,
          },
        },
        "<"
      );

      tl.to(".rightUp-div", {
        scale: 0.3,
        x: "50%",
        y: "-20%",
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top",
          end: "350 top",
          scrub: 1,
        },
      });
    });
  });
  return (
    <div class="flex-col bg-bgGray-500 sticky top-0 z-[1]">
      <div class="parallax-bg hidden md:block wrapper w-full h-[950px] mx-auto my-0 overflow-hidden shadow-2xl relative z-0 aspect-video bg-[url('/images/parallax/background.webp')] bg-no-repeat bg-cover bg-top md:bg-center">
        <h1 class="absolute w-full text-4xl md:text-6xl m-0 p-0 translate-y-[400px] md:top-1/2 md:-translate-y-1/2 overflow-hidden z-[3]">
          <div class="text-mask flex flex-col md:flex-row font-bold text-red-900 items-center justify-center">
            <span>歡迎來到</span>
            <span>Alang edaan</span>
            <span>故事部落</span>
          </div>
        </h1>
        {/* background image */}
        <div class="rightUp-div  w-full h-full absolute origin-center bg-[url('/images/parallax/rightUp.webp')] bg-no-repeat z-[2] bg-contain bg-[center_top_300px] md:bg-center"></div>
        <div class="up-div w-full h-full absolute origin-center bg-[url('/images/parallax/up.webp')] bg-no-repeat z-[3] bg-contain bg-[center_top_300px] md:bg-center"></div>
        <div class="left-div w-full h-full absolute origin-center bg-[url('/images/parallax/left.webp')] z-[4] bg-no-repeat bg-contain bg-[center_top_300px] md:bg-center"></div>
        <div class="right-div w-full h-full absolute origin-center bg-[url('/images/parallax/right.webp')] bg-no-repeat z-[5] bg-contain bg-[center_top_300px] md:bg-center"></div>
      </div>
      <div class="parallax-bg md:hidden wrapper w-full h-[950px] mx-auto my-0 overflow-hidden shadow-2xl relative z-0 aspect-video bg-[url('/images/parallax/mobile-parallax.webp')] bg-no-repeat bg-cover bg-top md:bg-center">
        <h1 class="absolute w-full text-4xl md:text-6xl m-0 p-0 translate-y-[200px] md:top-1/2 md:-translate-y-1/2 overflow-hidden z-[3]">
          <div class="flex flex-col md:flex-row font-bold text-red-900 items-center justify-center">
            <span>歡迎來到</span>
            <span>Alang edaan</span>
            <span>故事部落</span>
          </div>
        </h1>
      </div>
    </div>
  );
});
