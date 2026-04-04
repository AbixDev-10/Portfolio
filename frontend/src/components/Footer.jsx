import { FaArrowUp, FaCode, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { navLinks, personalInfo, socialLinks } from "../data/portfolioData";

function Footer() {
  const footerLinks = navLinks.filter((link) =>
    ["#home", "#about", "#skills", "#projects", "#contact"].includes(link.href)
  );

  return (
    <footer className="relative px-5 pb-10 pt-20 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <a href="#home" className="flex items-center gap-3 text-slate-900">
          <span className="text-2xl text-primary">
            <FaCode />
          </span>
          <span className="font-display text-[1.9rem] font-semibold tracking-tight">
            {personalInfo.name}
          </span>
        </a>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[1.1rem] font-medium text-slate-600 transition hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4">
          <a
            href={socialLinks.github || "https://github.com/AbixDev-10"}
            target={socialLinks.github ? "_blank" : undefined}
            rel={socialLinks.github ? "noreferrer" : undefined}
            aria-label="GitHub"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_16px_34px_-24px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:text-primary"
          >
            <FaGithub />
          </a>
          <a
            href={socialLinks.linkedin || "https://www.linkedin.com/in/abishek-s-3a2426345/"}
            target={socialLinks.linkedin ? "_blank" : undefined}
            rel={socialLinks.linkedin ? "noreferrer" : undefined}
            aria-label="LinkedIn"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_16px_34px_-24px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:text-primary"
          >
            <FaLinkedinIn />
          </a>
        </div>

        <p className="mt-14 text-[1.05rem] text-slate-500">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>

      <a
        href="#home"
        aria-label="Back to top"
        className="fixed bottom-7 right-7 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl text-white shadow-[0_18px_40px_-18px_rgba(216,78,85,0.45)] transition hover:-translate-y-1 hover:bg-rose-700"
      >
        <FaArrowUp />
      </a>
    </footer>
  );
}

export default Footer;
