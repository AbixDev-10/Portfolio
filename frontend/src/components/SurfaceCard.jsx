function SurfaceCard({ className = "", children }) {
  const classes = ["surface-muted", className].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}

export default SurfaceCard;
