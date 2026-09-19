interface StepCardprops {
  step: string;
  title: string;
  description: string;
}

export function StepCard({ step, title, description }: StepCardprops) {
  return (
    <article className="relative max-w-2xl border py-3 px-5 rounded-2xl ">
      <span className="font-serif text-6xl font-bold text-[#6882bb]/40">{step}</span>
      <h3 className="font-serif mt-2 text-2xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-(--accent-color)/75">{description}</p>
    </article>
  );
}
