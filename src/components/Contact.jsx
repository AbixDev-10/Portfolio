import { useState } from "react";
import FormField from "./FormField";
import ScrollReveal from "./ScrollReveal";
import SectionShell from "./SectionShell";
import { contactCards } from "../data/portfolioData";

function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <SectionShell id="contact" className="pb-24">
      <ScrollReveal>
        <section className="max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Get In
            </p>
            <h2 className="mt-2 font-display text-[2rem] font-bold tracking-tight text-slate-900 md:text-[2.4rem]">
              Touch
            </h2>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-[31rem]">
              <div className="grid gap-8">
                {contactCards.map((item) => {
                  const Icon = item.icon;
                  const Wrapper = item.href ? "a" : "div";
                  const props = item.href
                    ? { href: item.href, target: "_blank", rel: "noreferrer" }
                    : {};

                  return (
                    <Wrapper key={item.label} className="flex items-center gap-5" {...props}>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg text-white">
                        <Icon />
                      </div>
                      <div>
                        <h3 className="text-[1.05rem] font-semibold leading-none text-slate-900 md:text-[1.15rem]">
                          {item.label}
                        </h3>
                        <p className="mt-2 text-[1rem] text-slate-600 md:text-[1.05rem]">
                          {item.value}
                        </p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>

            <form
              className="animate-float rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.28)] lg:-mt-4 md:p-8"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-6">
                <FormField id="name" label="Your Name" placeholder="" />
                <FormField id="email" type="email" label="Your Email" placeholder="" />
                <FormField id="subject" label="Subject" placeholder="" />
                <FormField id="message" label="Message" as="textarea" rows="6" placeholder="" />
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-rose-700"
                >
                  Send Message
                </button>
                {formSubmitted ? (
                  <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-primary">
                    Thanks for reaching out. Connect your mail service or backend endpoint to make
                    this form fully functional.
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </section>
      </ScrollReveal>
    </SectionShell>
  );
}

export default Contact;
