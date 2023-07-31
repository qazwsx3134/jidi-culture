import { component$ } from "@builder.io/qwik";
import Card from "../team/card";

export default component$(() => {
  return (
    <div class="flex flex-col">
      <div class="text-6xl flex items-center justify-center text-bgWhite-500 mb-12 my-24">
        基地夥伴
      </div>
      <div class="flex flex-col px-4 md:flex-row md:max-w-[1080px] md:mx-auto w-full mt-24">
        {/* Left */}
        <div class="flex flex-1 flex-col items-center justify-start gap-6 md:gap-32">
          <Card
            image={{
              src: "/images/team-card/1.webp",
              alt: "柯哲瑜",
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

          <Card
            image={{
              src: "/images/team-card/3.webp",
              alt: "林俊儒",
              width: 400,
              height: 400,
            }}
            name={"林俊儒"}
            title={"政大法學博士候選人"}
            badges={["執業律師", "原住民族司法研究"]}
            experience={["法律倡議工作者", "點亮教育創辦人"]}
          />
        </div>
        {/* Right */}
        <div class="flex flex-1 flex-col items-center justify-start gap-6 md:gap-32 my-6 md:my-48">
          <Card
            image={{
              src: "/images/team-card/2.webp",
              alt: "Shoes",
              width: 400,
              height: 400,
            }}
            name={"黃楚甯"}
            title={"政大民族所碩士生"}
            badges={["藝術家", "原住民美學"]}
            experience={["原住民美學研究領域", "美術教育工作者"]}
          />

          <Card
            image={{
              src: "/images/team-card/4.webp",
              alt: "Shoes",
              width: 400,
              height: 400,
            }}
            name={"郭劉承昊"}
            title={"政大歷史系學士"}
            badges={["太魯閣族文史研究者"]}
            experience={["太魯閣族文史研究者", "慶豐sdagan部落太魯閣族人"]}
          />
        </div>
      </div>
    </div>
  );
});
