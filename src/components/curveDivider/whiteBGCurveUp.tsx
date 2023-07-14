import { component$ } from "@builder.io/qwik";

interface Props {
  bgColor: string;
}

export default component$<Props>((props) => {
  return (
    <>
      <img
        class={["w-screen", "h-[162px]", "-mb-2", props.bgColor]}
        src="/images/bg-curves/white-bg-curve-up.png"
        alt=""
        width={1440}
        height={162}
      />
    </>
  );
});
