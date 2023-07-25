import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <header
      class={[
        "drawer",
        "drawer-end",
        "navbar",
        "shadow-sm",
        "rounded-sm",
        "sticky",
        "top-0",
        "z-20",
        "bg-bgWhite-500",
        "h-16",
      ]}
    >
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" href="/" title="qwik">
          {/* <QwikLogo height={50} width={143} /> */}
          基地文化
        </a>
      </div>
      <div class="flex-none md:hidden">
        <label for="my-drawer" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
      </div>
      <div class="flex-none hidden md:flex">
        <ul class="menu menu-horizontal px-1">
          <li>
            <a
              onClick$={() => {
                if (window.lenis) {
                  window.lenis.scrollTo("#bookSection");
                }
              }}
            >
              繪本創作
            </a>
          </li>
          <li>
            <a
              onClick$={() => {
                if (window.lenis) {
                  window.lenis.scrollTo("#showCaseSection");
                }
              }}
            >
              作品展示
            </a>
          </li>
          <li>
            <a
            // href="https://qwik.builder.io/tutorial/welcome/overview/"
            // target="_blank"
            >
              Tutorials
            </a>
          </li>
        </ul>
      </div>
      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-40 h-full bg-bgWhite-800 z-40">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </header>
  );
});
