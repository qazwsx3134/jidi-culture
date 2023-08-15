import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { confirmLinePayOrder } from "~/api/linePay";

export const useConfirmLoader = routeLoader$(async ({ query }) => {
  const transactionId = query.get("transactionId");
  const orderId = query.get("orderId");

  if (!transactionId || !orderId) {
    return { error: "transactionId or orderId is missing" };
  }

  const res = await confirmLinePayOrder({
    transactionId,
    orderId,
  });
  return res;
});

// 和Success strapi page 拿資料並顯示
export default component$(() => {
  const confirm = useConfirmLoader();

  // 遺失資料
  if ("error" in confirm.value) {
    return (
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Ooops, 好像有些對勁
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              或許您是從其他地方進入此頁面，請重新回到商店選購．
              如果是從LinePay付款後進入此頁面，請聯絡我們．
            </p>
          </div>
          <div class="flex flex-col mx-auto px-8 space-y-4 items-center">
            <Link
              class="btn btn-outline btn-primary text-white text-lg"
              href="/products"
            >
              回商店
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Master Cleanse Reliac Heirloom
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep.
          </p>
        </div>
        <div class="flex flex-col text-left lg:w-2/3 mx-auto justify-center mb-12 bg-bgWhite-600 rounded-md p-4">
          <h4 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            訂單資訊
          </h4>
          <h5 class="sm:text-xl text-lg font-normal title-font mb-4 text-gray-700">
            謝謝您的訂購，我們將盡快為您處理訂單
          </h5>
          <div class="leading-relaxed text-base">
            <p>訂單編號 : {confirm.value.orderId}</p>
            <p>訂單狀態 : {confirm.value.status}</p>
            <p>購買人 : {confirm.value.buyerName}</p>
            <p>Line交易編號 : {confirm.value.transactionId}</p>
          </div>
        </div>
        <div class="flex flex-col mx-auto px-8 space-y-4 items-center">
          <Link
            class="btn btn-outline btn-primary text-white text-lg"
            href="/products"
          >
            回商店
          </Link>
        </div>
      </div>
    </section>
  );
});
