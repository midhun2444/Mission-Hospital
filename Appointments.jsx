import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import GlassCard from "../components/GlassCard";
import StatusBadge from "../components/StatusBadge";
import CancelConfirmModal from "../components/CancelConfirmModal";
import RescheduleModal from "../components/RescheduleModal";
import { getPatientAppointments, cancelAppointment, rescheduleAppointment } from "../services/api";

const FILTERS = ["all", "upcoming", "completed", "cancelled", "expired"];

export default function Appointments({ appointments: liveAppointments, onUpdate, openBooking, patientId = "demo-patient" }) {
  const [filter, setFilter] = useState("all");
  const [cancelTarget, setCancelTarget] = useState(null);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [fetched, setFetched] = useState([]);

  // Prefer appointments booked this session (passed down from App); fall back
  // to fetching the patient's history from the API for a returning session.
  useEffect(() => {
    if (!liveAppointments || liveAppointments.length === 0) {
      getPatientAppointments(patientId).then(setFetched);
    }
  }, [patientId, liveAppointments]);

  const appointments = liveAppointments && liveAppointments.length > 0 ? liveAppointments : fetched;
  const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  function applyUpdate(id, changes) {
    onUpdate ? onUpdate(id, changes) : setFetched((prev) => prev.map((a) => ((a.id || a._id) === id ? { ...a, ...changes } : a)));
  }

  async function handleCancel(id) {
    await cancelAppointment(id);
    applyUpdate(id, { status: "cancelled" });
  }

  async function handleReschedule(id, { date, token }) {
    const result = await rescheduleAppointment(id, { date, token });
    applyUpdate(id, { date, token, arrivalTime: result.arrivalTime, status: "upcoming" });
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-14 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">My Appointments</p>
        <h1 className="font-display mt-2 text-3xl tracking-tight text-navy">Your visit history</h1>
      </div>

      {appointments.length === 0 ? (
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-[32px] border-2 border-dashed border-slate-200 py-14 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-sky-50 text-brand">
            <Calendar size={24} />
          </div>
          <p className="text-[15px] font-semibold text-navy">No appointments yet</p>
          <p className="text-[13px] text-slate-500">Once you book an appointment, it'll show up here.</p>
          <button
            onClick={openBooking}
            className="mt-2 rounded-full grad-primary-r px-6 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-blue-100 transition-transform hover:scale-[1.03]"
          >
            Book Appointment
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${
                  filter === f ? "bg-brand text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map((a) => {
              const id = a.id || a._id;
              return (
                <GlassCard key={id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-50 text-brand">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-navy">{a.doctor?.name || a.doctor}</p>
                      <p className="text-[12px] text-slate-500">{a.department?.name || a.dept} · {a.date} · Token #{a.token} · {a.arrivalTime || a.time}</p>
                      <p className="text-[10.5px] text-slate-400">{id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={a.status} />
                    {a.status === "upcoming" && (
                      <div className="flex gap-1.5">
                        <button onClick={() => setRescheduleTarget(a)} className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-50">Reschedule</button>
                        <button onClick={() => setCancelTarget(a)} className="rounded-full border border-rose-100 px-3 py-1.5 text-[11px] font-medium text-rose-500 hover:bg-rose-50">Cancel</button>
                      </div>
                    )}
                  </div>
                </GlassCard>
              );
            })}
            {filtered.length === 0 && <p className="py-10 text-center text-sm text-slate-400">No appointments in this category.</p>}
          </div>
        </>
      )}

      {cancelTarget && (
        <CancelConfirmModal
          appointment={cancelTarget}
          onDismiss={() => setCancelTarget(null)}
          onConfirmed={() => {
            handleCancel(cancelTarget.id || cancelTarget._id);
            setCancelTarget(null);
          }}
        />
      )}
      {rescheduleTarget && (
        <RescheduleModal
          appointment={rescheduleTarget}
          onDismiss={() => setRescheduleTarget(null)}
          onConfirmed={({ date, token }) => {
            handleReschedule(rescheduleTarget.id || rescheduleTarget._id, { date, token });
            setRescheduleTarget(null);
          }}
        />
      )}
    </section>
  );
}
