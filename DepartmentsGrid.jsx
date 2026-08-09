import React, { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import GlassCard from "./GlassCard";
import Reveal from "./Reveal";
import { getDepartments } from "../services/api";

export default function DepartmentsGrid({ onPick }) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments().then(setDepartments);
  }, []);

  return (
    <section className="section-tint px-3 py-20 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Departments</p>
            <h2 className="font-display mt-2 text-3xl tracking-tight text-navy">Specialist care, organized clearly</h2>
          </div>
          <p className="max-w-xs text-[13px] text-slate-500">Departments, one unified booking flow — pick a specialty to see doctors and open dates.</p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {departments.map((d, i) => {
            const Icon = Icons[d.icon] || Icons.Stethoscope;
            const id = d.slug || d.id;
            const featured = i === 0;
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={id} delay={(i % 4) * 70} className={featured ? "col-span-2 row-span-2" : ""}>
                {featured ? (
                  <button
                    onClick={() => onPick(id)}
                    className="glow-hover relative flex h-full w-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-display text-[40px] leading-none text-slate-200">{num}</span>
                      <Icon size={20} className="text-brand" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[17px] font-display text-navy">{d.name}</p>
                      <p className="mt-1 text-[12.5px] text-slate-500">{d.desc || d.description}</p>
                      <p className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-brand">
                        {d.doctorCount ?? d.count ?? 0} doctors <ArrowRight size={12} />
                      </p>
                    </div>
                  </button>
                ) : (
                  <GlassCard className="flex h-full flex-col p-5">
                    <button onClick={() => onPick(id)} className="flex h-full w-full flex-col text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-[15px] text-slate-300">{num}</span>
                        <Icon size={16} className="text-brand" strokeWidth={1.5} />
                      </div>
                      <p className="mt-3.5 text-[14px] font-semibold text-navy">{d.name}</p>
                      <p className="mt-1 text-[11.5px] text-slate-500">{d.desc || d.description}</p>
                      <p className="mt-auto pt-2 text-[11px] font-medium text-brand">{d.doctorCount ?? d.count ?? 0} doctors →</p>
                    </button>
                  </GlassCard>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
