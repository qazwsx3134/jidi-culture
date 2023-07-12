import {
  component$,
  Slot,
  useStyles$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";

import styles from "./styles.css?inline";
import PageBackground from "~/components/loader/background/pageBackground";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  useStyles$(styles);

  const onDone = useSignal(false);

  useVisibleTask$(() => {
    setTimeout(() => {
      onDone.value = true;
    }, 3500);
  });

  return (
    <>
      <PageBackground onDone={onDone}>
        <img
          q:slot="icon"
          src="/images/jidi-logo-blob.webp"
          alt=""
          width={200}
          class="w-[200px] aspect-square z-1"
        />
      </PageBackground>
      {onDone.value && (
        <>
          <Header />
          <main class="min-h-screen">
            <Slot />
          </main>
          <Footer />
        </>
      )}
    </>
  );
});
