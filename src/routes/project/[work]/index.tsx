import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import LeftSection from "~/components/project/leftSection";
import { showcaseData } from "~/static/showcaseData";

export const useWorkLoader = routeLoader$(async ({ params, status }) => {
  const workName = params.work;
  console.log("workName", workName);
  const work = Object.keys(showcaseData).find((work) => work === workName);
  console.log("work0", work);
  if (!work) {
    status(404);
    return null;
  }

  return showcaseData[work];
});

export default component$(() => {
  const navigate = useNavigate();
  const work = useWorkLoader();

  useVisibleTask$(() => {
    // in the Client side if the work is not found, navigate to the home page
    if (!work.value) {
      navigate("/");
    }
    console.log("work", work.value);
  });

  return (
    <div class="w-full font-sans bg-bgWhite-500">
      <div class="w-full flex flex-col items-center justify-center gap-4 p-12">
        <h1 class="text-6xl tracking-widest font-bold my-6">
          {work.value?.title}
        </h1>
        <h2 class="text-4xl font-light my-2">{work.value?.subTitle}</h2>
      </div>
      <div
        class="hero w-screen max-h-[800px] h-[800px] "
        style={`background-image: url(${work.value?.heroImage.src});`}
      ></div>

      <div class="m-auto max-w-[1280px] flex p-4 pt-12">
        <div class="flex flex-col flex-1 gap-10">
          <div>
            <div class="text-2xl font-bold mb-4">專案類型</div>
            <div class="flex flex-wrap gap-4">
              {work.value?.projectType.map((type) => (
                <div
                  class="badge badge-lg badge-primary badge-outline"
                  key={type}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>

          <LeftSection title="美術設計">
            <div q:slot="children">{work.value?.visualDesigner}</div>
          </LeftSection>

          <LeftSection title="計畫企劃">
            <div q:slot="children">{work.value?.projectManagement}</div>
          </LeftSection>

          <LeftSection title="指導單位">
            <div q:slot="children">{work.value?.guidanceUnit}</div>
          </LeftSection>

          <LeftSection title="主辦單位">
            <div q:slot="children">{work.value?.hostUnit}</div>
          </LeftSection>

          <LeftSection title="合作單位">
            <div q:slot="children">{work.value?.cooperationUnit}</div>
          </LeftSection>
        </div>
        <div class="flex flex-col flex-[2]">
          <h3 class="text-4xl tracking-widest font-bold my-6">
            {work.value?.paragraph.title}
          </h3>
          <div>
            {work.value?.paragraph.content.map((p) => (
              <p class="text-base font-light my-2" key={p}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div class="m-auto max-w-[1280px] flex p-4 pt-16 rounded-2xl">
        <div class="flex-1 flex flex-col w-1/3 ">
          {work.value?.images.map(
            (image, index) =>
              index % 3 === 0 && (
                <>
                  <figure
                    class="w-full flex items-center justify-center relative group p-2 py-4"
                    key={`${image.src}${image.alt}`}
                  >
                    <img
                      src={image.src}
                      alt=""
                      height={image.height}
                      width={image.width}
                      class="w-full rounded-xl shadow-xl"
                    />
                    <figcaption class="absolute bottom-0 left-0 p-6 w-full rounded-lg bg-gradient-to-t from-bgWhite-500 to-bgWhite-100 group-hover:opacity-80 opacity-0 transition-opacity text-black">
                      <div>
                        <p class="font-medium text-3xl my-4">
                          {image.overlay.title}
                        </p>
                        <p class="font-light text-xl my-2">
                          {image.overlay.content}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </>
              )
          )}
        </div>
        <div class="flex-1 flex flex-col w-1/3 mt-12 ">
          {work.value?.images.map(
            (image, index) =>
              index % 3 === 1 && (
                <>
                  <figure
                    class="w-full flex items-center justify-center relative group p-2 py-3"
                    key={`${image.src}${image.alt}`}
                  >
                    <img
                      src={image.src}
                      alt=""
                      height={image.height}
                      width={image.width}
                      class="w-full rounded-xl shadow-xl"
                    />
                    <figcaption class="absolute bottom-0 left-0 p-6 w-full rounded-lg bg-gradient-to-t from-bgWhite-500 to-bgWhite-100 group-hover:opacity-80 opacity-0 transition-opacity text-black">
                      <div>
                        <p class="font-medium text-3xl my-4 ">
                          {image.overlay.title}
                        </p>
                        <p class="font-light text-xl my-2">
                          {image.overlay.content}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </>
              )
          )}
        </div>
        <div class="flex-1 flex flex-col w-1/3 ">
          {work.value?.images.map(
            (image, index) =>
              index % 3 === 2 && (
                <>
                  <figure
                    class="w-full flex items-center justify-center relative group p-2"
                    key={`${image.src}${image.alt}`}
                  >
                    <img
                      src={image.src}
                      alt=""
                      height={image.height}
                      width={image.width}
                      class="w-full rounded-xl shadow-xl"
                    />
                    <figcaption class="absolute bottom-0 left-0 p-6 w-full rounded-lg bg-gradient-to-t from-bgWhite-500 to-bgWhite-100 group-hover:opacity-80 opacity-0 transition-opacity text-black">
                      <div>
                        <p class="font-medium text-3xl my-4">
                          {image.overlay.title}
                        </p>
                        <p class="font-light text-xl my-2">
                          {image.overlay.content}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </>
              )
          )}
        </div>
      </div>
    </div>
  );
});
