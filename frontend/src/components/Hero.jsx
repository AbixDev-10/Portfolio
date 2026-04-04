import { useState } from "react";
import { FaDownload, FaGithub, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";
import profilePhoto from "../assets/Abishek_Profile.png";
import { personalInfo, socialLinks } from "../data/portfolioData";
import ButtonLink from "./ButtonLink";
import SectionShell from "./SectionShell";

function Hero() {
  const [photoLoaded, setPhotoLoaded] = useState(true);

  return (
    <SectionShell id="home" className="pt-10 md:pt-14">
      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-[1.9rem] font-medium text-primary md:text-[2.2rem]">Hi, I&apos;m</p>
          <h1 className="mt-4 font-display text-[3rem] font-bold leading-[1.05] tracking-tight text-slate-900 md:text-[4.4rem]">
            {personalInfo.name}
          </h1>
          <p className="mt-8 max-w-[34rem] text-[1.18rem] leading-9 text-slate-600">
            I&apos;m a passionate Full Stack Developer dedicated to crafting seamless digital
            experiences that combine functionality with clean visual design.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={personalInfo.resumeHref} className="button-sheen hover-scale-soft px-7 py-4 text-base">
              <FaDownload />
              Download CV
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" className="button-sheen hover-scale-soft px-7 py-4 text-base">
              <FaPaperPlane />
              Contact Me
            </ButtonLink>
          </div>

          <div className="mt-10 flex items-center gap-5">
            <a
              href={socialLinks.github || "https://github.com/AbixDev-10"}
              target={socialLinks.github ? "_blank" : undefined}
              rel={socialLinks.github ? "noreferrer" : undefined}
              className="hover-scale-soft flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_12px_28px_-22px_rgba(15,23,42,0.4)]"
            >
              <FaGithub />
            </a>
            <a
              href={socialLinks.linkedin || "https://www.linkedin.com/in/abishek-s-3a2426345/"}
              target={socialLinks.linkedin ? "_blank" : undefined}
              rel={socialLinks.linkedin ? "noreferrer" : undefined}
              className="hover-scale-soft flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_12px_28px_-22px_rgba(15,23,42,0.4)]"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

          <div className="flex justify-center lg:justify-end">
          <div className="floating-hero w-full max-w-[25rem] overflow-hidden rounded-[1.9rem] bg-white shadow-[0_28px_60px_-38px_rgba(15,23,42,0.38)]">
            {photoLoaded ? (
              <img
                src={profilePhoto}
                alt={`${personalInfo.name} profile`}
                className="h-[28rem] w-full object-cover object-[center_20%]"
                onError={() => setPhotoLoaded(false)}
              />
            ) : (
              <div className="flex h-[28rem] items-center justify-center p-8 text-center text-slate-500">
                Profile image unavailable
              </div>
            )}
          </div>
        </div>
      </section>
    </SectionShell>
  );
}

export default Hero;
