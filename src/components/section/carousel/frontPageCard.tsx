import { component$ } from "@builder.io/qwik";
import type { ProductAttributes } from "~/api/type";

export default component$<ProductAttributes>((props) => {

  return (
    <div class="card bg-base-100 shadow-lg hover:shadow-2xl cursor-pointer">
      <figure>
        <img
          class="h-72 object-cover"
          src={props.image?.data.attributes.formats?.small?.url}
          width={271}
          height={288}
          alt="Shoes"
        />
      </figure>
      <div class="card-body card-compact">
        <div class="text-error text-sm">{props.tag}</div>
        <h2 class="card-title text-2xl">{props.name}</h2>
        <div class="text-sm">NT${props.price}</div>
        <div class="mt-6 card-actions justify-end">
          <button class="btn btn-accent btn-md">購買</button>
        </div>
      </div>
    </div>
  );
});
