import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import PageBackground from "~/components/loader/background/pageBackground";
import GrayBGCurveUp from "~/components/curveDivider/grayBGCurveUp";
import RedBGCurveDown from "~/components/curveDivider/redBGCurveDown";
import RedBGCurveUp from "~/components/curveDivider/redBGCurveUp";
import WhiteBGCurveUp from "~/components/curveDivider/whiteBGCurveUp";
import Book from "~/components/section/book";
import Hero from "~/components/section/hero";
import Parallax from "~/components/section/parallax";
import Showcase from "~/components/section/showcase";
import Team from "~/components/section/team";
import imagesLoaded from "imagesloaded";
import BookMobile from "~/components/section/bookMobile";

import { api } from "~/api";

import FrontPageCarousel from "~/components/section/carousel/frontPageCarousel";

import type { HomePageAPI } from "~/api/type";

export const useHomePage = routeLoader$(async ({ env, fail }) => {
  const res = await api<HomePageAPI>(
    `${env.get(
      "API_URL"
    )}/api/home-page?populate[0]=seo&populate[1]=seo.metaSocial.image&populate[2]=seo.metaImage`,
    {
      method: "GET",
      headers: {
        Authorization: `bearer ${env.get("PRODUCTION_TOKEN")}`,
      },
    }
  ).catch((error: any) => {
    return {
      error: error,
      status: error?.response?.data?.error?.status,
      name: error?.response?.data?.error?.name,
      errorMessage: error?.response?.data?.error?.message,
    };
  });
  if ("error" in res) {
    return fail(404, {
      errorMessage: res.error.message,
    });
  }

  // return the data (which may be null)
  return res.data;
});

export default component$(() => {
  const onDone = useSignal(false);

  useVisibleTask$(() => {
    window.scrollTo(0, 0);

    // initialize Lenis and register it as a global variable
    const lenis = new Lenis({
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
      smoothTouch: true,
    });
    window.lenis = lenis;

    // function raf(time: any) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }

    // requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    window.gsap = gsap;

    const imgLoad = imagesLoaded("#imagesLoadedContainer");

    const start = Date.now();
    imgLoad.on("always", function () {
      const end = Date.now();
      const duration = end - start;
      const delay = duration < 1500 ? 1500 - duration : 0;
      setTimeout(() => {
        onDone.value = true;
      }, delay);
    });
  });
  return (
    <div id="bodyContainer" class="">
      <PageBackground onDone={onDone}>
        <img
          q:slot="icon"
          src="/images/jidiLogo.webp"
          alt=""
          width={200}
          height={200}
          class="w-[200px] aspect-square z-1 bg-white mask mask-squircle animate-wiggle"
          loading="eager"
        />
      </PageBackground>
      <div id="imagesLoadedContainer" class=" bg-black w-screen">
        <Parallax />
        <Hero />
      </div>
      <GrayBGCurveUp bgColor="bg-bgWhite-500" />
      <div
        id="bookSection"
        class="bg-bgGray-500 py-20 w-full hidden lg:flex items-center justify-center"
      >
        <Book />
      </div>
      <div id="bookSectionMobile" class="block bg-bgGray-500 py-24 lg:hidden">
        <BookMobile />
      </div>
      <WhiteBGCurveUp bgColor="bg-bgGray-500" />
      <div id="shopSection" class="bg-bgWhite-500 h-full my-20">
        <FrontPageCarousel />
      </div>
      <div id="showCaseSection" class="bg-bgWhite-500 h-full my-20">
        <Showcase />
      </div>
      <RedBGCurveUp bgColor="bg-bgWhite-500" />
      <div id="teamSection" class="bg-bgRed-500 h-full">
        <Team />
      </div>
      <RedBGCurveDown bgColor="bg-bgGray-500" />
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const homePage = resolveValue(useHomePage);
  if ("errorMessage" in homePage || !homePage.attributes.seo) {
    return {
      title: "基地文化",
      meta: [
        {
          name: "description",
          content: "基地文化",
        },
        // Open graph
        {
          property: "og:title",
          content: "基地文化",
        },
        {
          property: "og:description",
          content: "基地文化",
        },
      ],
      links: [
        {
          rel: "canonical",
          href: "https://jidiculture.com/",
        },
      ],
    };
  }

  const { metaTitle, metaDescription, metaRobots, keywords, metaImage } =
    homePage.attributes.seo;

  return {
    title: metaTitle,
    meta: [
      {
        name: "description",
        content: metaDescription,
      },
      {
        name: "robots",
        content: metaRobots,
      },
      {
        name: "keywords",
        content: keywords,
      },
      // Open graph
      {
        property: "og:title",
        content: metaTitle,
      },
      {
        property: "og:description",
        content: metaDescription,
      },
      {
        property: "og:image",
        content: metaImage?.data?.attributes.url,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://jidiculture.com/",
      },
    ],
  };
};
