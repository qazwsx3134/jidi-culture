import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { ProductAttributes } from "~/api/type";

export default component$<ProductAttributes>((props) => {
  return (
    <div class="card h-full max-w-xs bg-base-100 shadow-lg hover:shadow-2xl cursor-pointer border border-gray-500">
      <Link href={`products/${props.slug}`}>
        <figure>
          <img
            class="h-72 object-cover rounded-2xl"
            src={props.image?.data.attributes.formats?.small?.url || props.image?.data.attributes.url}
            width={320}
            height={288}
            alt="Shoes"
          />
        </figure>
        <div class="card-body card-compact">
          <div class="text-error text-sm">{props.tag}</div>
          <h2 class="card-title text-2xl">{props.name}</h2>
          <p class="my-1 line-clamp-2 text-gray-400 break-all">
            {props.description}
          </p>
          <div class="text-sm">NT${props.price}</div>
          <div class="mt-6 card-actions justify-end">
            <button class="btn btn-accent btn-md">購買</button>
          </div>
        </div>
      </Link>
    </div>
  );
});
