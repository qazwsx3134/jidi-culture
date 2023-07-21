import { component$, Slot } from "@builder.io/qwik";

interface Props {
  title?: string;
}
export default component$<Props>((props) => {
  return (
    <div>
      <div class="text-2xl font-bold mb-3">{props.title || ""}</div>
      <div class="flex flex-wrap gap-4 text-xl font-light">
        <Slot name="children" />
      </div>
    </div>
  );
});
