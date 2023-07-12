import type { QwikIntrinsicElements } from "@builder.io/qwik";

export function IconBlob(props: QwikIntrinsicElements["svg"], key: string) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      key={key}
    >
      <path
        fill="#F2F4F8"
        d="M52.3,-41.2C64.4,-26.6,68.5,-5,65.3,17.3C62.1,39.5,51.6,62.6,35.4,68.4C19.1,74.3,-2.9,63.1,-25.9,52.5C-48.8,41.9,-72.7,32,-81.2,13.3C-89.6,-5.4,-82.6,-32.8,-66.5,-48.4C-50.4,-63.9,-25.2,-67.6,-2.5,-65.6C20.1,-63.6,40.3,-55.9,52.3,-41.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
