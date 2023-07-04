import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default component$(() => {
  useVisibleTask$(() => {
    // initialize Lenis and register it as a global variable
    const lenis = new Lenis();
    window.lenis = lenis;

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

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
    <div class="flex flex-col h-[600vh] ">
      <div class="wrapper w-screen h-[950px] mx-auto my-0 overflow-hidden shadow-2xl relative z-0 aspect-video bg-[url('/images/background.webp')] bg-[size:110%] bg-no-repeat">
        <h1 class="absolute w-full z-10 text-6xl text-center m-0 p-0 top-1/2 -translate-y-1/2 overflow-hidden mix-blend-color-burn">
          <span class="text-mask block font-bold text-red-900">用故事傳承</span>
        </h1>
        {/* background image */}
        <div class="mountain-div w-full h-full absolute origin-center bg-[url('/images/mountain.webp')] bg-no-repeat z-[1] "></div>
        <div class="butterfly-div w-full h-full absolute origin-center bg-[url('/images/butterfly.webp')] bg-no-repeat z-[2] "></div>
        <div class="snake-div w-full h-full absolute origin-center bg-[url('/images/snake.webp')] z-[3] bg-no-repeat "></div>
        <div class="woman-div w-full h-full right-0 absolute origin-center bg-[url('/images/woman.webp')] bg-right bg-no-repeat z-[4] "></div>
      </div>
      <div class="stipples h-[100px] w-full bg-[url('/images/stipples.webp')] bg-cover bg-no-repeat -mt-1 z-[1] opacity-60" />
    </div>
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
