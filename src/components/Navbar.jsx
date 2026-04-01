import { useEffect, useState } from "react";
import { FaBars, FaCode, FaTimes } from "react-icons/fa";
import { navLinks, personalInfo } from "../data/portfolioData";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    const sectionElements = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const handleScroll = () => {
      const offset = window.scrollY + 140;
      let currentHref = "#home";

      sectionElements.forEach((section) => {
        if (section.offsetTop <= offset) {
          currentHref = `#${section.id}`;
        }
      });

      setActiveHref(currentHref);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-[0_10px_24px_-22px_rgba(15,23,42,0.28)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 lg:px-12">
        <a href="#home" className="flex items-center gap-3 text-slate-900">
          <span className="text-2xl text-primary">
            <FaCode />
          </span>
          <span className="font-display text-[1.7rem] font-semibold tracking-tight">
            {personalInfo.name}
          </span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                className={[
                  "border-b-2 pb-1 text-[1.05rem] font-medium transition duration-300",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-700 hover:border-primary hover:text-primary"
                ].join(" ")}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prevOpen) => !prevOpen)}
          className="rounded-full border border-slate-200 p-3 text-slate-700 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeHref === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActiveHref(link.href);
                    setIsOpen(false);
                  }}
                  className={[
                    "text-base font-medium transition",
                    isActive ? "text-primary" : "text-slate-700"
                  ].join(" ")}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
