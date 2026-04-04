function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600">
          {eyebrow}
        </span>
      ) : null}
      <h2 className={eyebrow ? "section-title mt-4" : "section-title"}>{title}</h2>
      {description ? <p className="section-copy">{description}</p> : null}
    </div>
  );
}

export default SectionHeading;
