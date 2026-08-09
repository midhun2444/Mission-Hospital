import React from "react";
import * as Icons from "lucide-react";
import { ShieldCheck, ArrowRight, Sparkles, Activity, Ambulance, Pill, FlaskConical, Star, Stethoscope } from "lucide-react";
import GlassCard from "../components/GlassCard";
import Reveal from "../components/Reveal";
import AnimatedCounter from "../components/AnimatedCounter";
import DepartmentsGrid from "../components/DepartmentsGrid";
import { magneticMove, magneticReset, parallaxMove } from "../utils/interactions";
import { STATS, TESTIMONIALS } from "../data/mockData";

function Hero({ openBooking, openAI }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-20 -top-32 h-96 w-96 rounded-full glow-blue-blob blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-40 h-80 w-80 rounded-full glow-sky-blob blur-3xl" />

      <div className="hero-grid mx-auto grid max-w-7xl items-stretch gap-0 px-3 pb-10 pt-6 lg:gap-6 lg:px-6 lg:pb-16 lg:pt-10">
        {/* left: content panel */}
        <Reveal className="flex flex-col justify-center px-4 py-10 lg:px-6 lg:py-16">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-brand">
            <ShieldCheck size={14} /> NABH Accredited Care
          </div>
          <h1 className="font-display mt-5 text-[40px] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[52px] lg:text-[60px]">
            Healthcare that feels
            <span className="block grad-text">calm, clear, and human.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-slate-600">
            Sivagiri Sree Narayana Medical Mission Hospital pairs specialists across every department with a booking system that tells you exactly when to arrive — down to the minute.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <button
              onClick={openBooking}
              onMouseMove={magneticMove}
              onMouseLeave={magneticReset}
              className="btn-ripple pulse-ring group relative inline-flex items-center gap-2 rounded-full grad-primary-r px-6 py-3.5 text-[14.5px] font-semibold text-white transition-transform duration-200 ease-out active:scale-95"
            >
              Book Appointment <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={openAI}
              className="btn-ripple inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy transition-colors hover:border-brand/40 hover:text-brand"
            >
              <Sparkles size={16} /> Talk to AI Assistant
            </button>
          </div>
          <div className="mt-10 flex items-center gap-5 border-t border-slate-100 pt-6">
            <div className="flex -space-x-3">
              {["AS", "RV", "MI", "KM"].map((initials, i) => (
                <div key={i} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white grad-primary-br text-[10.5px] font-bold text-white">{initials}</div>
              ))}
            </div>
            <p className="text-[12.5px] text-slate-500"><span className="font-semibold text-navy">30+ specialists</span> across 8 departments</p>
          </div>
        </Reveal>

        {/* right: floating panel */}
        <Reveal delay={150} className="hero-panel min-h-420 relative flex flex-col justify-center overflow-hidden rounded-xl border border-slate-200 p-6 lg:min-h-0 lg:p-8">
          <Stethoscope className="pointer-events-none absolute -right-6 -bottom-6" size={180} strokeWidth={0.75} style={{ color: "rgba(10,132,255,0.08)" }} />

          <div onMouseMove={parallaxMove} onMouseLeave={magneticReset} className="transition-transform duration-200 ease-out">
            <GlassCard className="relative p-5" hover={false}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand" /> Live Queue · Cardiology
                  </p>
                  <p className="mt-1 text-2xl font-bold text-navy">Token 07</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                  <Activity size={22} className="animate-pulse" />
                </div>
              </div>
              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[42%] rounded-full grad-primary-br animate-pulse" />
              </div>
              <p className="mt-2 text-xs text-slate-500">Estimated arrival: 10:00 AM · Dr. Aanya Sharma</p>
            </GlassCard>

            <GlassCard className="relative mt-4 p-4" hover={false}>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 text-white text-xs font-bold">AS</div>
                <div>
                  <p className="text-sm font-semibold text-navy">Dr. Aanya Sharma</p>
                  <p className="text-[11px] text-slate-500">Cardiology · 14 yrs</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10.5px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> On duty
                </span>
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-7xl px-3 lg:px-6">
        <div className="border-t border-slate-200" />
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="px-3 lg:px-6">
      <Reveal className="mx-auto -mt-8 max-w-7xl">
        <GlassCard className="grid grid-cols-2 gap-0 divide-x divide-y divide-slate-100 p-0 sm:grid-cols-4 sm:divide-y-0" hover={false}>
          {STATS.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.Activity;
            return (
              <div key={i} className="flex flex-col items-center gap-2 px-4 py-6 text-center">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/10 text-brand">
                  <Icon size={20} />
                </div>
                <p className="text-2xl font-bold text-navy">
                  <AnimatedCounter value={s.value} />+
                </p>
                <p className="text-xs font-medium text-slate-500">{s.label}</p>
              </div>
            );
          })}
        </GlassCard>
      </Reveal>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="overflow-hidden px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-brand">What patients say</p>
        </Reveal>
      </div>
      <div className="testimonial-track flex gap-5 animate-scroll hover:[animation-play-state:paused]">
        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
          <GlassCard key={i} className="w-80 shrink-0 p-6" hover={false}>
            <div className="flex gap-0.5 text-amber-400">
              {[...Array(5)].map((_, j) => <Star key={j} size={13} fill={j < t.rating ? "currentColor" : "none"} strokeWidth={1.5} />)}
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">"{t.text}"</p>
            <p className="mt-3 text-[12.5px] font-semibold text-navy">{t.name}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

function Facilities() {
  const items = [
    { icon: Ambulance, label: "24/7 Emergency" },
    { icon: Pill, label: "In-house Pharmacy" },
    { icon: FlaskConical, label: "Diagnostic Lab" },
    { icon: ShieldCheck, label: "Health Packages" },
  ];
  return (
    <section className="px-5 pb-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <Reveal key={i} delay={i * 80}>
              <GlassCard className="flex flex-col items-center gap-3 p-7 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-2xl grad-primary-br text-white shadow-md shadow-blue-200">
                  <Icon size={20} />
                </div>
                <p className="text-[13.5px] font-semibold text-navy">{it.label}</p>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default function Home({ openBooking, openAI, goDept }) {
  return (
    <>
      <Hero openBooking={openBooking} openAI={openAI} />
      <StatsBar />
      <DepartmentsGrid onPick={goDept} />
      <Facilities />
      <Testimonials />
    </>
  );
}
