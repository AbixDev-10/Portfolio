function Pill({ className = "", children }) {
  const classes = ["ui-pill", className].filter(Boolean).join(" ");

  return <span className={classes}>{children}</span>;
}

export default Pill;
