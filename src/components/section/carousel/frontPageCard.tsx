import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { ProductAttributes } from "~/api/type/product";

export default component$<ProductAttributes>((props) => {
  return (
    <div class="card h-full max-w-xs shadow-lg bg-bgWhite-300 hover:shadow-2xl cursor-pointer border border-gray-500">
      <Link href={`products/${props.slug}`}>
        <figure class="p-1 bg-white rounded-2xl">
          <img
            class="h-72 object-cover rounded-xl"
            src={
              props.image?.data?.attributes?.formats?.small?.url ||
              props.image?.data?.attributes?.url ||
              "https://dummyimage.com/300x288"
            }
            width={320}
            height={288}
            alt="Shoes"
            loading="lazy"
          />
        </figure>
        <div class="card-body card-compact pl-6 pr-4 pt-6 pb-4">
          <div class="flex gap-1">
            {props.categories?.data?.map((category) => (
              <div key={category.attributes.slug} class="badge badge-outline">
                {category.attributes.name}
              </div>
            ))}
          </div>
          <h2 class="card-title text-2xl my-4">{props.name}</h2>
          <p class="line-clamp-2 text-gray-500 break-all my-2">
            {props.description}
          </p>

          <div class="flex items-end justify-between my-4">
            <div class="text-xl text-gray-500 font-light tracking-wide">
              NT${props.price}
            </div>
            <div class="card-actions font-light text-white">
              <button class="btn btn-accent btn-md">購買</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});
