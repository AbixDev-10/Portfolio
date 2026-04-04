function Panel({ className = "", children }) {
  const classes = ["section-panel", className].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}

export default Panel;
