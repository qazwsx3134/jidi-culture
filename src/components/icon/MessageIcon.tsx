import type { QwikIntrinsicElements } from "@builder.io/qwik";

export function MessageIcon(props: QwikIntrinsicElements["svg"], key: string) {
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
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
    </svg>
  );
}