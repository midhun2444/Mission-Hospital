import React from "react";

export default function GlassCard({ children, className = "", hover = true }) {
  return (
    <div
      className={`grad-border relative rounded-xl border border-slate-200 bg-surface shadow-glass ${
        hover ? "glow-hover transition-all duration-300 hover:-translate-y-0.5 shadow-glass-hover" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
