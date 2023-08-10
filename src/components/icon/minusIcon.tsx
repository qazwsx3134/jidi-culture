import type { QwikIntrinsicElements } from "@builder.io/qwik";

export function MinusIcon(
  props: QwikIntrinsicElements["svg"],
  key: string
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path fill="currentColor" d="M19 12.998H5v-2h14z"></path>
    </svg>
  );
}
