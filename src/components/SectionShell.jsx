function SectionShell({ id, className = "", children }) {
  const classes = ["section-shell", className].filter(Boolean).join(" ");

  return (
    <section id={id} className={classes}>
      {children}
    </section>
  );
}

export default SectionShell;
