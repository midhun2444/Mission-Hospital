// Fallback data used whenever the backend API is unreachable, so the UI
// stays fully demoable offline. When the API responds, live data from
// src/services/api.js takes over automatically.

export const DEPARTMENTS = [
  { id: "cardiology", name: "Cardiology", icon: "Heart", desc: "Heart & vascular care", count: 2 },
  { id: "neurology", name: "Neurology", icon: "Brain", desc: "Brain & nervous system", count: 1 },
  { id: "orthopedics", name: "Orthopedics", icon: "Bone", desc: "Bones & joints", count: 1 },
  { id: "general", name: "General Medicine", icon: "Stethoscope", desc: "Primary & family care", count: 1 },
  { id: "ent", name: "ENT", icon: "Activity", desc: "Ear, nose & throat", count: 1 },
  { id: "gynecology", name: "Gynecology", icon: "Users", desc: "Women's health", count: 1 },
  { id: "pediatrics", name: "Pediatrics", icon: "Baby", desc: "Child healthcare", count: 1 },
  { id: "dermatology", name: "Dermatology", icon: "Sparkles", desc: "Skin & hair care", count: 0 },
];

export const DOCTORS = [
  { id: "1", name: "Dr. Aanya Sharma", dept: "cardiology", deptName: "Cardiology", qual: "MD, DM Cardiology", exp: 14, days: ["Mon", "Wed", "Fri"], time: "9:00 AM – 1:00 PM", langs: ["English", "Hindi"], rating: 4.9, photo: "AS" },
  { id: "2", name: "Dr. Rohan Verma", dept: "cardiology", deptName: "Cardiology", qual: "MBBS, MD Cardiology", exp: 9, days: ["Tue", "Thu", "Sat"], time: "2:00 PM – 6:00 PM", langs: ["English", "Hindi"], rating: 4.7, photo: "RV" },
  { id: "3", name: "Dr. Meera Iyer", dept: "neurology", deptName: "Neurology", qual: "MD, DM Neurology", exp: 17, days: ["Mon", "Tue", "Thu"], time: "10:00 AM – 2:00 PM", langs: ["English", "Tamil"], rating: 4.9, photo: "MI" },
  { id: "4", name: "Dr. Karan Malhotra", dept: "orthopedics", deptName: "Orthopedics", qual: "MS Ortho", exp: 12, days: ["Mon", "Wed", "Sat"], time: "9:00 AM – 12:00 PM", langs: ["English", "Punjabi"], rating: 4.8, photo: "KM" },
  { id: "5", name: "Dr. Priya Nair", dept: "general", deptName: "General Medicine", qual: "MBBS, MD", exp: 8, days: ["Mon", "Tue", "Wed", "Thu", "Fri"], time: "8:00 AM – 11:00 AM", langs: ["English", "Malayalam"], rating: 4.6, photo: "PN" },
  { id: "6", name: "Dr. Sameer Khan", dept: "ent", deptName: "ENT", qual: "MS ENT", exp: 11, days: ["Tue", "Thu", "Sat"], time: "11:00 AM – 3:00 PM", langs: ["English", "Urdu"], rating: 4.7, photo: "SK" },
  { id: "7", name: "Dr. Divya Menon", dept: "gynecology", deptName: "Gynecology", qual: "MD OBG", exp: 15, days: ["Mon", "Wed", "Fri"], time: "10:00 AM – 1:00 PM", langs: ["English", "Hindi"], rating: 4.9, photo: "DM" },
  { id: "8", name: "Dr. Arjun Rao", dept: "pediatrics", deptName: "Pediatrics", qual: "MD Pediatrics", exp: 10, days: ["Mon", "Tue", "Thu", "Sat"], time: "4:00 PM – 7:00 PM", langs: ["English", "Telugu"], rating: 4.8, photo: "AR" },
];

export const TESTIMONIALS = [
  { name: "Ritika Ahuja", text: "The token system meant I knew exactly when to arrive.", rating: 5 },
  { name: "Naveen Bhatt", text: "Booked a cardiology appointment through the AI assistant in minutes.", rating: 5 },
  { name: "Farah Sheikh", text: "Clean, calm, and genuinely well designed.", rating: 5 },
  { name: "Vikram Oberoi", text: "Reception had my full history the moment I gave my file number.", rating: 4 },
];

export const STATS = [
  { label: "Specialist Doctors", value: 30, icon: "Stethoscope" },
  { label: "Departments", value: 8, icon: "Building2" },
  { label: "Patients Served", value: 48000, icon: "Users" },
  { label: "Years of Care", value: 27, icon: "Award" },
];

export const MOCK_APPOINTMENTS = [
  { id: "MH-8821", doctor: "Dr. Aanya Sharma", dept: "Cardiology", date: "2026-08-02", token: 7, time: "10:00 AM", status: "upcoming" },
  { id: "MH-7734", doctor: "Dr. Priya Nair", dept: "General Medicine", date: "2026-06-14", token: 3, time: "8:20 AM", status: "completed" },
  { id: "MH-7601", doctor: "Dr. Karan Malhotra", dept: "Orthopedics", date: "2026-05-29", token: 12, time: "11:50 AM", status: "cancelled" },
  { id: "MH-7298", doctor: "Dr. Meera Iyer", dept: "Neurology", date: "2026-04-02", token: 2, time: "10:10 AM", status: "expired" },
];

export const BOOKED_TOKENS = new Set([1, 2, 3, 5, 8, 9, 13, 14, 20, 21, 22, 30]);

export function tokenToTime(token, startHour = 9, startMin = 0, perPatientMin = 10) {
  const totalMin = startHour * 60 + startMin + (token - 1) * perPatientMin;
  const h24 = Math.floor(totalMin / 60) % 24;
  const m = totalMin % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const ampm = h24 < 12 ? "AM" : "PM";
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export function generateTokens(count = 30) {
  return Array.from({ length: count }, (_, i) => i + 1);
}
