import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import LeftSection from "~/components/project/leftSection";

import { api } from "~/api";
import type { ProjectAPI } from "~/api/type";
import Ckeditor from "~/components/ckeditor";

export const useProjectLoader = routeLoader$(
  async ({ params, status, env, fail }) => {
    const res = await api<ProjectAPI>(
      `${env.get("API_URL")}/api/projects/${params.slug}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${env.get("BACKEND_TOKEN")}`,
        },
      }
    ).catch((error: any) => {
      return {
        error: error,
        status: error?.response?.data?.error?.status,
        name: error?.response?.data?.error?.name,
        errorMessage: error?.response?.data?.error?.message,
      };
    });

    if ("error" in res) {
      return fail(res.error.status, {
        errorMessage: res.error.message,
      });
    }
    if (!res.data) {
      // Product data was not found
      // Set the status code to 404
      status(404);
    }

    // return the data (which may be null)
    return res.data;
  }
);

export default component$(() => {
  const project = useProjectLoader();

  if (!project.value || "errorMessage" in project.value) {
    return (
      <div class="w-full font-sans bg-bgWhite-500">
        <div class="w-full flex flex-col items-center justify-center gap-4 p-12">
          <h1 class="text-6xl tracking-widest font-bold my-6">404</h1>
          <h2 class="text-4xl tracking-widest font-bold my-6">
            抱歉此頁面不存在
          </h2>
        </div>
      </div>
    );
  }

  const {
    attributes: {
      title,
      subTitle,
      description,
      artDesign,
      projectManager,
      guidanceUnit,
      hostUnit,
      cooperationUnit,
      heroImage,
      images,
      project_types: projectTypes,
    },
  } = project.value;

  return (
    <div class="w-full font-sans bg-bgWhite-500">
      <div class="w-full flex flex-col items-center justify-center gap-4 p-12">
        <h1 class="text-6xl tracking-widest font-bold my-6">{title}</h1>
        <h2 class="text-4xl font-light my-2">{subTitle}</h2>
      </div>
      <div
        class="hero w-screen max-h-[800px] h-[800px] "
        style={`background-image: url(${heroImage.data?.attributes.url});`}
      ></div>

      <div class="m-auto container flex xl:flex-row flex-col p-4 pt-12">
        <div class="flex flex-wrap flex-1 gap-10 mx-3 my-6 xl:flex-col xl:my-0">
          <div>
            <div class="text-2xl font-bold mb-4">專案類型</div>
            <div class="flex flex-wrap gap-4">
              {projectTypes?.data.map((type) => (
                <div
                  class="badge badge-lg badge-primary badge-outline"
                  key={type.id}
                >
                  {type.attributes.name}
                </div>
              ))}
            </div>
          </div>

          <LeftSection title="美術設計">
            <div q:slot="children">{artDesign}</div>
          </LeftSection>

          <LeftSection title="計畫企劃">
            <div q:slot="children">{projectManager}</div>
          </LeftSection>

          <LeftSection title="指導單位">
            <div q:slot="children">{guidanceUnit}</div>
          </LeftSection>

          <LeftSection title="主辦單位">
            <div q:slot="children">{hostUnit}</div>
          </LeftSection>

          <LeftSection title="合作單位">
            <div q:slot="children">{cooperationUnit}</div>
          </LeftSection>
        </div>
        <div class="divider xl:hidden"></div>
        <div class="bg-bgWhite-500 min-h-screen">
          <Ckeditor html={description} />
        </div>
      </div>

      <div class="container mx-auto">
        <div class="divider"></div>
        <h3 class="text-3xl font-normal my-2 text-center">相關作品</h3>
      </div>

      <div class="m-auto container flex flex-wrap p-4 pt-16 rounded-2xl">
        <div class="flex flex-col lg:w-1/3 sm:w-1/2">
          {images.data?.map(
            (image, index) =>
              index % 3 === 0 && (
                <>
                  <figure
                    class="w-full flex items-center justify-center relative group p-2 py-4"
                    key={`${image.attributes.hash}`}
                  >
                    <img
                      src={image.attributes.url}
                      alt=""
                      height={image.attributes.height}
                      width={image.attributes.width}
                      class="w-full rounded-xl shadow-xl"
                    />
                    <figcaption class="absolute bottom-0 left-0 p-6 w-full rounded-lg bg-gradient-to-t from-bgWhite-500 to-bgWhite-100 group-hover:opacity-80 opacity-0 transition-opacity text-black">
                      <div>
                        <p class="font-medium text-3xl my-4">
                          {image.attributes.alternativeText}
                        </p>
                        <p class="font-light text-xl my-2">
                          {image.attributes.caption}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </>
              )
          )}
        </div>
        <div class="flex flex-col lg:w-1/3 lg:mt-12 sm:w-1/2  ">
          {images.data?.map(
            (image, index) =>
              index % 3 === 1 && (
                <>
                  <figure
                    class="w-full flex items-center justify-center relative group p-2 py-3"
                    key={`${image.attributes.hash}`}
                  >
                    <img
                      src={image.attributes.url}
                      alt=""
                      height={image.attributes.height}
                      width={image.attributes.width}
                      class="w-full rounded-xl shadow-xl"
                    />
                    <figcaption class="absolute bottom-0 left-0 p-6 w-full rounded-lg bg-gradient-to-t from-bgWhite-500 to-bgWhite-100 group-hover:opacity-80 opacity-0 transition-opacity text-black">
                      <div>
                        <p class="font-medium text-3xl my-4 ">
                          {image.attributes.alternativeText}
                        </p>
                        <p class="font-light text-xl my-2">
                          {image.attributes.caption}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </>
              )
          )}
        </div>
        <div class="flex flex-col lg:w-1/3 sm:w-1/2">
          {images.data?.map(
            (image, index) =>
              index % 3 === 2 && (
                <>
                  <figure
                    class="w-full flex items-center justify-center relative group p-2 py-3"
                    key={`${image.attributes.hash}`}
                  >
                    <img
                      src={image.attributes.url}
                      alt=""
                      height={image.attributes.height}
                      width={image.attributes.width}
                      class="w-full rounded-xl shadow-xl"
                    />
                    <figcaption class="absolute bottom-0 left-0 p-6 w-full rounded-lg bg-gradient-to-t from-bgWhite-500 to-bgWhite-100 group-hover:opacity-80 opacity-0 transition-opacity text-black">
                      <div>
                        <p class="font-medium text-3xl my-4 ">
                          {image.attributes.alternativeText}
                        </p>
                        <p class="font-light text-xl my-2">
                          {image.attributes.caption}
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
