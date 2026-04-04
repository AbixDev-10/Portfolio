import ScrollReveal from "./ScrollReveal";
import SectionShell from "./SectionShell";
import { experience } from "../data/portfolioData";

function Experience() {
  return (
    <SectionShell id="experience">
      <ScrollReveal>
        <section>
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">My</p>
            <h2 className="mt-2 font-display text-[2rem] font-bold tracking-tight text-slate-900 md:text-[2.4rem]">
              Experience
            </h2>
          </div>

          <div className="grid gap-6">
            {experience.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={`${item.company}-${item.role}`}
                  className="grid gap-4 md:grid-cols-[11rem_1fr]"
                >
                  <div className="relative pr-6 text-left md:text-right">
                    <p className="text-[1.05rem] font-semibold leading-7 text-primary">
                      {item.period}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{item.duration}</p>
                    <div className="absolute right-0 top-1 hidden h-full w-px bg-rose-200 md:block" />
                    <div className="absolute right-[-10px] top-3 hidden h-5 w-5 rounded-full border-4 border-white bg-primary shadow md:block" />
                  </div>

                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.28)]">
                    <div className="flex items-start gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                        <Icon />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-[1.7rem] font-semibold leading-tight text-slate-900">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-xl font-semibold text-primary">{item.company}</p>
                        <p className="mt-2 text-sm text-slate-500">{item.location}</p>
                        <div className="mt-5 space-y-2 text-[15px] leading-8 text-slate-600">
                          {item.points.map((point) => (
                            <p key={point}>{point}</p>
                          ))}
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.tech.map((tech) => (
                            <span
                              key={`${item.role}-${tech}`}
                              className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </ScrollReveal>
    </SectionShell>
  );
}

export default Experience;
