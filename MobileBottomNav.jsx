import React from "react";
import { Building2, Stethoscope, Calendar, MessageCircle, Plus } from "lucide-react";

export default function MobileBottomNav({ page, setPage, openBooking }) {
  const items = [
    { id: "home", label: "Home", icon: Building2 },
    { id: "doctors", label: "Doctors", icon: Stethoscope },
    { id: "appointments", label: "Visits", icon: Calendar },
    { id: "support", label: "Support", icon: MessageCircle },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-2 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between px-2 py-2">
        {items.slice(0, 2).map((it) => {
          const Icon = it.icon;
          const active = page === it.id;
          return (
            <button key={it.id} onClick={() => setPage(it.id)} className="flex flex-1 flex-col items-center gap-1 py-1.5">
              <Icon size={20} className={active ? "text-brand" : "text-slate-400"} strokeWidth={active ? 2.2 : 1.8} />
              <span className={`text-[10.5px] font-medium ${active ? "text-brand" : "text-slate-400"}`}>{it.label}</span>
            </button>
          );
        })}
        <button onClick={() => openBooking(null)} className="btn-ripple -mt-6 grid h-14 w-14 shrink-0 place-items-center rounded-full grad-primary-r text-white shadow-xl shadow-blue-300">
          <Plus size={22} />
        </button>
        {items.slice(2).map((it) => {
          const Icon = it.icon;
          const active = page === it.id;
          return (
            <button key={it.id} onClick={() => setPage(it.id)} className="flex flex-1 flex-col items-center gap-1 py-1.5">
              <Icon size={20} className={active ? "text-brand" : "text-slate-400"} strokeWidth={active ? 2.2 : 1.8} />
              <span className={`text-[10.5px] font-medium ${active ? "text-brand" : "text-slate-400"}`}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
