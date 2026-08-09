import React from "react";
import { Phone } from "lucide-react";
import Reveal from "./Reveal";

export default function Footer({ setPage }) {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white px-5 pb-10 pt-14 lg:px-8">
      <div className="mx-auto mb-10 max-w-7xl">
        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-[17px] text-navy">Need urgent care?</p>
              <p className="text-[12.5px] text-slate-500">Emergency is open 24/7 — call us any time.</p>
            </div>
            <a href="tel:04702602228" className="btn-ripple inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-rose-600">
              <Phone size={13} /> 0470-2602228
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <p className="font-display text-[15px] text-navy">Sivagiri Sree Narayana <span className="italic text-brand">MMH</span></p>
          <p className="mt-2 text-[12.5px] text-slate-500">Calm, modern, specialist-led care since 1999.</p>
        </Reveal>
        <Reveal delay={60}>
          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-400">Quick Links</p>
          <div className="mt-2.5 flex flex-col gap-1.5 text-[12.5px] text-slate-500">
            <button onClick={() => setPage("departments")} className="editorial-link w-fit text-left transition-colors hover:text-brand">Departments</button>
            <button onClick={() => setPage("doctors")} className="editorial-link w-fit text-left transition-colors hover:text-brand">Doctors</button>
            <button className="editorial-link w-fit text-left transition-colors hover:text-brand">Privacy Policy</button>
            <button className="editorial-link w-fit text-left transition-colors hover:text-brand">Terms of Service</button>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-400">Emergency</p>
          <p className="mt-2.5 text-[12.5px] font-semibold text-rose-500">0470-2602228</p>
          <p className="mt-1 text-[12.5px] text-slate-500">Open 24/7</p>
        </Reveal>
        <Reveal delay={180}>
          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-400">Connect</p>
          <p className="mt-2.5 text-[12.5px] text-slate-500">ssnmmhospital@gmail.com</p>
          <p className="text-[12.5px] text-slate-500">0470-2602228 / 2601228 / 2602248 / 2602249</p>
        </Reveal>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-slate-100 pt-6 text-[11.5px] text-slate-400">© 2026 Sivagiri Sree Narayana Medical Mission Hospital. All rights reserved.</p>
    </footer>
  );
}
