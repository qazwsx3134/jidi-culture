import { component$, useVisibleTask$ } from "@builder.io/qwik";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";

import { WindSvgLg } from "./windSvgLg";
import { WindSvgSmall } from "./windSvgSmall";

export default component$(() => {
  useVisibleTask$(() => {
    // useMotionPath
    gsap.registerPlugin(MotionPathPlugin);

    const matchMedia = gsap.matchMedia();
    const leafTL = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });

    // Mobile
    matchMedia.add("(max-width: 767px)", () => {
      leafTL.to("#leaf1", {
        rotate: 360,
        visibility: "visible",
        duration: 2,
        opacity: 0,
        ease: "power1.inOut",
        motionPath: {
          path: "#wind-sm-1",
          align: "#wind-sm-1",
          alignOrigin: [0.5, 0.5],
        },
      });
      leafTL.to(
        "#leaf2",
        {
          rotate: 360,
          visibility: "visible",
          duration: 2,
          opacity: 0,
          ease: "power1.inOut",
          motionPath: {
            path: "#wind-sm-2",
            align: "#wind-sm-2",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
        },
        "<0.4"
      );
      leafTL.to(
        "#leaf3",
        {
          rotate: 360,
          visibility: "visible",
          duration: 2,
          opacity: 0,
          ease: "power1.inOut",
          motionPath: {
            path: "#wind-sm-3",
            align: "#wind-sm-3",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
        },
        "<0.3"
      );
      leafTL.to(
        "#leaf4",
        {
          rotate: 360,
          visibility: "visible",
          duration: 2,
          opacity: 0,
          ease: "power1.inOut",
          motionPath: {
            path: "#wind-sm-4",
            align: "#wind-sm-4",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
        },
        "<0.2"
      );
      leafTL.to(
        "#leaf5",
        {
          rotate: 360,
          visibility: "visible",
          duration: 2,
          opacity: 0,
          ease: "power1.inOut",
          motionPath: {
            path: "#wind-sm-5",
            align: "#wind-sm-5",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
        },
        "<0.1"
      );
    });
    // Big Screen
    matchMedia.add("(min-width: 768px)", () => {
      leafTL.to("#leaf1", {
        rotate: 360,
        visibility: "visible",
        duration: 2,
        opacity: 0,
        ease: "power1.inOut",
        motionPath: {
          path: "#wind1",
          align: "#wind1",
          alignOrigin: [0.5, 0.5],
        },
      });
      leafTL.to(
        "#leaf2",
        {
          rotate: 360,
          visibility: "visible",
          duration: 2,
          opacity: 0,
          ease: "power1.inOut",
          motionPath: {
            path: "#wind2",
            align: "#wind2",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
        },
        "<0.4"
      );
      leafTL.to(
        "#leaf3",
        {
          rotate: 360,
          visibility: "visible",
          duration: 2,
          opacity: 0,
          ease: "power1.inOut",
          motionPath: {
            path: "#wind3",
            align: "#wind3",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
        },
        "<0.3"
      );
      leafTL.to(
        "#leaf4",
        {
          rotate: 360,
          visibility: "visible",
          duration: 2,
          opacity: 0,
          ease: "power1.inOut",
          motionPath: {
            path: "#wind4",
            align: "#wind4",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
        },
        "<0.2"
      );
      leafTL.to(
        "#leaf5",
        {
          rotate: 360,
          visibility: "visible",
          duration: 2,
          opacity: 0,
          ease: "power1.inOut",
          motionPath: {
            path: "#wind5",
            align: "#wind5",
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
        },
        "<0.1"
      );
    });
  });
  return (
    <>
      <img
        id="leaf1"
        src="/images/leaf.webp"
        alt=""
        class="invisible"
        width={80}
        height={60}
        loading="lazy"
      />
      <img
        id="leaf2"
        src="/images/leaf.webp"
        alt=""
        class="invisible"
        width={80}
        height={60}
        loading="lazy"
      />
      <img
        id="leaf3"
        src="/images/leaf.webp"
        alt=""
        class="invisible"
        width={80}
        height={60}
        loading="lazy"
      />
      <img
        id="leaf4"
        src="/images/leaf.webp"
        alt=""
        class="invisible"
        width={80}
        height={60}
        loading="lazy"
      />
      <img
        id="leaf5"
        src="/images/leaf.webp"
        alt=""
        class="invisible"
        width={80}
        height={60}
        loading="lazy"
      />

      <WindSvgLg class="absolute top-0 h-[100vh] hidden md:block" />
      <WindSvgSmall class="absolute top-0 h-[100vh] md:hidden" />
    </>
  );
});
