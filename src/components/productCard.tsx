import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { ProductAttributes } from "~/api/type/product";

export default component$<ProductAttributes>((props) => {
  return (
    <div class="lg:w-[23%] md:w-[48%] sm:w-[70%] w-[90%] p-2 bg-bgWhite-500 rounded-lg hover:shadow-lg group cursor-pointer indicator">
      <div class="indicator-item top-2 right-1 translate-x-0 translate-y-0 flex flex-col gap-2">
        {props.categories?.data?.map((category) => (
          <span
            key={category.attributes.slug}
            class="badge badge-lg badge-accent mr-2"
          >
            {category.attributes.name}
          </span>
        ))}
      </div>

      <Link href={`/products/${props.slug}`} class="w-full flex-grow">
        <div class="block relative h-96 rounded overflow-hidden ">
          <img
            alt="ecommerce"
            class="object-contain object-center w-full h-full block"
            src={
              props.image?.data.attributes.formats?.small?.url ||
              props.image?.data.attributes.url ||
              "https://dummyimage.com/600x260"
            }
            width={320}
            height={384}
          />
        </div>
        <div class="divider m-0 rounded"></div>
        <div class="mt-4 text-center">
          <h2 class="text-gray-900 group-hover:text-bgRed-500 title-font text-2xl font-medium my-4">
            {props.name}
          </h2>
          <p class="line-clamp-2 break-words text-gray-400 text-base font-light">
            {props.description}
          </p>
          <p class="my-4 tracking-wider text-gray-500 text-lg">NT${props.price}</p>
        </div>
      </Link>
    </div>
  );
});
