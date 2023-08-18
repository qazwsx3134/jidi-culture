import { component$, useContext, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ShoppingIcon } from "~/components/icon/shoppingIcon";
import { CrossIcon } from "~/components/icon/crossIcon";
import { cartContextId } from "~/routes/layout";

export default component$(() => {
  const drawerRef = useSignal<HTMLElement>();
  const cartCtx = useContext(cartContextId);

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
        <div class="flex-1">
          <a class="btn btn-ghost normal-case" href="/" title="qwik">
            <div class="flex flex-col items-start justify-start font-semibold">
              <p class="text-2xl">基地文化</p>
              <p class="text-sm text-gray-500">出版有限公司</p>
            </div>
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
          <ul class="menu menu-horizontal px-1 items-center">
            <li>
              <Link href="/products">繪本商店</Link>
            </li>
            <li>
              <Link href="/checkout">
                <div class="indicator p-1">
                  <span class="indicator-item badge badge-accent">
                    {cartCtx.items.length}
                  </span>
                  <ShoppingIcon class="w-6" />
                </div>
              </Link>
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
        </ul>
      </div>
    </header>
  );
});
