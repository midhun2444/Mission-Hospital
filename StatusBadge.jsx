import React from "react";
import { CheckCircle2, XCircle, Clock3, AlertCircle } from "lucide-react";

const STATUS_MAP = {
  upcoming: { bg: "bg-blue-50", text: "text-brand", ring: "ring-blue-200", icon: Clock3, label: "Upcoming" },
  completed: { bg: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-200", icon: CheckCircle2, label: "Completed" },
  cancelled: { bg: "bg-rose-50", text: "text-rose-500", ring: "ring-rose-200", icon: XCircle, label: "Cancelled" },
  expired: { bg: "bg-slate-100", text: "text-slate-500", ring: "ring-slate-200", icon: AlertCircle, label: "Expired" },
};

export default function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.upcoming;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${s.bg} ${s.text} ${s.ring}`}>
      <Icon size={13} strokeWidth={2.5} />
      {s.label}
    </span>
  );
}
