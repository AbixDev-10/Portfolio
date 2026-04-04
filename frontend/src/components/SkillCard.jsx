import ScrollReveal from "./ScrollReveal";

function SkillCard({ name, icon: Icon, color, delay = 0 }) {
  return (
    <ScrollReveal delay={delay} className="h-full" translateY={36}>
      <article className="card-entrance group flex h-full min-h-[7.5rem] flex-col items-center justify-center rounded-[1.2rem] border border-slate-200 bg-white p-4 text-center shadow-[0_18px_42px_-34px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1">
        <div className={`icon-bob text-[3rem] ${color}`}>
          <Icon />
        </div>
        <h3 className="mt-3 font-display text-[1.05rem] font-semibold text-slate-900">
          {name}
        </h3>
      </article>
    </ScrollReveal>
  );
}

export default SkillCard;
