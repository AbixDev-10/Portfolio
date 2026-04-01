import ScrollReveal from "./ScrollReveal";
import SectionShell from "./SectionShell";
import { educationCards, personalInfo } from "../data/portfolioData";
import { FaBuildingColumns, FaGraduationCap } from "react-icons/fa6";

function About() {
  const educationIcons = {
    college: FaGraduationCap,
    coursework: FaBuildingColumns
  };

  return (
    <SectionShell id="about">
      <ScrollReveal>
        <section>
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">About</p>
            <h2 className="mt-2 font-display text-[2rem] font-bold tracking-tight text-slate-900 md:text-[2.4rem]">
              Me
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <h3 className="font-display text-[1.9rem] font-semibold text-slate-900">Who I Am</h3>
              <div className="mt-8 space-y-8 text-[15px] leading-8 text-slate-600">
                <p>{personalInfo.aboutDescription}</p>
                <p>{personalInfo.summary}</p>
                <p>{personalInfo.availability}</p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-[1.9rem] font-semibold text-slate-900">
                My Education
              </h3>
              <div className="mt-8 grid gap-6">
                {educationCards.map((item) => {
                  const Icon = educationIcons[item.icon];

                  return (
                    <article
                      key={item.title}
                      className="flex items-start gap-5 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.28)]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                        <Icon />
                      </div>
                      <div>
                        <h4 className="font-display text-[1.45rem] font-semibold text-slate-900">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-[1.1rem] text-slate-600">{item.subtitle}</p>
                        <p className="mt-3 text-sm text-slate-500">{item.meta}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </SectionShell>
  );
}

export default About;
