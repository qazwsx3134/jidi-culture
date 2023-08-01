import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { CrossIcon } from "~/components/icon/crossIcon";

export default component$(() => {
  const drawerRef = useSignal<HTMLElement>();
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
      <input
        id="my-drawer"
        type="checkbox"
        class="drawer-toggle"
        ref={drawerRef}
      />
      <div class="mx-auto container">
        <div class="flex-1 ">
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
              <Link href="/products">繪本商店</Link>
            </li>
          </ul>
        </div>
      </div>

      <div class="drawer-side">
        <ul class="menu p-4 w-full h-full bg-bgWhite-800 text-bgWhite-500 z-40 gap-2">
          <li class="flex items-end p-4 mb-4">
            <label for="my-drawer" class="text-2xl">
              <CrossIcon />
            </label>
          </li>

          <li class="text-2xl">
            <Link
              href="/products"
              onClick$={() => {
                drawerRef.value?.click();
              }}
            >
              繪本商店
            </Link>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </header>
  );
});
