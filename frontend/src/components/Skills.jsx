import ScrollReveal from "./ScrollReveal";
import SectionShell from "./SectionShell";
import SkillCard from "./SkillCard";
import { skillCategories, skillItems } from "../data/portfolioData";

function Skills() {
  return (
    <SectionShell id="skills">
      <ScrollReveal>
        <section>
          <div className="mb-8">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              My
            </p>
            <h2 className="mt-2 text-center font-display text-[2rem] font-bold tracking-tight text-slate-900 md:text-[2.4rem]">
              Tech Stack
            </h2>
            <p className="mt-8 text-center text-[1.15rem] text-slate-600">
              Technologies I&apos;ve been working with recently
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {skillItems.map((skill, index) => (
              <SkillCard key={skill.name} {...skill} delay={index * 120} />
            ))}
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {skillCategories.map((category, index) => (
              <ScrollReveal
                key={category.title}
                delay={index * 80}
                className="h-full"
                translateY={24}
              >
                <article className="h-full rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.28)]">
                  <h3 className="font-display text-[1.7rem] font-semibold text-slate-900">
                    {category.title}
                  </h3>
                  <div className="mt-3 h-[3px] w-12 rounded-full bg-primary" />
                  <div className="mt-6 flex flex-wrap gap-3">
                    {category.items.map((item) => (
                      <span
                        key={`${category.title}-${item}`}
                        className="rounded-full bg-slate-100 px-4 py-2 text-[1rem] font-medium text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </SectionShell>
  );
}

export default Skills;
