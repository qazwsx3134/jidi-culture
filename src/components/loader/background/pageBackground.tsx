import { component$, type Signal, Slot, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

import gsap from "gsap";

import WindAnimation from "../windAnimation";

interface Props {
  onDone?: Signal<boolean>;
}

export default component$<Props>((props) => {
  useTask$(({ track }) => {
    track(() => props.onDone?.value);

    if (isServer) {
      return;
    }

    if (props.onDone?.value) {
      const loaderTimeline = gsap.timeline();

      loaderTimeline.to("#icon", {
        scale: 0,
        duration: 0.2,
      });

      loaderTimeline.to(
        ".blinder",
        {
          duration: 0.6,
          scaleX: 0,
          ease: "power4.inOut",
          transformOrigin: "right",
        },
        "<"
      );

      loaderTimeline.to(
        ".blinderBG",
        {
          duration: 0.6,
          scaleX: 0,
          ease: "power4.in",
          transformOrigin: "right",
        },
        "<"
      );

      loaderTimeline.to("#loaderLayer", {
        display: "none",
      });
      // Remove the loader from the DOM
      loaderTimeline.call(() => {
        const loader = document.getElementById("loaderLayer");
        if (loader) {
          loader.remove();
          gsap.killTweensOf([
            "#icon",
            "#leaf1",
            "#leaf2",
            "#leaf3",
            "leaf4",
            "leaf5",
          ]);
        }
      });
    }
  });

  return (
    <div
      id="loaderLayer"
      class="loader min-h-screen h-full w-full fixed top-0 z-50 flex overflow-hidden "
    >
      <div class="absolute top-0 w-full flex items-center justify-center z-10">
        <WindAnimation />
      </div>

      <div class="binderContainer absolute top-0 w-full flex">
        <div class="flex blinderBG bg-bgGray-700 h-screen grow w-full absolute "></div>
        <div class="flex blinder bg-bgGray-500 h-screen grow w-full absolute "></div>
      </div>
      <div
        id="icon"
        class=" top-1/2 left-1/2 z-0 absolute -translate-x-1/2 -translate-y-1/2"
      >
        <Slot name="icon" />
      </div>
    </div>
  );
});
