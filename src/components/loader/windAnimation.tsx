import { component$, useVisibleTask$ } from "@builder.io/qwik";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import { FallenLeaf } from "./leafIcon";
import { WindSvg } from "./windSvg";

export default component$(() => {
  useVisibleTask$(() => {
    // useMotionPath
    gsap.registerPlugin(MotionPathPlugin);

    const leafTL = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });

    gsap.to("#icon", {
      rotate: 45,
      delay: 0.5,
      duration: 1.5,
      yoyo: true,
      ease: "power1.inOut",
      repeat: -1,
      transformOrigin: "bottom right",
    });

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
  return (
    <>
      <FallenLeaf id="leaf1" class="text-4xl invisible" />
      <FallenLeaf id="leaf2" class="text-4xl invisible" />
      <FallenLeaf id="leaf3" class="text-4xl invisible" />
      <FallenLeaf id="leaf4" class="text-4xl invisible" />
      <FallenLeaf id="leaf5" class="text-4xl invisible" />
      <WindSvg />
    </>
  );
});
