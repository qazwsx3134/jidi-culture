import { component$ } from "@builder.io/qwik";

interface Props {
  bgColor: string;
}

export default component$<Props>((props) => {
  return (
    <>
      <img
        class={[
          "relative",
          "-z-[1]",
          "object-contain",
          "object-top",
          "lg:object-fill",
          "lg:w-screen",
          "h-[162px]",
          "-mt-2",
          props.bgColor,
        ]}
        src="/images/bg-curves/red-bg-curve-down.png"
        alt=""
        width={1440}
        height={162}
        loading="lazy"
      />
    </>
  );
});
