import { component$ } from "@builder.io/qwik";

const showCase = [
  {
    id: 1,
    key: "showcase1-1",
    alt: "showcase1-1",
    src: "/images/showcase/showcase1-1.webp",
    height: 353,
    width: 250,
  },
  {
    id: 2,
    key: "showcase1-2",
    alt: "showcase1-2",
    src: "/images/showcase/showcase1-1.webp",
    height: 353,
    width: 250,
  },
  {
    id: 3,
    key: "showcase1-3",
    alt: "showcase1-3",
    src: "/images/showcase/showcase1-1.webp",
    height: 353,
    width: 250,
  },
  {
    id: 4,
    key: "showcase1-4",
    alt: "showcase1-4",
    src: "/images/showcase/showcase1-1.webp",
    height: 353,
    width: 250,
  },
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
      <div class="relative z-10 rotate-[30deg] -skew-y-[22deg] translate-y-[200px]">
        <div class=" bg-white w-[2600px] h-[400px] bg-[url('/images/showcase/showcase-bg.png')] bg-contain rounded-lg shadow-lg -translate-x-[400px] mb-32">
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
        <div class=" bg-white w-[2600px] h-[400px] bg-[url('/images/showcase/showcase-bg.png')] flex bg-contain rounded-lg shadow-lg translate-x-[100px]">
          <div class="h-full w-[342px]">
            <div class="relative w-full h-full flex justify-center items-center group">
              {showCase.map((item, index) => {
                return (
                  <div key={item.key} class={imageTranslateClass[index]}>
                    <img
                      class="rounded-lg shadow-md max-w-[340px]"
                      src={item.src}
                      alt={item.alt}
                      height={item.height}
                      width={item.width}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
