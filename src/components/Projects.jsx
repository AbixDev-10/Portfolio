import Panel from "./Panel";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./ScrollReveal";
import SectionShell from "./SectionShell";
import SectionHeading from "./SectionHeading";
import { projects } from "../data/portfolioData";

function Projects() {
  return (
    <SectionShell id="projects">
      <ScrollReveal>
        <Panel>
          <SectionHeading
            title="Projects"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} delay={index * 140} />
            ))}
          </div>
        </Panel>
      </ScrollReveal>
    </SectionShell>
  );
}

export default Projects;
