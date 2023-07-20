import { component$ } from "@builder.io/qwik";

interface Props {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  name: string;
  title: string;
  badges?: string[];
  experience: string[];
}

export default component$<Props>((props) => {
  return (
    <div class="card w-96 bg-base-100 group hover:shadow-card-hover">
      <figure class="bg-[url('/images/team-card/card-bg.png')] bg-contain bg-no-repeat">
        <div class="h-[400px] w-96 group-hover:scale-110 group-hover:rotate-12 transition-transform  overflow-hidden">
          <img
            src={props.image.src}
            alt={props.image.alt}
            width={props.image.width}
            height={props.image.height}
          />
        </div>
      </figure>
      <div class="card-body px-6 py-4 gap-2">
        <div class="flex font-sans items-baseline gap-3 text-bgRed-700">
          <h2 class="card-title text-5xl ">{props.name}</h2>
          <h4 class="text-2x align-bottom">{props.title}</h4>
        </div>
        <div class="card-actions justify-end">
          {props.badges?.map((badge) => (
            <div key={badge} class="badge badge-accent badge-outline">
              {badge}
            </div>
          ))}
        </div>
        <div class="flex flex-col gap-1 my-3 text-lg text-bgRed-400 font-normal">
          {props.experience.map((exp) => (
            <p key={exp}>{exp}</p>
          ))}
        </div>
      </div>
    </div>
  );
});
