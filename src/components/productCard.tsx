import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { ProductAttributes } from "~/api/type";
export default component$<ProductAttributes>((props) => {
  return (
    <div class="lg:w-[23%] md:w-[48%] p-4 w-full bg-bgWhite-500 rounded-lg hover:shadow-lg group cursor-pointer">
      <Link href={`/products/${props.slug}`}>
        <div class="block relative h-96 rounded overflow-hidden">
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
          <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
            {props.tag}
          </h3>
          <h2 class="text-gray-900 group-hover:text-bgRed-500 title-font text-xl font-medium my-2">
            {props.name}
          </h2>
          <p class="my-1 line-clamp-2 break-words text-gray-400">
            {props.description}
          </p>
          <p class="my-4">NT${props.price}</p>
        </div>
      </Link>
    </div>
  );
});
