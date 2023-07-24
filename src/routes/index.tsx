import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import PageBackground from "~/components/loader/background/pageBackground";
import GrayBGCurveUp from "~/components/curveDivider/grayBGCurveUp";
import RedBGCurveDown from "~/components/curveDivider/redBGCurveDown";
import WhiteBGCurveDown from "~/components/curveDivider/whiteBGCurveDown";
import WhiteBGCurveUp from "~/components/curveDivider/whiteBGCurveUp";
import Book from "~/components/section/book";
import Hero from "~/components/section/hero";
import Parallax from "~/components/section/parallax";
import Showcase from "~/components/section/showcase";
import Team from "~/components/section/team";
import imagesLoaded from "imagesloaded";

export default component$(() => {
  const onDone = useSignal(false);
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

    const imgLoad = imagesLoaded("#bodyContainer", { background: true });


    imgLoad.on("always", function () {
      // onDone.value = true;
      // window.lenis.scrollTo(0, 0);
    });

  });
  return (
    <div id="bodyContainer">
      <PageBackground onDone={onDone}>
        <img
          q:slot="icon"
          src="/images/jidi-logo-blob.webp"
          alt=""
          width={200}
          class="w-[200px] aspect-square z-1"
        />
      </PageBackground>
      <div class=" bg-bgGray-500 w-screen">
        <Parallax />
        <Hero />
      </div>
      <GrayBGCurveUp bgColor="bg-bgWhite-500" />
      <div
        id="bookSection"
        class="bg-bgGray-500 flex items-center justify-center py-20 w-full"
      >
        <Book />
      </div>
      <WhiteBGCurveUp bgColor="bg-bgGray-500" />
      <div id="showCaseSection" class="bg-bgWhite-500 h-[1200px] my-20">
        <Showcase />
      </div>
      <WhiteBGCurveDown bgColor="bg-bgRed-500" />
      <div id="teamSection" class="bg-bgRed-500 h-full">
        <Team />
      </div>
      <RedBGCurveDown bgColor="bg-bgGray-500" />
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
