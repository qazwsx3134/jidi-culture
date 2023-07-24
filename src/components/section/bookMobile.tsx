import { component$, useVisibleTask$ } from "@builder.io/qwik";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default component$(() => {
  useVisibleTask$(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".mobileBook-image").forEach((image) => {
      const target = image as gsap.DOMTarget;
      gsap.fromTo(
        target,
        {
          opacity: 0,
          yPercent: -2,
        },
        {
          opacity: 1,
          yPercent: 0,
          ease: "power1.inOut",
          duration: 0.8,
          scrollTrigger: {
            trigger: target,
            start: "top 20%",
            end: "bottom bottom",
          },
        }
      );
    });

    gsap.utils.toArray(".mobileBook-divider").forEach((divider) => {
      const target = divider as gsap.DOMTarget;
      gsap.fromTo(
        target,
        {
          opacity: 0,
          yPercent: -5,
        },
        {
          opacity: 1,
          yPercent: 0,
          ease: "power1.inOut",
          duration: 0.8,
          scrollTrigger: {
            trigger: target,
            start: "top 20%",
            end: "bottom bottom",
          },
        }
      );
    });
  });
  return (
    <div class="w-full h-[360vh] flex flex-col bg-bgGray-500 rounded-md lg:hidden">
      <div class="mobileBook-image flex-1  bg-[url('/images/book-section/1.webp')] bg-contain bg-no-repeat bg-center"></div>
      <div class="mobileBook-divider divider font-serif">Every</div>
      <div class="mobileBook-image flex-1  bg-[url('/images/book-section/2.webp')] bg-contain bg-no-repeat bg-center"></div>
      <div class="mobileBook-divider divider font-serif">Masterpiece</div>
      <div class="mobileBook-image flex-1  bg-[url('/images/book-section/3.webp')] bg-contain bg-no-repeat bg-center"></div>
      <div class="mobileBook-divider divider font-serif">Come from heart</div>
      <div class="mobileBook-image flex-1  bg-[url('/images/book-section/4.webp')] bg-contain bg-no-repeat bg-center"></div>
    </div>
  );
});
