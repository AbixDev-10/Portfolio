function ButtonLink({ href, variant = "primary", className = "", children, ...props }) {
  const variantClass = variant === "secondary" ? "secondary-button" : "primary-button";
  const classes = [variantClass, className].filter(Boolean).join(" ");

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}

export default ButtonLink;
