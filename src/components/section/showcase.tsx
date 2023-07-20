import { component$ } from "@builder.io/qwik";
import { v4 as uuidv4 } from "uuid";
import { ArrowDownIcon } from "../icon/arrowDown";

const showcaseDimentions = [
  {
    height: 400,
    width: 342,
  },
  {
    height: 242,
    width: 342,
  },
  {
    height: 400,
    width: 283,
  },
  {
    height: 242,
    width: 342,
  },
  {
    height: 287,
    width: 342,
  },
  {
    height: 400,
    width: 240,
  },
  {
    height: 242,
    width: 342,
  },
  {
    height: 234,
    width: 342,
  },
];

const showcaseTopArray = showcaseDimentions
  .slice(0, 4)
  .map((item, outerIndex) => {
    return Array(4)
      .fill(0)
      .map((_, innerIndex) => ({
        id: `${outerIndex + 1}-${innerIndex + 1}`,
        key: `${outerIndex + 1}-${innerIndex + 1}`,
        alt: `${outerIndex + 1}-${innerIndex + 1}`,
        src: `/images/showcase/${outerIndex + 1}/${innerIndex + 1}.webp`,
        height: item.height,
        width: item.width,
      }))
      .reverse();
  });

const showcaseBottomArray = showcaseDimentions
  .slice(4, 8)
  .map((item, outerIndex) => {
    return Array(4)
      .fill(0)
      .map((_, innerIndex) => ({
        id: `${outerIndex + 5}-${innerIndex + 1}`,
        key: `${outerIndex + 5}-${innerIndex + 1}`,
        alt: `${outerIndex + 5}-${innerIndex + 1}`,
        src: `/images/showcase/${outerIndex + 5}/${innerIndex + 1}.webp`,
        height: item.height,
        width: item.width,
      }))
      .reverse();
  });

const showcaseTop = [
  showcaseTopArray[2],
  ...showcaseTopArray,
  ...showcaseTopArray.slice(0, 1),
];

const showCaseBottom = [
  ...showcaseBottomArray,
  ...showcaseBottomArray.slice(0, 1),
];

const imageTranslateClass = [
  "absolute z-[1]",
  "absolute z-[2] group-hover:-translate-y-6 group-hover:-translate-x-3 transition-transform ease-in-out",
  "absolute z-[3] group-hover:-translate-y-10 group-hover:-translate-x-5 transition-transform ease-in-out",
  "absolute z-[4] group-hover:-translate-y-14 group-hover:-translate-x-7 transition-transform ease-in-out",
  "absolute z-[5] group-hover:-translate-y-18 group-hover:-translate-x-9 transition-transform ease-in-out",
];
export default component$(() => {
  return (
    <div class="flex flex-col ">
      <div class="relative z-10 rotate-[30deg] -skew-y-[22deg] translate-y-[200px] flex items-center justify-center text-4xl">
        <div class="animate-bounce flex">
          <ArrowDownIcon />
          <p>點擊下方作品，立即開始您的旅程</p>
          <ArrowDownIcon />
        </div>
      </div>
      <div class="relative z-10 rotate-[30deg] -skew-y-[22deg] translate-y-[200px] ">
        {/* First Row */}
        <div class=" bg-white w-[2600px] h-[400px] bg-[url('/images/showcase/showcase-bg-blue.png')] bg-contain rounded-lg shadow-lg -translate-x-[400px] mb-32 flex">
          {showcaseTop.map((item) => (
            <div key={uuidv4()} class="h-full w-[342px] cursor-pointer">
              <div class="relative w-full h-full flex justify-end items-center group hover:animate-simplePulse">
                {item.map((innerItem, innerIndex) => (
                  <div
                    key={innerItem.key}
                    class={imageTranslateClass[innerIndex]}
                  >
                    <img
                      class="rounded-lg shadow-md max-w-[300px]"
                      src={innerItem.src}
                      alt={innerItem.alt}
                      height={innerItem.height}
                      width={innerItem.width}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Second Row */}
        <div class=" bg-white w-[2600px] h-[400px] bg-[url('/images/showcase/showcase-bg.png')] flex bg-contain rounded-lg shadow-lg translate-x-[100px]">
          {showCaseBottom.map((item) => (
            <div key={uuidv4()} class="h-full w-[342px] cursor-pointer">
              <div class="relative w-full h-full flex justify-end items-center group hover:animate-simplePulse">
                {item.map((innerItem, innerIndex) => (
                  <div
                    key={innerItem.key}
                    class={imageTranslateClass[innerIndex]}
                  >
                    <img
                      class="rounded-lg shadow-md max-w-[300px]"
                      src={innerItem.src}
                      alt={innerItem.alt}
                      height={innerItem.height}
                      width={innerItem.width}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
