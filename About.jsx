import React from "react";
import Reveal from "../components/Reveal";

const VALUES = [
  { title: "Compassion", desc: "Every patient interaction starts with empathy." },
  { title: "Precision", desc: "Evidence-based care, no shortcuts." },
  { title: "Transparency", desc: "Clear pricing, clear timelines, clear communication." },
];
const MILESTONES = [
  { year: "1999", label: "Hospital founded in Varkala" },
  { year: "2010", label: "Multi-speciality expansion" },
  { year: "2018", label: "NABH accreditation" },
  { year: "2026", label: "30+ specialists, 8 departments" },
];

export default function About() {
  return (
    <section className="mx-auto max-w-7xl px-3 py-16 lg:px-6">
      <div className="about-grid grid gap-10 lg:gap-14">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">About Us</p>
          <h1 className="font-display mt-3 text-4xl leading-tight tracking-tight text-navy">A multi-speciality hospital in Varkala</h1>
          <p className="mt-4 text-[14px] leading-relaxed text-slate-500">
            Sivagiri Sree Narayana Medical Mission Hospital (SSNMMH) is guided by the founding principle:
            <span className="italic text-brand"> One Caste, One Religion, One God for Man.</span>
          </p>
        </Reveal>

        <div className="space-y-10">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Our Values</p>
            <div className="mt-4 divide-y divide-slate-100 border-t border-slate-100">
              {VALUES.map((v, i) => (
                <div key={i} className="flex items-start gap-5 py-5">
                  <span className="font-display text-[17px] text-slate-300">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[14px] font-semibold text-navy">{v.title}</p>
                    <p className="mt-1 text-[12.5px] text-slate-500">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Timeline</p>
            <div className="relative mt-5 space-y-6 pl-6">
              <div className="absolute bottom-1 left-1 top-1 w-px bg-slate-200" />
              {MILESTONES.map((m, i) => (
                <div key={i} className="relative flex items-baseline gap-4">
                  <span className="absolute -left-6 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-brand" />
                  <span className="text-[13px] font-semibold text-brand">{m.year}</span>
                  <span className="text-[13px] text-slate-500">{m.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
