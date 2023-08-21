import {
  component$,
  $,
  useSignal,
  useTask$,
  useContext,
} from "@builder.io/qwik";
import {
  type SubmitHandler,
  useForm,
  setValue,
  getErrors,
} from "@modular-forms/qwik";
import { v4 as uuidv4 } from "uuid";

import {
  PaymentMethod,
  useEnvLoader,
  useFormAction,
  useOrderFormLoader,
  validateOrderForm,
} from "~/routes/checkout";
import { CartIcon } from "~/components/icon/cartIcon";
import { type OrderFormType } from "~/api/validatation/order";
import { cartContextId } from "~/routes/layout";
import { LoadingIcon } from "../icon/loadingIcon";

interface Props {
  sum: number;
  totalTaxFee: number;
  shippingFee: number;
  totalPrice: number;
}

export default component$<Props>((props) => {
  const env = useEnvLoader();
  const paymentMethod = useSignal<string>(PaymentMethod.linePay);
  const accordionRef = useSignal<HTMLInputElement>();

  const cartCtx = useContext(cartContextId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orderForm, { Form, Field }] = useForm<OrderFormType>({
    loader: useOrderFormLoader(), // initialize the form with the data from the server
    // @ts-ignore
    action: useFormAction(),
    validate: validateOrderForm,
  });

  useTask$(async () => {
    setValue(
      orderForm,
      "redirectUrls.cancelUrl",
      `${env.value.domain}/checkout/cancel`
    );
    setValue(
      orderForm,
      "redirectUrls.confirmUrl",
      `${env.value.domain}/checkout/confirm`
    );
    setValue(orderForm, "packages.0.id", uuidv4());
  });

  // track cart items change
  useTask$(async ({ track }) => {
    track(() => [props.totalPrice, props.shippingFee, props.totalTaxFee]);

    // track cart items change
    cartCtx.items.forEach((product) => {
      track(() => product);
    });

    setValue(orderForm, "amount", props.totalPrice);
    setValue(orderForm, "feeAmount", props.shippingFee);

    setValue(orderForm, "packages.0.amount", props.totalPrice);
    setValue(orderForm, "packages.0.userFee", props.totalTaxFee);

    // update order form
    cartCtx.items.forEach((product, index) => {
      setValue(orderForm, `packages.0.products.${index}.id`, `${product.id}`);
      setValue(orderForm, `packages.0.products.${index}.name`, product.name);
      setValue(
        orderForm,
        `packages.0.products.${index}.imageUrl`,
        product.thumbnail?.url
      );
      setValue(orderForm, `packages.0.products.${index}.price`, product.price);
      setValue(
        orderForm,
        `packages.0.products.${index}.quantity`,
        product.quantity
      );
    });
  });

  useTask$(async ({ track }) => {
    track(() => orderForm.response.data);

    if (orderForm.response?.data) {
      // @ts-ignore
      const redirectUrl = orderForm.response.data.web as string;
      window.location.href = redirectUrl;
    }
  });

  const handleSubmit = $<SubmitHandler<OrderFormType>>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (values, event) => {
      // Runs on client
      // show user success message or error message
      // const res = await createLinePayOrder(values);
      // console.log(res);
      // redirect to line pay
    }
  );

  const checkFormErrorOnSubmit = $(() => {
    const errors = getErrors(orderForm);
    if (Object.keys(errors).length > 0) {
      accordionRef.value?.click();
    }
  });

  return (
    <>
      <Form onSubmit$={handleSubmit}>
        <div class="join join-vertical w-full">
          {/* First Step */}
          <div class="collapse collapse-arrow join-item border border-gray-300">
            <input
              ref={accordionRef}
              type="radio"
              name="my-accordion-2"
              checked={true}
            />
            <div class="collapse-title text-xl font-medium ">
              <h1 class="text-2xl font-medium my-2">訂購資訊</h1>
              {orderForm.response.message}
            </div>
            <div class="collapse-content">
              <div class="bg-bgWhite-500 rounded-lg p-6">
                {/* Hidden field */}

                {/* amount */}
                <Field name="amount" type="number">
                  {() => <input id="amount" type="hidden" />}
                </Field>

                {/* feeAmount */}
                <Field name="feeAmount" type="number">
                  {() => <input id="feeAmount" type="hidden" />}
                </Field>

                {/* redirectUrls */}
                <Field name="redirectUrls.cancelUrl" type="string">
                  {() => <input id="redirectUrls.cancelUrl" type="hidden" />}
                </Field>
                <Field name="redirectUrls.confirmUrl" type="string">
                  {() => <input id="redirectUrls.confirmUrl" type="hidden" />}
                </Field>

                {/* packages */}
                <Field name="packages.0.id" type="string">
                  {() => <input id="packages.0.id" type="hidden" />}
                </Field>
                <Field name="packages.0.amount" type="number">
                  {() => <input id="packages.0.amount" type="hidden" />}
                </Field>
                <Field name="packages.0.userFee" type="number">
                  {() => <input id="packages.0.userFee" type="hidden" />}
                </Field>
                {cartCtx.items.map((_, index) => (
                  <>
                    <Field
                      name={`packages.0.products.${index}.id`}
                      type="string"
                    >
                      {() => (
                        <input
                          id={`packages.0.products.${index}.id`}
                          type="hidden"
                        />
                      )}
                    </Field>
                    <Field
                      name={`packages.0.products.${index}.name`}
                      type="string"
                    >
                      {() => (
                        <input
                          id={`packages.0.products.${index}.name`}
                          type="hidden"
                        />
                      )}
                    </Field>
                    <Field
                      name={`packages.0.products.${index}.imageUrl`}
                      type="string"
                    >
                      {() => (
                        <input
                          id={`packages.0.products.${index}.imageUrl`}
                          type="hidden"
                        />
                      )}
                    </Field>
                    <Field
                      name={`packages.0.products.${index}.price`}
                      type="number"
                    >
                      {() => (
                        <input
                          id={`packages.0.products.${index}.price`}
                          type="hidden"
                        />
                      )}
                    </Field>
                    <Field
                      name={`packages.0.products.${index}.quantity`}
                      type="number"
                    >
                      {() => (
                        <input
                          id={`packages.0.products.${index}.quantity`}
                          type="hidden"
                        />
                      )}
                    </Field>
                  </>
                ))}

                {/* Name */}
                <Field name="address.recipient.lastName">
                  {(field, props) => (
                    <div class="form-control">
                      <label class="label" for={field.name}>
                        <span class="label-text">姓</span>
                      </label>
                      <input
                        type="text"
                        placeholder="姓"
                        class={[
                          "input input-bordered",
                          "bg-white",
                          field.error && "input-error",
                        ]}
                        {...props}
                        value={field.value}
                      />
                      {field.error && (
                        <label class="label">
                          <span class="label-text-alt text-error">
                            {field.error}
                          </span>
                        </label>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="address.recipient.firstName">
                  {(field, props) => (
                    <div class="form-control">
                      <label class="label" for={field.name}>
                        <span class="label-text">名</span>
                      </label>
                      <input
                        type="text"
                        placeholder="名"
                        class={[
                          "input input-bordered",
                          "bg-white",
                          field.error && "input-error",
                        ]}
                        {...props}
                        value={field.value}
                      />
                      {field.error && (
                        <label class="label">
                          <span class="label-text-alt text-error">
                            {field.error}
                          </span>
                        </label>
                      )}
                    </div>
                  )}
                </Field>
                {/* Email */}
                <Field name="address.recipient.email">
                  {(field, props) => (
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="email"
                        class={[
                          "input input-bordered",
                          "bg-white",
                          field.error && "input-error",
                        ]}
                        {...props}
                        value={field.value}
                      />
                      {field.error && (
                        <label class="label">
                          <span class="label-text-alt text-error">
                            {field.error}
                          </span>
                        </label>
                      )}
                    </div>
                  )}
                </Field>
                {/* phone */}
                <Field name="address.recipient.phoneNo">
                  {(field, props) => (
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">聯絡電話</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="請輸入電話"
                        class={[
                          "input input-bordered bg-white",
                          field.error && "input-error",
                        ]}
                        {...props}
                        value={field.value}
                      />
                      {field.error && (
                        <label class="label">
                          <span class="label-text-alt text-error">
                            {field.error}
                          </span>
                        </label>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="address.detail">
                  {(field, props) => (
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">寄送地址</span>
                      </label>
                      <textarea
                        class={[
                          "textarea textarea-bordered h-24 bg-white",
                          field.error && "input-error",
                        ]}
                        placeholder="請輸入地址"
                        {...props}
                        value={field.value}
                      ></textarea>
                      {field.error && (
                        <label class="label">
                          <span class="label-text-alt text-error">
                            {field.error}
                          </span>
                        </label>
                      )}
                    </div>
                  )}
                </Field>
              </div>
            </div>
          </div>

          {/* Second Step */}
          <div class="collapse collapse-arrow join-item border border-gray-300">
            <input type="radio" name="my-accordion-2" />
            <div class="collapse-title text-xl font-medium">
              <h1 class="text-2xl font-medium my-2">購物明細</h1>
            </div>
            <div class="collapse-content">
              <div class="bg-bgWhite-500 rounded-lg p-6">
                <div class="flex flex-col justify-end gap-4 text-lg font-light text-gray-500">
                  <p class="mb-2 text-right">商品總計價格 : ${props.sum}</p>
                  <p class="mb-2 text-right">稅金 : ${props.totalTaxFee}</p>
                  <p class="mb-2 text-right">運費 : ${props.shippingFee}</p>
                  <p class="mb-2 text-right font-medium text-gray-700">
                    總計 : ${props.totalPrice}
                  </p>
                </div>

                <div class="divider"></div>
                <p class="mb-8 leading-relaxed text-base font-light text-gray-400">
                  {/* 總計的算是以及警語由server設定 */}
                  謝謝您的購買，您的支持是我們前進的動力。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Third Step */}

        <div class="flex flex-col w-full justify-start md:items-start items-center my-8">
          <p class="text-2xl font-medium my-6">付款方式</p>
          <div class="flex lg:flex-row md:flex-col ">
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
                paymentMethod.value === "linePay" && "border-2 border-gray-900",
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

        {/* Fourth Step */}

        <div class="flex flex-col w-full max-w-[200px] justify-start form-control mx-auto md:m-0">
          <button
            class="btn btn-block rounded-full bg-bgGray-900 hover:bg-bgWhite-700 "
            type="submit"
            disabled={orderForm.submitting}
            onClick$={checkFormErrorOnSubmit}
          >
            {orderForm.submitting ? (
              <>
                <LoadingIcon class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                <p class="text-bgGray-100 text-base font-light">
                  正在送出表單...
                </p>
              </>
            ) : (
              <>
                <CartIcon class="text-bgGray-100 text-xl" />
                <p class="text-bgGray-100 text-base font-light">結帳去</p>
              </>
            )}
          </button>
        </div>
      </Form>
    </>
  );
});
