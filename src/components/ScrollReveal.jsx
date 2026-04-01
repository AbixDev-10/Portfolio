import { useEffect, useRef, useState } from "react";

function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.06,
  translateY = 28,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -2% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  const classes = ["scroll-reveal", isVisible ? "is-visible" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={elementRef}
      className={classes}
      style={{
        transitionDelay: `${delay}ms`,
        "--reveal-offset": `${translateY}px`,
      }}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
