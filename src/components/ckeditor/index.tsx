import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./ckeditor.css?inline";
interface Props {
  html?: string;
}

export default component$<Props>((props) => {
  useStyles$(styles);

  if (!props?.html) {
    return null;
  }
  return (
    <article
      class="ck-content prose prose-lg prose-stone contents"
      dangerouslySetInnerHTML={props.html}
    />
  );
});
