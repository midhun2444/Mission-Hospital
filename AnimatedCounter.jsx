import React, { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ value, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => entry.isIntersecting && setStarted(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.max(1, Math.floor(value / (duration / 16)));
    const t = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(t);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(t);
  }, [started, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}
