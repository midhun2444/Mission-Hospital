import React from "react";
import { MapPin, Phone, Mail, Ambulance, Globe } from "lucide-react";
import Reveal from "../components/Reveal";

export default function Contact() {
  return (
    <section className="pb-16">
      <div className="map-banner relative w-full bg-gradient-to-br from-blue-50 to-sky-100">
        <div className="absolute inset-0 grid place-items-center text-slate-400 text-[13px]">Map preview</div>
      </div>

      <div className="mx-auto max-w-7xl px-3 lg:px-6">
        <Reveal className="relative -mt-16 grid gap-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg lg:grid-cols-2">
          <div className="p-6 lg:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Contact</p>
            <h1 className="font-display mt-2 text-2xl tracking-tight text-navy">Get in touch</h1>
            <div className="mt-6 space-y-4 text-[13px]">
              <p className="flex items-center gap-3 text-slate-500"><MapPin size={16} className="text-brand" /> Varkala - 695141, Thiruvananthapuram, Kerala</p>
              <p className="flex items-center gap-3 text-slate-500"><Phone size={16} className="text-brand" /> 0470-2602228 / 2601228 / 2602248 / 2602249</p>
              <p className="flex items-center gap-3 text-slate-500"><Mail size={16} className="text-brand" /> ssnmmhospital@gmail.com</p>
              <p className="flex items-center gap-3 text-slate-500"><Globe size={16} className="text-brand" /> www.ssnmmhospital.com</p>
              <p className="flex items-center gap-3 font-semibold text-rose-500"><Ambulance size={16} /> Emergency: 0470-2602228</p>
            </div>
          </div>
          <div className="border-t border-slate-100 p-6 lg:border-l lg:border-t-0 lg:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Send a message</p>
            <div className="mt-4 space-y-3">
              <input placeholder="Your name" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
              <input placeholder="Email address" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
              <textarea placeholder="Message" rows={3} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
              <button className="btn-ripple w-full rounded-full grad-primary-r py-3 text-sm font-semibold text-white">Send Message</button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
