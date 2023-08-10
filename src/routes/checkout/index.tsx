import {
  $,
  component$,
  useComputed$,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { AddIcon } from "~/components/icon/addIcon";
import { CartIcon } from "~/components/icon/cartIcon";
import { MinusIcon } from "~/components/icon/minusIcon";
import { TrashBinIcon } from "~/components/icon/trashBinIcon";

import { cartContextId } from "~/routes/layout";

const PaymentMethod = {
  creditCard: "creditCard",
  linePay: "linePay",
} as const;

export default component$(() => {
  const alertState = useSignal<string | null>(null);
  const paymentMethod = useSignal<string>(PaymentMethod.linePay);
  const cartCtx = useContext(cartContextId);
  // taxFee and shippingFee will fetch from the server
  const taxFee = 0.05;
  const shippingFee = 0;

  // Calculate the total price of the items in the cart

  // sum = each(item.price * item.quantity) * fee + shippingFee
  const sum = useComputed$(() => {
    const sum = cartCtx.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    return sum;
  });

  const totalTaxFee = useComputed$(() => {
    return sum.value * taxFee;
  });

  const totalPrice = useComputed$(() => {
    return sum.value + totalTaxFee.value + shippingFee;
  });

  // Increase the quantity of the item in the cart
  const increaseQuantity = (id: string) =>
    $(() => {
      const item = cartCtx.items.find((item) => item.id === id);
      if (item) {
        if (item.quantity + 1 > item.availableQuantity) {
          alertState.value = "庫存不足";
          setTimeout(() => {
            alertState.value = null;
          }, 2000);
          return;
        } else {
          item.quantity = item.quantity + 1;
          return;
        }
      }
    });
  // Decrease the quantity of the item in the cart
  const decreaseQuantity = (id: string) =>
    $(() => {
      const item = cartCtx.items.find((item) => item.id === id);
      if (item) {
        if (item.quantity - 1 < 1) {
          alertState.value = "數量不可小於 1";
          setTimeout(() => {
            alertState.value = null;
          }, 2000);
          return;
        } else {
          item.quantity = item.quantity - 1;
          return;
        }
      }
    });

  // Delete the item from the cart
  const deleteItem = (id: string) =>
    $(() => {
      cartCtx.items = cartCtx.items.filter((item) => item.id !== id);
    });

  return (
    <section>
      <div class="bg-bgWhite-500 py-24">
        <div class="container mx-auto flex flex-col items-center justify-start">
          <h1 class="text-5xl font-bold my-8">購物車</h1>
          <div class="divider"></div>
          {cartCtx.items.length === 0 && (
            <>
              <h2 class="text-2xl font-normal my-4">
                您的購物車目前還沒有商品
              </h2>
              <Link href="/products" class="btn btn-lg btn-outline my-4">
                購物去!
              </Link>
              <div class="w-[300px] h-[300px] my-8">
                <div class="w-full h-full text-sm bg-gray-200 mask mask-squircle flex items-center justify-center rotate-12">
                  <CartIcon class="-rotate-12 w-[120px] h-[120px]" />
                </div>
              </div>
            </>
          )}

          <div
            class={[
              "alert",
              "alert-warning",
              "transition",
              alertState.value ? "opacity-100" : "opacity-0",
            ]}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{alertState.value}</span>
          </div>

          {cartCtx.items.length > 0 && (
            <div class="container mx-auto flex px-8 py-24 md:flex-row flex-col items-start bg-white rounded">
              <div class="lg:max-w-3xl w-full mb-10 md:mb-0">
                <h3 class="text-2xl font-medium mt-2">購物車內商品</h3>

                <div class="flex flex-col">
                  {cartCtx.items.map((item) => (
                    <div
                      class="flex flex-col md:flex-row py-6 border-b border-gray-300"
                      key={item.slug}
                    >
                      <div class="lg:max-w-[240px] w-full">
                        <img
                          src={item.thumbnail?.url}
                          alt=""
                          width={item.thumbnail?.width}
                          height={item.thumbnail?.height}
                          class="object-cover object-center rounded"
                        />
                      </div>
                      <div class="flex-grow flex flex-col justify-between mx-4">
                        <div class="flex flex-col gap-2">
                          <p class="text-2xl text-gray-900 font-medium tracking-widest">
                            {item.name}
                          </p>
                          <p class="text-base text-gray-400 font-light">
                            單價 : {item.price}
                          </p>
                        </div>

                        <div class="my-3 text-gray-500 flex items-center gap-4">
                          <p class="hidden lg:block">數量 : </p>
                          <button
                            class="btn btn-circle btn-outline"
                            onClick$={decreaseQuantity(item.id)}
                          >
                            <MinusIcon />
                          </button>
                          <p>{item.quantity}</p>
                          <button
                            class="btn btn-circle btn-outline"
                            onClick$={increaseQuantity(item.id)}
                          >
                            <AddIcon />
                          </button>
                        </div>
                      </div>

                      <div class="flex flex-col item-center justify-between">
                        <p class="text-base text-gray-500 font-normal my-4">
                          小計 : {item.price * item.quantity}
                        </p>
                        <button
                          class="my-3 text-4xl text-gray-400 flex items-center justify-center hover:text-gray-700"
                          onClick$={deleteItem(item.id)}
                        >
                          <TrashBinIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 class="text-2xl font-medium my-2">購物明細</h1>
                <div class="bg-bgWhite-500 rounded-lg p-6">
                  <div class="flex flex-col justify-end gap-4 text-lg font-light text-gray-500">
                    <p class="mb-2 text-right">商品總計價格 : ${sum}</p>
                    <p class="mb-2 text-right">稅金 : ${totalTaxFee}</p>
                    <p class="mb-2 text-right">運費 : ${shippingFee}</p>
                    <p class="mb-2 text-right font-medium text-gray-700">
                      總計 : ${totalPrice}
                    </p>
                  </div>

                  <div class="divider"></div>
                  <p class="mb-8 leading-relaxed text-base font-light text-gray-400">
                    {/* 總計的算是以及警語由server設定 */}
                    謝謝您的購買，您的支持是我們前進的動力。
                  </p>
                </div>

                <div class="flex flex-col w-full justify-start md:items-start items-center my-8">
                  <p class="text-2xl font-medium my-6">付款方式</p>
                  <div class="flex lg:flex-row md:flex-col">
                    <button
                      class={[
                        "bg-gray-100",
                        "inline-flex",
                        "py-3",
                        "px-5",
                        "rounded-lg",
                        "items-center",
                        "hover:bg-gray-200",
                        "focus:outline-none",
                        paymentMethod.value === "linePay" &&
                          "border-2 border-gray-900",
                      ]}
                    >
                      <img
                        src="/images/line-pay.png"
                        alt=""
                        width={98}
                        height={98}
                        class="w-12"
                      />
                      <span class="ml-4 flex items-start flex-col leading-none">
                        <span class="text-xl font-medium">Line Pay</span>
                      </span>
                    </button>
                  </div>
                </div>

                <div class="flex flex-col w-full max-w-[240px] justify-start  items-start">
                  <button class="btn btn-block rounded-full bg-bgGray-900 hover:bg-bgWhite-700">
                    <p class="text-bgGray-100 text-base font-light">結帳去</p>
                    <CartIcon class="text-bgGray-100 text-xl"/>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
