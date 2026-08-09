import React, { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles, Maximize2, Minimize2 } from "lucide-react";
import { askAI } from "../services/api";

const SUGGESTIONS = ["Hospital timings?", "Cardiologist availability", "Book with orthopedics", "Where is the hospital?"];

export default function AIAssistant({ open, onClose }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi, I'm the SSNMMH AI Assistant. Ask me about doctors, timings, or book an appointment right here." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open, typing]);

  async function send() {
    if (!input.trim() || typing) return;
    const text = input;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    const reply = await askAI(text);
    setMessages((m) => [...m, { role: "ai", text: reply }]);
    setTyping(false);
  }

  if (!open) return null;

  return (
    <div className={
      expanded
        ? "fixed inset-3 z-50 flex flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl sm:inset-8"
        : "fixed bottom-20 right-5 z-50 flex h-[520px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl sm:bottom-6 sm:right-6"
    }>
      <div className="flex items-center justify-between grad-primary-r px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-white/20"><Sparkles size={15} className="text-white" /></div>
          <div>
            <p className="text-[13.5px] font-semibold text-white">Hospital AI</p>
            <p className="flex items-center gap-1.5 text-[10.5px] text-blue-100">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-300" /> Online now
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setExpanded(!expanded)} className="grid h-7 w-7 place-items-center rounded-full text-white/80 hover:bg-white/10">
            {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button onClick={onClose} className="grid h-7 w-7 place-items-center rounded-full text-white/80 hover:bg-white/10"><X size={15} /></button>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <div key={i} className={`msg-in flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "ai" && (
              <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full grad-primary-br">
                <Sparkles size={11} className="text-white" />
              </div>
            )}
            <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed ${
              m.role === "user" ? "bg-brand text-white rounded-br-sm" : "bg-slate-100 text-navy rounded-bl-sm"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="msg-in flex items-end justify-start gap-2">
            <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full grad-primary-br">
              <Sparkles size={11} className="text-white" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="flex flex-wrap gap-1.5 px-4 pb-2">
        {SUGGESTIONS.map((s, i) => (
          <button key={i} onClick={() => setInput(s)} className="rounded-full border border-slate-200 px-2.5 py-1 text-[10.5px] text-slate-500 hover:border-brand/40 hover:text-brand transition-colors">
            {s}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-slate-100 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about doctors, timings, booking..."
          className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-[12.5px] outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
        />
        <button onClick={send} className="btn-ripple grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white transition-transform hover:scale-[1.02] active:scale-95"><Send size={14} /></button>
      </div>
    </div>
  );
}
