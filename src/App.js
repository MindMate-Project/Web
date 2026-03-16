import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgetPasswordPage from "./pages/Auth/ForgetPasswordPage";
import SetNewPasswordPage from "./pages/Auth/SetNewPasswordPage";
import VerifyResetCodePage from "./pages/Auth/VerifyResetCodePage";
import VerificationSuccessPage from "./pages/Auth/VerificationSuccessPage";
import VerificationErrorPage from "./pages/Auth/VerificationErrorPage";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import MainDashboard from "./components/Dashboard/DashboardMain";
import Patients from "./components/Dashboard/Patients/Patients";
import PatientDetails from "./components/Dashboard/Patients/PatientDetails";
import EditPatient from "./components/Dashboard/Patients/EditPatient";
import AddPatient from "./components/Dashboard/Patients/AddPatient";

import Location from "./components/Dashboard/Location/Location";
import Reminders from "./components/Dashboard/Reminders/Reminders";
import Settings from "./components/Dashboard/Settings/Settings";
import Notification from "./components/Dashboard/Notification/Notification";
import Profile from "./components/Dashboard/Profile/Profile";
import MemoryBank from "./components/Dashboard/MemoryBank/MemoryBank";
import AddAppointment from "./components/Dashboard/Reminders/AddAppointment";
import AppointmentDetails from "./components/Dashboard/Reminders/appointmentDetails"
// import ReminderDetails from "./components/Dashboard/Reminders/ReminderDetails"
import AppointmentEdit from "./components/Dashboard/Reminders/AppointmentEdit";
import MedicineEdit from "./components/Dashboard/Reminders/MedicineEdit";
import AddMedicine from "./components/Dashboard/Reminders/AddMedicine";
import AddMemo from "./components/Dashboard/MemoryBank/AddMemo";
import MedicineDetails from "./components/Dashboard/Reminders/MedicineDetails";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import ResetCodeRoute from "./components/utils/ResetCodeRoute";
import NewPasswordRoute from "./components/utils/NewPasswordRoute";

import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <a href="/api/auth/login" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#007bff", color: "#fff", textDecoration: "none", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: "500", cursor: "pointer", border: "none" }}>Login</a>
            <a href="/api/auth/signup" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#28a745", color: "#fff", textDecoration: "none", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: "500", cursor: "pointer", border: "none" }}>Signup</a>
        </div>
          </div>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/api/dashboard/" element={<DashboardLayout />}>
            <Route index element={<MainDashboard />} />
              <Route path="patients">
              <Route index element={<Patients />} />
              <Route path="add" element={<AddPatient />} />
              <Route path=":id" element={<PatientDetails />}/>
              <Route path=":id/edit" element={<EditPatient />} />
            </Route>
              <Route path="location" element={<Location />} />

              <Route path="reminders">
                <Route index element={<Reminders />} />
                <Route path="add-appointment" element={<AddAppointment />} />
                <Route path="add-medicine" element={<AddMedicine />} />
                {/* appointment details */}
                <Route path="appointment/:id" element={<AppointmentDetails />} />

                {/* medicine details */}
                <Route path="medicine/:id" element={<MedicineDetails />} />

                {/* appointment edit */}
                <Route path="apointment/:id/edit" element={<AppointmentEdit/>} />

                {/* medicine edit */}
                <Route path="medicine/:id/edit" element={<MedicineEdit/>} />

              </Route>

              {/* Header Icon Routes */}
              <Route path="settings" element={<Settings />} />
              <Route path="notification" element={<Notification />} />
              <Route path="profile" element={<Profile />} />

              <Route path="memory-bank">
                <Route index element={<MemoryBank/>}/>
                <Route path="add-new-memo" element={<AddMemo />} />
              </Route>
          </Route>
        </Route>
          <Route path="/api/auth/login" element={<LoginPage />} />
          <Route path="/api/auth/signup" element={<SignupPage />} />
          <Route path="/api/auth/forgot-password" element={<ForgetPasswordPage />} />
          
          <Route element={<ResetCodeRoute />}>
            <Route path="/api/auth/verify-reset-code" element={<VerifyResetCodePage />} />
          </Route>
          
          <Route element={<NewPasswordRoute />}>
            <Route path="/api/auth/set-new-password" element={<SetNewPasswordPage />} />
            <Route path="/api/auth/verification-success" element={<VerificationSuccessPage />} />
          </Route>

          <Route path="/api/auth/verification-error" element={<VerificationErrorPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
