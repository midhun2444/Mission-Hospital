import React, { useEffect, useState } from "react";
import {
  X, Check, ChevronRight, ChevronLeft, Search, CheckCircle2,
  QrCode, Download, Printer, Share2, Building2,
} from "lucide-react";
import GlassCard from "./GlassCard";
import {
  getDepartments, getDoctors, lookupPatientByFileNumber, registerPatient,
  getAvailability, bookAppointment,
} from "./api";

const STEPS = ["Visit history", "Your details", "Select doctor", "Choose token", "Confirmation"];

export default function BookingModal({ presetDoctor, onClose, onConfirmed }) {
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState(null);
  const [fileNumber, setFileNumber] = useState("");
  const [patientFound, setPatientFound] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", gender: "", phone: "", email: "", address: "" });
  const [touched, setTouched] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");

  const [departments, setDepartments] = useState([]);
  const [dept, setDept] = useState(presetDoctor ? presetDoctor.dept : "");
  const [date, setDate] = useState("");
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [doctor, setDoctor] = useState(presetDoctor || null);

  const [tokens, setTokens] = useState([]);
  const [token, setToken] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getDepartments().then(setDepartments); }, []);

  useEffect(() => {
    if (!dept || !date) { setAvailableDoctors([]); return; }
    const weekday = new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" });
    getDoctors({ department: dept }).then((list) => {
      setAvailableDoctors(list.filter((d) => (d.days || d.availableDays || []).includes(weekday)));
    });
  }, [dept, date]);

  useEffect(() => {
    if (!doctor || !date) return;
    getAvailability({ doctorId: doctor.id || doctor._id, date }).then((data) => setTokens(data.tokens || []));
  }, [doctor, date]);

  const patient = patientFound || form;

  async function searchFileNumber() {
    const found = await lookupPatientByFileNumber(fileNumber.trim());
    setPatientFound(found);
  }

  const validators = {
    name: (v) => (v.trim().length >= 2 ? "" : "Enter your full name"),
    age: (v) => (v && Number(v) > 0 && Number(v) < 120 ? "" : "Enter a valid age"),
    gender: (v) => (v ? "" : "Select a gender"),
    phone: (v) => (/^[6-9]\d{9}$/.test(v) ? "" : "Enter a valid 10-digit phone number"),
    email: (v) => (v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address"),
    address: (v) => (v.trim().length >= 5 ? "" : "Enter your full address"),
  };
  const errors = Object.fromEntries(Object.keys(form).map((k) => [k, validators[k](form[k])]));
  const formIsValid = ["name", "age", "gender", "phone", "address"].every((k) => !errors[k]) && !errors.email;
  const canProceedFromDetails = visited === "yes" ? !!patientFound : formIsValid && otpVerified;

  function sendOtp() {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setOtpCode(code);
    setOtpSent(true);
    setOtpInput("");
    setOtpError("");
    // Demo only — no real SMS gateway wired up, so the code is surfaced here
    // for testing. In production this call would hit an SMS provider instead.
    window.alert(`Demo OTP sent to ${form.phone}: ${code}`);
  }

  function verifyOtp() {
    if (otpInput === otpCode) {
      setOtpVerified(true);
      setOtpError("");
    } else {
      setOtpError("Incorrect code. Please try again.");
    }
  }

  async function goNext() {
    if (step === 0 && visited === "yes" && patientFound) {
      setStep(2);
    } else if (step === 3) {
      setLoading(true);
      try {
        let patientId = patientFound?.id || patientFound?._id;
        if (!patientId) {
          const created = await registerPatient(form);
          patientId = created.id || created._id;
        }
        const appt = await bookAppointment({
          patientId,
          doctorId: doctor.id || doctor._id,
          date,
          token,
          bookedVia: "web",
        });
        setConfirmation(appt);
        onConfirmed?.({
          id: appt.id || appt._id || `MH-${Math.floor(1000 + Math.random() * 9000)}`,
          doctor: doctor.name,
          dept: doctor.deptName || doctor.department?.name,
          date,
          token,
          time: appt.arrivalTime,
          status: "upcoming",
        });
        setStep(4);
      } finally {
        setLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  }

  function goBack() {
    if (step === 2 && visited === "yes" && patientFound) {
      setStep(0);
    } else {
      setStep(Math.max(0, step - 1));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/40 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="relative flex h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[32px] bg-white shadow-2xl sm:h-[88vh] sm:rounded-[32px]">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-[15px] font-semibold text-navy">Book Appointment</p>
            {step < 4 && <p className="text-[11.5px] text-slate-400">Step {step + 1} of 4 · {STEPS[step]}</p>}
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        {step < 4 && (
          <div className="flex items-center px-6 pt-5">
            {[0, 1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold transition-all duration-300 ${
                    i < step ? "grad-primary-r text-white" : i === step ? "step-active bg-white text-brand" : "bg-surface-muted text-slate-500"
                  }`}>
                    {i < step ? <Check size={13} /> : i + 1}
                  </div>
                  <span className={`hidden text-[10.5px] font-medium sm:block ${i === step ? "text-brand" : "text-slate-400"}`}>{STEPS[i]}</span>
                </div>
                {i < 3 && <div className={`mx-1.5 h-px flex-1 transition-colors duration-300 ${i < step ? "bg-brand" : "bg-slate-100"}`} style={{ marginBottom: "16px" }} />}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-600">Have you visited before?</p>
              <div className="grid grid-cols-2 gap-3">
                {["yes", "no"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setVisited(v)}
                    className={`rounded-2xl border-2 p-5 text-center transition-all ${
                      visited === v ? "border-brand bg-brand/5" : "border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <p className="text-lg font-semibold text-navy">{v === "yes" ? "Yes" : "No"}</p>
                    <p className="mt-1 text-[11.5px] text-slate-400">{v === "yes" ? "Returning patient" : "First time here"}</p>
                  </button>
                ))}
              </div>

              {visited === "yes" && (
                <div className="mt-2 space-y-3 rounded-2xl bg-slate-50 p-4">
                  <label className="text-xs font-medium text-slate-500">File Number (6 digits)</label>
                  <div className="flex gap-2">
                    <input
                      value={fileNumber}
                      onChange={(e) => setFileNumber(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="e.g. 000123"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
                    />
                    <button onClick={searchFileNumber} disabled={fileNumber.length !== 6} className="rounded-xl bg-brand px-4 text-white disabled:opacity-40">
                      <Search size={16} />
                    </button>
                  </div>
                  {patientFound && (
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3.5 text-[13px] text-emerald-700">
                      <p className="flex items-center gap-1.5 font-semibold"><Check size={14} /> Patient found</p>
                      <p className="mt-1 text-emerald-600">{patientFound.name} · {patientFound.age} yrs · {patientFound.gender}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="field-group">
                <input
                  id="f-name" value={form.name} placeholder=" "
                  onBlur={() => setTouched({ ...touched, name: true })}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full rounded-xl border bg-white px-3.5 text-sm outline-none focus:ring-4 ${
                    touched.name && errors.name ? "field-error border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-brand focus:ring-brand/10"
                  }`}
                />
                <label htmlFor="f-name">Full Name</label>
                {touched.name && errors.name && <p className="mt-1 text-[11px] text-rose-500">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="field-group">
                  <input
                    id="f-age" type="number" min="0" max="119" value={form.age} placeholder=" "
                    onBlur={() => setTouched({ ...touched, age: true })}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className={`w-full rounded-xl border bg-white px-3.5 text-sm outline-none focus:ring-4 ${
                      touched.age && errors.age ? "field-error border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-brand focus:ring-brand/10"
                    }`}
                  />
                  <label htmlFor="f-age">Age</label>
                  {touched.age && errors.age && <p className="mt-1 text-[11px] text-rose-500">{errors.age}</p>}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-500">Gender</label>
                  <select
                    value={form.gender}
                    onBlur={() => setTouched({ ...touched, gender: true })}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className={`mt-1 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none focus:ring-4 ${
                      touched.gender && errors.gender ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-brand focus:ring-brand/10"
                    }`}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {touched.gender && errors.gender && <p className="mt-1 text-[11px] text-rose-500">{errors.gender}</p>}
                </div>
              </div>

              <div className="field-group">
                <input
                  id="f-phone" type="tel" inputMode="numeric" value={form.phone} placeholder=" "
                  onBlur={() => setTouched({ ...touched, phone: true })}
                  onChange={(e) => {
                    setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) });
                    setOtpSent(false);
                    setOtpVerified(false);
                    setOtpInput("");
                    setOtpError("");
                  }}
                  className={`w-full rounded-xl border bg-white px-3.5 text-sm outline-none focus:ring-4 ${
                    touched.phone && errors.phone ? "field-error border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-brand focus:ring-brand/10"
                  }`}
                />
                <label htmlFor="f-phone">Phone Number</label>
                {touched.phone && errors.phone && <p className="mt-1 text-[11px] text-rose-500">{errors.phone}</p>}

                {!errors.phone && !otpVerified && (
                  <div className="mt-2">
                    {!otpSent ? (
                      <button type="button" onClick={sendOtp} className="rounded-full border border-brand/30 px-4 py-1.5 text-[11.5px] font-semibold text-brand hover:bg-brand/5">
                        Send OTP
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="6-digit OTP"
                          inputMode="numeric"
                          maxLength={6}
                          className="w-32 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
                        />
                        <button type="button" onClick={verifyOtp} disabled={otpInput.length !== 6} className="rounded-full bg-brand px-3.5 py-1.5 text-[11.5px] font-semibold text-white disabled:opacity-40">
                          Verify
                        </button>
                        <button type="button" onClick={sendOtp} className="text-[10.5px] font-medium text-slate-400 hover:text-brand">
                          Resend
                        </button>
                      </div>
                    )}
                    {otpError && <p className="mt-1 text-[11px] text-rose-500">{otpError}</p>}
                  </div>
                )}
                {otpVerified && (
                  <p className="mt-2 flex items-center gap-1.5 text-[11.5px] font-medium text-emerald-600">
                    <Check size={13} /> Phone number verified
                  </p>
                )}
              </div>

              <div className="field-group">
                <input
                  id="f-email" type="email" value={form.email} placeholder=" "
                  onBlur={() => setTouched({ ...touched, email: true })}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full rounded-xl border bg-white px-3.5 text-sm outline-none focus:ring-4 ${
                    touched.email && errors.email ? "field-error border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-brand focus:ring-brand/10"
                  }`}
                />
                <label htmlFor="f-email">Email Address <span className="text-slate-300">(optional)</span></label>
                {touched.email && errors.email && <p className="mt-1 text-[11px] text-rose-500">{errors.email}</p>}
              </div>

              <div className="field-group">
                <textarea
                  id="f-address" value={form.address} placeholder=" " rows={2}
                  onBlur={() => setTouched({ ...touched, address: true })}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className={`w-full resize-none rounded-xl border bg-white px-3.5 pt-5 text-sm outline-none focus:ring-4 ${
                    touched.address && errors.address ? "field-error border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-brand focus:ring-brand/10"
                  }`}
                />
                <label htmlFor="f-address">Address</label>
                {touched.address && errors.address && <p className="mt-1 text-[11px] text-rose-500">{errors.address}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-medium text-slate-500">Department</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {departments.map((d) => {
                    const id = d.slug || d.id;
                    return (
                      <button
                        key={id}
                        onClick={() => { setDept(id); setDoctor(null); }}
                        className={`rounded-xl border-2 px-2 py-2.5 text-[11.5px] font-medium transition-colors ${
                          dept === id ? "border-brand bg-brand/5 text-brand" : "border-slate-100 text-slate-500 hover:border-slate-200"
                        }`}
                      >
                        {d.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {dept && (
                <div>
                  <label className="text-xs font-medium text-slate-500">Preferred Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={date}
                    onChange={(e) => { setDate(e.target.value); setDoctor(null); }}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
                  />
                </div>
              )}

              {dept && date && (
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Doctors available on {new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                  </label>
                  <div className="mt-2 space-y-2">
                    {availableDoctors.length === 0 ? (
                      <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 p-4 text-slate-500">
                        <p className="text-[13px]">No doctors available on this day. Please try a different date.</p>
                      </div>
                    ) : (
                      availableDoctors.map((d) => {
                        const id = d.id || d._id;
                        return (
                          <button
                            key={id}
                            onClick={() => setDoctor(d)}
                            className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition-colors ${
                              (doctor?.id || doctor?._id) === id ? "border-brand bg-brand/5" : "border-slate-100 hover:border-slate-200"
                            }`}
                          >
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full grad-primary-br text-[11px] font-bold text-white">{d.photo || d.photoInitials}</div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[13px] font-semibold text-navy">{d.name}</p>
                              <p className="text-[11px] text-slate-400">{(d.days || d.availableDays || []).join(", ")}</p>
                            </div>
                            {(doctor?.id || doctor?._id) === id && <Check size={16} className="text-brand" />}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="mb-4 text-sm text-slate-600">Select an available token for <span className="font-semibold text-navy">{doctor?.name}</span> on {date}.</p>
              <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
                {tokens.map((t) => (
                  <button
                    key={t.token}
                    disabled={t.booked}
                    onClick={() => setToken(t.token)}
                    style={{ animationDelay: `${t.token * 10}ms` }}
                    className={`token-pop relative flex aspect-square items-center justify-center rounded-xl text-[13px] font-semibold transition-all ${
                      t.booked
                        ? "cursor-not-allowed bg-slate-100 text-slate-300"
                        : token === t.token
                        ? "token-selected-ring scale-105 grad-primary-br text-white shadow-md shadow-blue-200"
                        : "bg-blue-50 text-brand hover:scale-105 hover:bg-blue-100"
                    }`}
                  >
                    {t.booked ? <X size={13} /> : t.token}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-4 text-[11.5px] text-slate-500">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-100" /> Available</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-slate-200" /> Booked</span>
              </div>
              {token && (
                <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                  <p className="text-[13px] text-slate-500">Estimated arrival time</p>
                  <p className="mt-1 text-2xl font-bold text-brand">{tokens.find((t) => t.token === token)?.arrivalTime}</p>
                </div>
              )}
            </div>
          )}

          {step === 4 && confirmation && (
            <div className="flex flex-col items-center py-4 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-500">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-navy">Appointment Confirmed</h3>
              <p className="mt-1 text-sm text-slate-500">A confirmation has been generated for your visit.</p>

              <GlassCard className="mt-6 w-full p-5 text-left" hover={false}>
                <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">Sivagiri Sree Narayana MMH</p>
                    <p className="text-sm font-semibold text-navy">Appointment Pass</p>
                  </div>
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-slate-50 text-slate-300">
                    <QrCode size={30} />
                  </div>
                </div>
                <div className="mt-3 space-y-1.5 text-[13px]">
                  <div className="flex justify-between"><span className="text-slate-400">Patient</span><span className="font-medium text-navy">{patient.name || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Doctor</span><span className="font-medium text-navy">{doctor?.name}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Date</span><span className="font-medium text-navy">{date}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Token</span><span className="font-medium text-navy">#{token}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Arrival Time</span><span className="font-semibold text-brand">{confirmation.arrivalTime}</span></div>
                </div>
              </GlassCard>

              <div className="mt-5 flex w-full gap-2">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-[12.5px] font-medium text-slate-600 hover:bg-slate-50"><Download size={14} /> PDF</button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-[12.5px] font-medium text-slate-600 hover:bg-slate-50"><Printer size={14} /> Print</button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-[12.5px] font-medium text-slate-600 hover:bg-slate-50"><Share2 size={14} /> Share</button>
              </div>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            <button onClick={goBack} disabled={step === 0} className="flex items-center gap-1 text-[13px] font-medium text-slate-400 disabled:opacity-0">
              <ChevronLeft size={15} /> Back
            </button>
            <button
              onClick={goNext}
              disabled={
                loading ||
                (step === 0 && (!visited || (visited === "yes" && !patientFound))) ||
                (step === 1 && !canProceedFromDetails) ||
                (step === 2 && !(dept && date && doctor)) ||
                (step === 3 && !token)
              }
              className="btn-ripple flex items-center gap-1.5 rounded-full grad-primary-r px-6 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-blue-100 transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              {loading ? "Booking..." : step === 3 ? "Confirm" : "Continue"} <ChevronRight size={15} />
            </button>
          </div>
        )}
        {step === 4 && (
          <div className="border-t border-slate-100 px-6 py-4">
            <button onClick={onClose} className="w-full rounded-full bg-navy py-3 text-[13.5px] font-semibold text-white">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
