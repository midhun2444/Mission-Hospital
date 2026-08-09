import React, { useEffect, useState } from "react";
import { X, Calendar } from "lucide-react";
import GlassCard from "./GlassCard";
import { getAvailability } from "./api";

export default function RescheduleModal({ appointment, onDismiss, onConfirmed }) {
  const [date, setDate] = useState("");
  const [tokens, setTokens] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!date) return;
    const doctorId = appointment.doctor?.id || appointment.doctor?._id || appointment.doctorId;
    if (!doctorId) return;
    getAvailability({ doctorId, date }).then((data) => setTokens(data.tokens || []));
  }, [date, appointment]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 backdrop-blur-sm p-4">
      <GlassCard className="w-full max-w-sm p-6" hover={false}>
        <div className="grid h-12 w-12 place-items-center rounded-full bg-sky-50 text-brand">
          <Calendar size={22} />
        </div>
        <h3 className="mt-4 text-lg font-bold text-navy">Reschedule appointment</h3>
        <p className="mt-1.5 text-[13px] text-slate-500">
          Currently with <span className="font-medium text-navy">{appointment.doctor?.name || appointment.doctor}</span> on {appointment.date}, Token #{appointment.token}.
        </p>

        <label className="mt-4 block text-[12px] font-medium text-slate-500">New date</label>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={date}
          onChange={(e) => { setDate(e.target.value); setToken(null); }}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
        />

        {date && (
          <div className="mt-4">
            <label className="block text-[12px] font-medium text-slate-500">New token</label>
            <div className="mt-1.5 grid grid-cols-6 gap-1.5">
              {tokens.map((t) => (
                <button
                  key={t.token}
                  disabled={t.booked}
                  onClick={() => setToken(t.token)}
                  className={`flex aspect-square items-center justify-center rounded-lg text-[11px] font-semibold transition-all ${
                    t.booked
                      ? "cursor-not-allowed bg-slate-100 text-slate-300"
                      : token === t.token
                      ? "grad-primary-br text-white shadow-md shadow-blue-200"
                      : "bg-blue-50 text-brand hover:bg-blue-100"
                  }`}
                >
                  {t.booked ? <X size={11} /> : t.token}
                </button>
              ))}
            </div>
            {token && (
              <p className="mt-3 text-[12.5px] text-slate-500">
                New arrival time: <span className="font-semibold text-brand">{tokens.find((t) => t.token === token)?.arrivalTime}</span>
              </p>
            )}
          </div>
        )}

        <div className="mt-5 flex gap-2">
          <button onClick={onDismiss} className="flex-1 rounded-full border border-slate-200 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => onConfirmed({ date, token })}
            disabled={!date || !token}
            className="btn-ripple flex-1 rounded-full grad-primary-r py-2.5 text-[13px] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            Confirm new slot
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
