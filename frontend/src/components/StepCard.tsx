interface StepCardprops {
  step: string;
  title: string;
  description: string;
}

export function StepCard({ step, title, description }: StepCardprops) {
  return (
    <article className=" group border rounded-2xl border-(--accent-color)/10 bg-white/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-(--accent-blue)/40 ">
      <span className="font-serif text-6xl font-bold text-[#6882bb]/40">{step}</span>
      <div className="mt-10">
        <h3 className="font-serif mt-2 text-2xl font-bold">{title}</h3>
        <p className="mt-3 leading-7 text-(--accent-color)/75">{description}</p>
      </div>
    </article>
  );
}

export function UseCard({ step, title, description }: StepCardprops) {
  return (
    <article className="group rounded-2xl border border-(--accent-color)/10 bg-white/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-(--accent-blue)/40">
      <span className="font-serif text-6xl font-bold text-[#6882bb]/40">{step}</span>
      <div className="mt-10">
        <h3 className="font-serif mt-2 text-2xl font-bold">{title}</h3>
        <p className="mt-3 leading-7 text-(--accent-color)/75">{description}</p>
      </div>
    </article>
  );
}
