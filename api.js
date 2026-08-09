// Thin wrapper around the backend REST API. Every function falls back to
// the bundled mock data (src/data/mockData.js) if the request fails, so
// the frontend stays fully functional even without a running backend —
// remove the try/catch fallbacks once you're ready to require the API.

import * as mock from "../data/mockData";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function authHeaders() {
  const token = localStorage.getItem("mh_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed: ${res.status}`);
  return data;
}

export async function getDepartments() {
  try {
    return await request("/departments");
  } catch {
    return mock.DEPARTMENTS;
  }
}

export async function getDoctors({ department, search } = {}) {
  try {
    const params = new URLSearchParams();
    if (department && department !== "all") params.set("department", department);
    if (search) params.set("search", search);
    return await request(`/doctors?${params.toString()}`);
  } catch {
    return mock.DOCTORS.filter((d) => {
      const matchesDept = !department || department === "all" || d.dept === department;
      const matchesSearch = !search || d.name.toLowerCase().includes(search.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }
}

export async function lookupPatientByFileNumber(fileNumber) {
  try {
    return await request(`/patients/lookup/${encodeURIComponent(fileNumber)}`);
  } catch {
    // Demo fallback: pretend any valid 6-digit file number resolves to a sample patient
    if (!fileNumber || !/^[0-9]{6}$/.test(fileNumber)) return null;
    return { name: "Ritika Ahuja", age: 34, gender: "Female", phone: "98xxxxxx21", email: "ritika@example.com", address: "Sector 12, Mission City" };
  }
}

export async function registerPatient(patientData) {
  try {
    return await request("/patients", { method: "POST", body: JSON.stringify(patientData) });
  } catch {
    return { id: `local-${Date.now()}`, ...patientData };
  }
}

export async function getAvailability({ doctorId, date }) {
  try {
    return await request(`/appointments/availability?doctorId=${doctorId}&date=${date}`);
  } catch {
    const tokens = mock.generateTokens().map((t) => ({
      token: t,
      booked: mock.BOOKED_TOKENS.has(t),
      arrivalTime: mock.tokenToTime(t),
    }));
    return { tokens };
  }
}

export async function bookAppointment({ patientId, doctorId, date, token, bookedVia = "web" }) {
  try {
    return await request("/appointments", {
      method: "POST",
      body: JSON.stringify({ patientId, doctorId, date, token, bookedVia }),
    });
  } catch {
    return { id: `MH-${Math.floor(Math.random() * 9000 + 1000)}`, date, token, arrivalTime: mock.tokenToTime(token), status: "upcoming" };
  }
}

export async function getPatientAppointments(patientId) {
  try {
    return await request(`/appointments/patient/${patientId}`);
  } catch {
    return mock.MOCK_APPOINTMENTS;
  }
}

export async function cancelAppointment(appointmentId) {
  try {
    return await request(`/appointments/${appointmentId}/cancel`, { method: "PATCH" });
  } catch {
    return { id: appointmentId, status: "cancelled" };
  }
}

export async function rescheduleAppointment(appointmentId, { date, token }) {
  try {
    return await request(`/appointments/${appointmentId}/reschedule`, {
      method: "PATCH",
      body: JSON.stringify({ date, token }),
    });
  } catch {
    return { id: appointmentId, date, token, status: "upcoming" };
  }
}

export async function askAI(message) {
  try {
    const data = await request("/ai/chat", { method: "POST", body: JSON.stringify({ message }) });
    return data.reply;
  } catch {
    const m = message.toLowerCase();
    if (m.includes("timing") || m.includes("hour")) return "Our OPD is open 8:00 AM – 8:00 PM, Monday to Saturday. Emergency is open 24/7.";
    if (m.includes("emergency")) return "Emergency is open 24/7 — call 0470-2602228.";
    if (m.includes("location") || m.includes("where")) return "We're located at Varkala - 695141, Thiruvananthapuram, Kerala.";
    return "I can help with hospital timings, doctor availability, departments, or booking an appointment — what do you need?";
  }
}

export async function login(email, password) {
  const data = await request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  localStorage.setItem("mh_token", data.token);
  return data.user;
}

export async function register(payload) {
  const data = await request("/auth/register", { method: "POST", body: JSON.stringify(payload) });
  localStorage.setItem("mh_token", data.token);
  return data.user;
}

export function logout() {
  localStorage.removeItem("mh_token");
}
