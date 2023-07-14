import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import WhiteBGCurveUp from "~/components/curveDivider/whiteBGCurveUp";
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
      <div class="bg-bgGray-500 flex items-center justify-center py-8">
        <div class="bg-secondary w-[1280px] h-[1080px] rounded-lg shadow-2xl flex p-8 gap-2">
          <div class="bg-bgWhite-500 flex-1 rounded"></div>
          <div class="bg-bgWhite-500 flex-1 rounded"></div>
        </div>
      </div>
      <WhiteBGCurveUp bgColor="bg-bgGray-500" />
      <div class="bg-bgWhite-500 h-[200vh] flex flex-col">
        <div class="relative rotate-[30deg] -skew-y-[22deg] translate-y-[200px] z-10">
          <div class=" bg-white w-[140%] h-[400px] bg-[url('/images/showcase/showcase-bg.png')] bg-contain rounded-lg shadow-lg -translate-x-[400px] mb-32">
            <div class="h-full w-[385px] flex justify-center items-center">
              <div class="">
                <img
                  src="/images/showcase/showcase1-1.webp"
                  alt=""
                  height={353}
                  width={250}
                />
              </div>
            </div>
          </div>
          <div class=" bg-white w-[140vw] h-[400px] bg-[url('/images/showcase/showcase-bg.png')] bg-contain rounded-lg shadow-lg translate-x-[100px]">
            <div class="h-full w-[385px]">
              <div class="relative w-full h-full flex justify-center items-center group">
                <div class="absolute z-[1]">
                  <img
                    src="/images/showcase/showcase1-1.webp"
                    alt=""
                    height={353}
                    width={250}
                  />
                </div>

                <div class="absolute z-[2] group-hover:-translate-y-6 group-hover:-translate-x-3 transition-transform ease-in-out">
                  <img
                    src="/images/showcase/showcase1-1.webp"
                    alt=""
                    height={353}
                    width={250}
                  />
                </div>

                <div class="absolute z-[3] group-hover:-translate-y-10 group-hover:-translate-x-5 transition-transform ease-in-out">
                  <img
                    src="/images/showcase/showcase1-1.webp"
                    alt=""
                    height={353}
                    width={250}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
