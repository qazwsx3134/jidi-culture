import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Hero from "~/components/section/hero";
import Parallax from "~/components/section/parallax";

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
  });
  return (
    <>
      <div class=" bg-bgGray-500">
        <Parallax />
        <Hero />
      </div>
      <div class="bg-bgWhite-500 flex items-center justify-center py-8">
        <div class="bg-secondary w-[1280px] h-[1080px] rounded-lg shadow-2xl flex p-8 gap-2">
          <div class="bg-bgWhite-500 flex-1 rounded"></div>
          <div class="bg-bgWhite-500 flex-1 rounded"></div>
        </div>
      </div>
      <div class="bg-bgGray-500 h-[100vh]"></div>
    </>
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
