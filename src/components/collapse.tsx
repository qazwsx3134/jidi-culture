import { Slot, component$, useSignal } from "@builder.io/qwik";

type Toggle = "collapse-open" | "collapse-close";

interface CollapseProps {
  styles?: string;
  title: string;
}

export default component$<CollapseProps>((props) => {
  const toggle = useSignal<Toggle>("collapse-close");

  return (
    <div
      class={[
        "collapse",
        "border",
        "border-base-300",
        "collapse-arrow",
        "cursor-pointer",
        props.styles,
        toggle.value,
      ]}
      onClick$={() => {
        toggle.value =
          toggle.value === "collapse-open" ? "collapse-close" : "collapse-open";
      }}
    >
      <div class="collapse-title text-base font-normal">{props.title}</div>
      <div class="collapse-content text-sm font-light">
        <Slot name="content" />
      </div>
    </div>
  );
});
