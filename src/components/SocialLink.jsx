function SocialLink({ href, icon, label, className = "" }) {
  const classes = ["secondary-button px-5 py-3", className].filter(Boolean).join(" ");
  const Icon = icon;

  return (
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      <Icon />
      {label}
    </a>
  );
}

export default SocialLink;
