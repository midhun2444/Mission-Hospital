import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import Header from "./Header";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import BookingModal from "./components/BookingModal";
import AIAssistant from "./components/AIAssistant";
import DepartmentsGrid from "./components/DepartmentsGrid";
import Home from "./pages/Home";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Contact from "./pages/Contact";
import Appointments from "./pages/Appointments";
import Support from "./pages/Support";

export default function App() {
  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [deptPick, setDeptPick] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appt) => setAppointments((prev) => [appt, ...prev]);
  const updateAppointment = (id, changes) =>
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...changes } : a)));

  const openBooking = (doc = null) => { setBookingDoctor(doc); setBookingOpen(true); };
  const goDept = (id) => { setDeptPick(id); setPage("doctors"); };

  return (
    <div className="min-h-screen bg-page pb-16 font-sans text-navy lg:pb-0">
      <Header page={page} setPage={setPage} dark={dark} setDark={setDark} openBooking={() => openBooking(null)} openAI={() => setAiOpen(true)} />

      {page === "home" && <Home openBooking={() => openBooking(null)} openAI={() => setAiOpen(true)} goDept={goDept} />}
      {page === "about" && <About />}
      {page === "doctors" && <Doctors onBook={(doc) => openBooking(doc)} presetDept={deptPick} />}
      {page === "departments" && <DepartmentsGrid onPick={goDept} />}
      {page === "contact" && <Contact />}
      {page === "appointments" && (
        <Appointments appointments={appointments} onUpdate={updateAppointment} openBooking={() => openBooking(null)} />
      )}
      {page === "support" && <Support />}

      <Footer setPage={setPage} />
      <MobileBottomNav page={page} setPage={setPage} openBooking={openBooking} />

      {bookingOpen && <BookingModal presetDoctor={bookingDoctor} onClose={() => setBookingOpen(false)} onConfirmed={addAppointment} />}
      <AIAssistant open={aiOpen} onClose={() => setAiOpen(false)} />

      {!aiOpen && (
        <button
          onClick={() => setAiOpen(true)}
          className="fixed bottom-24 right-6 z-40 grid h-14 w-14 place-items-center rounded-full grad-primary-r text-white shadow-xl shadow-blue-300 transition-transform hover:scale-110 active:scale-95 lg:bottom-6"
        >
          <MessageCircle size={22} />
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand/40" />
        </button>
      )}
    </div>
  );
}
