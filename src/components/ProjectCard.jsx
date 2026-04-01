import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import ButtonLink from "./ButtonLink";
import ScrollReveal from "./ScrollReveal";

function ProjectCard({ project, delay = 0 }) {
  return (
    <ScrollReveal delay={delay} className="h-full" translateY={42}>
      <article className="card-entrance glass-card hover-lift group flex h-full flex-col overflow-hidden">
        <div className="overflow-hidden p-3 pb-0">
          <img
            src={project.image}
            alt={project.title}
            className={[
              "image-zoom w-full rounded-[1.2rem]",
              project.title === "BusBooker"
                ? "mx-auto h-40 max-w-[88%] object-contain object-center"
                : "h-48 object-cover object-center"
            ].join(" ")}
          />
        </div>
        <div className="flex flex-1 flex-col p-5 pt-5">
          <h3 className="font-display text-xl font-semibold text-slate-900">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((item) => (
              <span
                key={`${project.title}-${item}`}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-auto pt-7">
            <div className="flex flex-wrap gap-3">
              {project.liveDemo ? (
                <ButtonLink
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3"
                >
                  Live Demo
                  <FaExternalLinkAlt className="text-xs" />
                </ButtonLink>
              ) : (
                <span className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-500">
                  Live Demo
                  <FaExternalLinkAlt className="text-xs" />
                </span>
              )}

              {project.github ? (
                <ButtonLink
                  href={project.github}
                  variant="secondary"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3"
                >
                  GitHub Source Code
                  <FaGithub />
                </ButtonLink>
              ) : (
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-500">
                  GitHub Source Code
                  <FaGithub />
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export default ProjectCard;
