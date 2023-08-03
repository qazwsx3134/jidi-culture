import type { QwikIntrinsicElements } from "@builder.io/qwik";

export function FacebookIcon(
  props: QwikIntrinsicElements["svg"],
  key: string
) {
  return (
    <svg
      fill="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      class="w-5 h-5"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
    </svg>
  );
}
