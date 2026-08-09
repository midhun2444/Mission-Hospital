import React, { useState } from "react";
import { Menu, X, Sparkles, Sun, Moon, Stethoscope } from "lucide-react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "doctors", label: "Doctors" },
  { id: "departments", label: "Departments" },
  { id: "contact", label: "Contact" },
  { id: "appointments", label: "My Appointments" },
  { id: "support", label: "Support" },
];

export default function Header({ page, setPage, dark, setDark, openBooking, openAI }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 lg:px-6">
        <button onClick={() => setPage("home")} className="flex shrink-0 items-center gap-2 group">
          <Stethoscope size={18} className="text-brand" strokeWidth={1.5} />
          <span className="font-display text-[15px] tracking-tight text-navy">
            Sivagiri Sree Narayana <span className="italic text-brand">MMH</span>
          </span>
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`editorial-link text-[11px] font-medium uppercase tracking-widest transition-colors ${
                page === l.id ? "text-brand" : "text-slate-500 hover:text-navy"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button onClick={() => setDark(!dark)} className="text-slate-400 transition-colors hover:text-brand">
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button onClick={openAI} className="text-slate-400 transition-colors hover:text-brand">
            <Sparkles size={15} />
          </button>
          <button
            onClick={openBooking}
            className="btn-ripple rounded-full grad-primary-r px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          >
            Book Appointment
          </button>
        </div>

        <button className="grid h-8 w-8 place-items-center text-slate-500 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <div className="menu-slide border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => { setPage(l.id); setMenuOpen(false); }}
              className={`block w-full border-b border-slate-100 py-3 text-left text-sm font-medium transition-colors last:border-0 ${page === l.id ? "text-brand" : "text-slate-600"}`}
            >
              {l.label}
            </button>
          ))}
          <button onClick={openBooking} className="btn-ripple mt-3 w-full rounded-full grad-primary-r px-5 py-2.5 text-sm font-semibold text-white">
            Book Appointment
          </button>
        </div>
      )}
    </header>
  );
}
