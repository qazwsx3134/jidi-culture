import { component$ } from "@builder.io/qwik";

interface Props {
  bgColor: string;
}

export default component$<Props>((props) => {
  return (
    <>
      <img
        class={[
          "object-contain",
          "object-bottom",
          "lg:object-fill",
          "lg:w-screen",
          "-mb-2",
          props.bgColor,
        ]}
        src="/images/bg-curves/white-bg-curve-up.png"
        alt=""
        width={1440}
        height={162}
      />
    </>
  );
});
