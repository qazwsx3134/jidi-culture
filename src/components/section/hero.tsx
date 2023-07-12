import { component$, useVisibleTask$ } from "@builder.io/qwik";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default component$(() => {
  useVisibleTask$(() => {
    // initialize Lenis and register it as a global variable

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ["#s2Text", "#s2Blob"],
      {
        yPercent: -100,
      },
      {
        yPercent: 60,
        scrollTrigger: {
          trigger: "#s2Wrapper",
          scrub: true,
          start: "-100% top",
          end: "200% bottom",
        },
      }
    );

    gsap.fromTo(
      [".text-Title", ".text-subTitle", ".text-content"],
      {
        yPercent: -100,
      },
      {
        yPercent: 0,
        scrollTrigger: {
          trigger: "#s2Wrapper",
          start: "-30% top",
          end: "bottom bottom",
        },
      }
    );
  });
  return (
    <div class="flex flex-col mb-10">
      <div id="s2Wrapper" class="relative overflow-hidden">
        <img
          src="/images/section2-bg.webp"
          alt=""
          height={950}
          class="relative z-0 aspect-video w-full h-[950px]"
        />
        <div
          id="s2Blob"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] mix-blend-color h-full flex justify-center z-[0]"
        >
          <img
            src="/images/section2-blob.webp"
            alt=""
            height={1120}
            width={1024}
            class="absolute top-0 w-[900px]"
          />
        </div>
        <div
          id="s2Text"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-full flex justify-center z-[1] text-black"
        >
          <div class="absolute top-0 h-[830px] w-[900px] flex flex-col items-center text-center text-bgWhite-500 py-12 gap-10">
            <div class="overflow-hidden my-12">
              <h2 class="text-6xl text-Title">基地</h2>
            </div>

            <div class="overflow-hidden my-2">
              <h3 class="text-4xl text-subTitle">
                為了讓更多族群議題能夠在台灣社會發酵
              </h3>
            </div>

            <div class="overflow-hidden my-2">
              <h4 class="text-2xl text-bgWhite-600 text-content">
                <p>透過藝術創作</p>
                <p>我們得以與不同的學術社群及原住民族社區合作</p>
                <p>走在這條祖靈看守的道路上</p>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});