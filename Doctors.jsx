import React, { useEffect, useState } from "react";
import { Search, Building2, Star, ChevronDown } from "lucide-react";
import GlassCard from "./GlassCard";
import Reveal from "./Reveal";
import { getDoctors, getDepartments } from "./api";

export default function Doctors({ onBook, presetDept }) {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState(presetDept || "all");
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { getDepartments().then(setDepartments); }, []);
  useEffect(() => { if (presetDept) setDept(presetDept); }, [presetDept]);
  useEffect(() => {
    setLoading(true);
    getDoctors({ department: dept, search: query }).then((d) => {
      setDoctors(d);
      setLoading(false);
    });
  }, [dept, query]);

  const todayShort = new Date().toLocaleDateString("en-US", { weekday: "short" });

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <Reveal className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Our Doctors</p>
        <h1 className="font-display mt-2 text-3xl tracking-tight text-navy">Find the right specialist</h1>
      </Reveal>

      <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctor or department..."
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-navy outline-none transition-all focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
        </div>
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-navy outline-none focus:border-brand"
        >
          <option value="all">All Departments</option>
          {departments.map((d) => <option key={d.slug || d.id} value={d.slug || d.id}>{d.name}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-5 rounded-xl border border-slate-100 p-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
                <div className="skeleton h-16 w-16 shrink-0 rounded-2xl" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3.5 w-3/4 rounded-full" />
                  <div className="skeleton h-3 w-1/2 rounded-full" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="skeleton h-5 w-40 rounded-full" />
                <div className="skeleton h-3 w-2/3 rounded-full" />
              </div>
              <div className="skeleton h-9 w-full rounded-full sm:w-40" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {doctors.map((doc, i) => {
            const days = doc.days || doc.availableDays || [];
            const availableToday = days.includes(todayShort);
            const id = doc.id || doc._id;
            const isOpen = expanded === id;
            const langs = doc.langs || doc.languages || [];
            return (
              <Reveal key={id} delay={(i % 6) * 60}>
                <GlassCard className="overflow-hidden p-0" hover={false}>
                  <button
                    onClick={() => setExpanded(isOpen ? null : id)}
                    className="glow-hover flex w-full flex-col gap-5 p-5 text-left transition-all duration-300 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
                      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl grad-primary-br text-[17px] font-bold text-white shadow-md shadow-blue-200">
                        {doc.photo || doc.photoInitials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-semibold text-navy">{doc.name}</p>
                        <p className="text-[12.5px] text-slate-500">{doc.qual || doc.qualification}</p>
                        <div className="mt-1 flex items-center gap-1 text-amber-400">
                          <Star size={12} fill="currentColor" />
                          <span className="text-[11px] font-medium text-slate-500">{doc.rating || 4.5} rating</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-px w-full bg-slate-100 sm:h-14 sm:w-px" />

                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10.5px] font-semibold text-brand">
                          <Building2 size={10} /> {doc.deptName || doc.department?.name}
                        </span>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
                          availableToday ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${availableToday ? "bg-emerald-500" : "bg-amber-500"}`} />
                          {availableToday ? "Available Today" : `Next: ${days[0]}`}
                        </span>
                      </div>
                    </div>

                    <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="msg-in border-t border-slate-100 bg-sky-50/40 p-5">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-400">Available Days</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                              <span key={d} className={`grid h-7 w-7 place-items-center rounded-full text-[10.5px] font-semibold ${
                                days.includes(d) ? "grad-primary-r text-white" : "bg-slate-100 text-slate-400"
                              }`}>{d[0]}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-400">Consultation Time</p>
                          <p className="mt-2 text-[13px] text-navy">{doc.time || `${doc.consultationStart} – ${doc.consultationEnd}`}</p>
                        </div>
                        <div>
                          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-400">Languages</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {langs.map((l) => (
                              <span key={l} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10.5px] font-medium text-slate-500">{l}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onBook(doc)}
                        className="btn-ripple mt-5 w-full rounded-full grad-primary-r px-6 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-blue-100 transition-transform hover:scale-[1.02] active:scale-95 sm:w-auto"
                      >
                        Book Appointment
                      </button>
                    </div>
                  )}
                </GlassCard>
              </Reveal>
            );
          })}
          {doctors.length === 0 && <p className="py-10 text-center text-sm text-slate-400">No doctors match that search.</p>}
        </div>
      )}
    </section>
  );
}
