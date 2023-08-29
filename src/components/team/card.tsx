import { component$ } from "@builder.io/qwik";

interface Props {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  name: string;
  subName: string;
  title: string;
  badges?: string[];
  experience: string[];
}

export default component$<Props>((props) => {
  return (
    <div class="card w-full max-w-[384px] bg-base-100 group md:hover:shadow-card-hover">
      <figure class="bg-contain bg-no-repeat">
        <div class="h-[400px] w-96 md:group-hover:scale-110 md:group-hover:rotate-12 transition-transform  overflow-hidden">
          <img
            src={props.image.src}
            alt={props.image.alt}
            width={props.image.width}
            height={props.image.height}
            loading="lazy"
          />
        </div>
      </figure>
      <div class="card-body px-6 py-4 gap-2">
        <div class="flex items-end  gap-3 text-bgRed-700">
          <div class="whitespace-nowrap">
            <p class="card-title text-4xl">{props.name}</p>
            <p class="text-lg text-bgRed-400">{props.subName}</p>
          </div>

          <p class="align-bottom text-right text-bgRed-300">{props.title}</p>
        </div>
        <div class="card-actions justify-end">
          {props.badges?.map((badge) => (
            <div key={badge} class="badge badge-accent badge-outline">
              {badge}
            </div>
          ))}
        </div>
        <div class="flex flex-col my-3 text-base text-bgRed-900 font-light">
          {props.experience.map((exp) => (
            <p key={exp}>{exp}</p>
          ))}
        </div>
      </div>
    </div>
  );
});
