import { component$ } from "@builder.io/qwik";

interface Props {
  title: string;
  color?: string;
}

export default component$<Props>((props) => {
  return (
    <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
        {props.title}
      </h1>
      <div
        class={["h-1", "w-20", props.color || "bg-bgRed-500", "rounded"]}
      ></div>
    </div>
  );
});
