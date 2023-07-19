import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import GrayBGCurveUp from "~/components/curveDivider/grayBGCurveUp";
import RedBGCurveDown from "~/components/curveDivider/redBGCurveDown";
import WhiteBGCurveDown from "~/components/curveDivider/whiteBGCurveDown";
import WhiteBGCurveUp from "~/components/curveDivider/whiteBGCurveUp";
import Hero from "~/components/section/hero";
import Parallax from "~/components/section/parallax";
import Showcase from "~/components/section/showcase";

export default component$(() => {
  useVisibleTask$(() => {
    // initialize Lenis and register it as a global variable
    const lenis = new Lenis({
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
    });
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

    // book flip animation
    gsap.set("#bookCover", {
      perspective: 800,
    });

    gsap.set([".page-3d"], {
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
    });

    gsap.set([".back-page"], {
      rotateY: 180,
    });

    gsap.to(".page-animation", {
      scrollTrigger: {
        trigger: "#bookSection",
        start: "top top",
        end: "bottom bottom",
      },
      translateX: -5,
      rotationY: 180,
      transformOrigin: "left center",
      ease: "none",
    });
  });
  return (
    <>
      <div class=" bg-bgGray-500">
        <Parallax />
        <Hero />
      </div>
      <GrayBGCurveUp bgColor="bg-bgWhite-500" />
      <div
        id="bookSection"
        class="bg-bgGray-500 flex items-center justify-center py-20"
      >
        <div id="bookContainer" class="w-[1280px] h-[1080px]">
          <div
            id="bookCover"
            class="w-full h-full bg-secondary rounded-lg shadow-2xl flex p-8 gap-2"
          >
            <div class="page bg-bgWhite-500 flex-1 rounded">
              <div class="text-9xl">Hello</div>
            </div>
            <div class="flex-1 relative">
              <div class="page-3d page-animation  w-full h-full bg-slate-500 rounded relative z-10">
                <div class="page front-page text-6xl absolute w-full h-full bg-red-400 z-[2]">
                  Front
                </div>
                <div class="page back-page absolute text-6xl w-full h-full bg-yellow-400 z-[1]">
                  Back
                </div>
              </div>
              <div class=" w-full h-full text-6xl bg-slate-500 rounded absolute z-0 top-0">
                Last Page
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhiteBGCurveUp bgColor="bg-bgGray-500" />
      <div id="showCaseSection" class="bg-bgWhite-500 h-[1200px] my-20">
        <Showcase />
      </div>
      <WhiteBGCurveDown bgColor="bg-bgRed-500" />
      <div id="teamSection" class="bg-bgRed-500 h-[1200px]"></div>
      <RedBGCurveDown bgColor="bg-bgGray-500" />
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
