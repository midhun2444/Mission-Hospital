import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import GlassCard from "./GlassCard";

export default function CancelConfirmModal({ appointment, onDismiss, onConfirmed }) {
  const [input, setInput] = useState("");
  const canConfirm = input.trim().toLowerCase() === "cancel";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 backdrop-blur-sm p-4">
      <GlassCard className="w-full max-w-sm p-6" hover={false}>
        <div className="grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-rose-500">
          <AlertCircle size={22} />
        </div>
        <h3 className="mt-4 text-lg font-bold text-navy">Cancel this appointment?</h3>
        <p className="mt-1.5 text-[13px] text-slate-500">
          You're about to cancel your appointment with <span className="font-medium text-navy">{appointment.doctor}</span> on {appointment.date} (Token #{appointment.token}). This can't be undone.
        </p>
        <p className="mt-4 text-[12px] font-medium text-slate-500">
          Type <span className="font-bold text-rose-500">cancel</span> below to confirm.
        </p>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type cancel"
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
        />
        <div className="mt-5 flex gap-2">
          <button onClick={onDismiss} className="flex-1 rounded-full border border-slate-200 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-slate-50">
            Keep appointment
          </button>
          <button
            onClick={onConfirmed}
            disabled={!canConfirm}
            className="flex-1 rounded-full bg-rose-500 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Cancel appointment
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
