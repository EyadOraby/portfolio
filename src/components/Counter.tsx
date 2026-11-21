import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./hooks";

/** Counts up to a number the first time it scrolls into view. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(reduced ? value : 0);

  useEffect(() => {
    const el = ref.current;
    if (reduced || !el || !("IntersectionObserver" in window)) {
      setShown(value);
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1100);
        setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced, value]);

  return (
    <span ref={ref} className="counter" aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
    </span>
  );
}
