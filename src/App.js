import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgetPasswordPage from "./pages/Auth/ForgetPasswordPage";
import SetNewPasswordPage from "./pages/Auth/SetNewPasswordPage";
import VerifyEmailPage from "./pages/Auth/VerifyEmailPage";
import CheckInboxPage from "./pages/Auth/CheckInboxPage";
import VerificationSuccessPage from "./pages/Auth/VerificationSuccessPage";
import VerificationErrorPage from "./pages/Auth/VerificationErrorPage";
import PatientsPage from "./pages/Dashboard/PatientsPage";
import RemindersPage from "./pages/Dashboard/RemindersPage";
import LiveLocationPage from "./pages/Dashboard/LiveLocationPage";
import MemoryBankPage from "./pages/Dashboard/MemoryBankPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <LogoHeader/> */}
        <Routes>
          <Route path="/" element={<div>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <a href="/api/auth/login" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#007bff", color: "#fff", textDecoration: "none", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: "500", cursor: "pointer", border: "none" }}>Login</a>
            <a href="/api/auth/signup" style={{ padding: "0.75rem 1.5rem", backgroundColor: "#28a745", color: "#fff", textDecoration: "none", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: "500", cursor: "pointer", border: "none" }}>Signup</a>
        </div>
          </div>} />

          <Route path="/api/auth/login" element={<LoginPage />} />
          <Route path="/api/auth/signup" element={<SignupPage />} />
          <Route path="/api/auth/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/api/auth/verify-reset-password" element={<VerifyEmailPage />} />
          <Route path="/api/auth/set-new-password" element={<SetNewPasswordPage />} />
          <Route path="/api/auth/verify-reset-password" element={<CheckInboxPage />} />
          <Route path="/api/dashboard/patients" element={<PatientsPage />} />
          <Route path="/api/dashboard/reminders" element={<RemindersPage />} />
          <Route path="/api/dashboard/memory-bank" element={<MemoryBankPage />} />
          <Route path="/api/dashboard/live-location" element={<LiveLocationPage />} />
          <Route path="/api/dashboard" element={<HomePage />} />
          <Route path="/api/auth/verification-success" element={<VerificationSuccessPage />} />
          <Route path="/api/auth/verification-error" element={<VerificationErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
