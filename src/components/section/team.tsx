import { component$ } from "@builder.io/qwik";
import Card from "../team/card";

export default component$(() => {
  return (
    <div class="flex flex-col">
      <div class="text-6xl flex items-center justify-center text-bgWhite-500 mb-12 my-24">
        基地夥伴
      </div>
      <div class="flex mx-auto max-w-[1080px] w-full mt-24">
        {/* Left */}
        <div class="flex flex-1 flex-col items-center justify-start gap-32">
          <Card
            image={{
              src: "/images/showcase/1/1.webp",
              alt: "Shoes",
              width: 400,
              height: 400,
            }}
            name={"柯哲瑜"}
            title={"政大民族所博士生"}
            badges={["音樂人", "原住民健康研究"]}
            experience={[
              "百合綻放新制學程第一屆學員",
              "原住民族健康法倡議經驗",
            ]}
          />
        </div>
        {/* Right */}
        <div class="flex flex-1 flex-col items-center justify-start gap-32 my-48">
          <Card
            image={{
              src: "/images/showcase/1/1.webp",
              alt: "Shoes",
              width: 400,
              height: 400,
            }}
            name={"柯哲瑜"}
            title={"政大民族所博士生"}
            badges={["音樂人", "原住民健康研究"]}
            experience={[
              "百合綻放新制學程第一屆學員",
              "原住民族健康法倡議經驗",
            ]}
          />
        </div>
      </div>
    </div>
  );
});
