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
          "h-[162px]",
          props.bgColor,
        ]}
        src="/images/bg-curves/gray-bg-curve-up.png"
        alt=""
        width={1440}
        height={162}
        loading="lazy"
      />
    </>
  );
});
