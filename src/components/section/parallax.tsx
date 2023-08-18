import { component$, useVisibleTask$ } from "@builder.io/qwik";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default component$(() => {
  useVisibleTask$(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".text-mask", {
      yPercent: -100,
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top",
        end: "10% top",
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

    gsap.set(".snake-div", {
      scale: 0.5,
      opacity: 0.7,
      transformOrigin: "top center",
    });
    gsap.set(".mountain-div", { scale: 0.5, transformOrigin: "bottom left" });
    gsap.set(".woman-div", {
      scale: 0.7,
      y: -80,
      transformOrigin: "bottom right",
    });
    gsap.set(".butterfly-div", {
      scale: 0.5,
      x: 100,
      y: -200,
      transformOrigin: "center center",
    });

    tl.to(".snake-div", {
      opacity: 1,
      scale: 1,
      y: 30,
      scrollTrigger: {
        trigger: ".wrapper",
        start: "-90 top",
        end: "50% top",
        scrub: 1,
      },
    });
    tl.to(
      ".mountain-div",
      {
        scale: 0.6,
        y: 20,
      },
      "<"
    );

    tl.to(
      ".woman-div",
      {
        scale: 0.8,
        y: 60,
      },
      "<"
    );

    tl.fromTo(
      ".butterfly-div",
      {
        scale: 0.5,
        x: 100,
        y: -200,
      },
      {
        rotation: 270,
        scale: 1.2,
        x: 50,
        y: 300,
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      }
    );
  });
  return (
    <div class="flex-col bg-bgGray-500 sticky top-0 hidden lg:block z-[1]">
      <div class="wrapper w-screen h-[950px] mx-auto my-0 overflow-hidden shadow-2xl relative z-0 aspect-video bg-[url('/images/background.webp')] bg-[size:110%] bg-no-repeat">
        <h1 class="absolute w-full z-10 text-6xl text-center m-0 p-0 top-1/2 -translate-y-1/2 overflow-hidden mix-blend-color-burn">
          <span class="text-mask block font-bold text-red-900">
            歡迎來到Alang edaan 故事部落
          </span>
        </h1>
        {/* background image */}
        <div class="mountain-div w-full h-full absolute origin-center bg-[url('/images/mountain.webp')] bg-no-repeat z-[1] "></div>
        <div class="butterfly-div w-full h-full absolute origin-center bg-[url('/images/butterfly.webp')] bg-no-repeat z-[2] "></div>
        <div class="snake-div w-full h-full absolute origin-center bg-[url('/images/snake.webp')] z-[3] bg-no-repeat "></div>
        <div class="woman-div w-full h-full right-0 absolute origin-center bg-[url('/images/woman.webp')] bg-right bg-no-repeat z-[4] "></div>
      </div>
      <div class="stipples h-[100px] w-full bg-[url('/images/stipples-bg.webp')] bg-contain bg-no-repeat bg-top -mt-1 z-[1]" />
    </div>
  );
});
