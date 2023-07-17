import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <header class="navbar shadow-sm rounded-sm">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" href="/" title="qwik">
          {/* <QwikLogo height={50} width={143} /> */}
          基地文化
        </a>
      </div>
      <div class="flex-none">
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
    </header>
  );
});
