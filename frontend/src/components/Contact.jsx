import { useState } from "react";
import FormField from "./FormField";
import ScrollReveal from "./ScrollReveal";
import SectionShell from "./SectionShell";
import { contactCards } from "../data/portfolioData";

function Contact() {
  const apiBaseUrl = (import.meta.env.VITE_API_URL || "").trim().replace(/\/$/, "");
  const contactEndpoint = apiBaseUrl ? `${apiBaseUrl}/api/contact` : "/api/contact";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({
    type: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : { message: "Server returned an unexpected response." };

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message.");
      }

      setFormStatus({
        type: "success",
        message: "Message sent successfully. I will get back to you soon."
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
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
                <FormField
                  id="name"
                  label="Your Name"
                  placeholder=""
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
                <FormField
                  id="email"
                  type="email"
                  label="Your Email"
                  placeholder=""
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
                <FormField
                  id="subject"
                  label="Subject"
                  placeholder=""
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
                <FormField
                  id="message"
                  label="Message"
                  as="textarea"
                  rows="6"
                  placeholder=""
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-rose-700"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {formStatus.message ? (
                  <p
                    className={`rounded-2xl px-4 py-3 text-sm font-medium leading-6 ${
                      formStatus.type === "success"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {formStatus.message}
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
