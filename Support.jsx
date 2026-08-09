import React, { useState } from "react";
import { Phone, MessageCircle, Mail, ChevronDown } from "lucide-react";
import Reveal from "../components/Reveal";

const FAQS = [
  { q: "How do I reschedule an appointment?", a: "Go to My Appointments, select the upcoming visit, and choose Reschedule." },
  { q: "Can I book without visiting in person?", a: "Yes — use Book Appointment or the AI Assistant to book entirely online." },
  { q: "What should I bring for a first visit?", a: "A government ID and any prior medical records or referral letters." },
];

export default function Support() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-7xl px-3 py-16 lg:px-6">
      <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
        <Reveal className="lg:sticky lg:top-24 lg:col-span-1 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">Support</p>
          <h1 className="font-display mt-2 text-2xl tracking-tight text-navy">How can we help?</h1>
          <p className="mt-3 text-[12.5px] text-slate-500">Prefer to talk to someone directly? Reach us any of these ways.</p>
          <div className="mt-6 space-y-1.5">
            <a href="tel:04702602228" className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-3 text-[12.5px] text-slate-500 transition-colors hover:border-brand/40 hover:text-brand">
              <Phone size={15} className="text-brand" /> Call the hospital
            </a>
            <button className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-3 text-[12.5px] text-slate-500 transition-colors hover:border-brand/40 hover:text-brand">
              <MessageCircle size={15} className="text-brand" /> WhatsApp us
            </button>
            <a href="mailto:ssnmmhospital@gmail.com" className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-3 text-[12.5px] text-slate-500 transition-colors hover:border-brand/40 hover:text-brand">
              <Mail size={15} className="text-brand" /> Email support
            </a>
          </div>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Frequently asked</p>
          <div className="mt-4 divide-y divide-slate-100 border-t border-b border-slate-100">
            {FAQS.map((f, i) => (
              <div key={i}>
                <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between py-4 text-left">
                  <span className="text-[14px] font-semibold text-navy">{f.q}</span>
                  <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <p className="pb-4 text-[13px] text-slate-500">{f.a}</p>}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
