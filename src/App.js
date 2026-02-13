import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgetPasswordPage from "./pages/Auth/ForgetPasswordPage";
import SetNewPasswordPage from "./pages/Auth/SetNewPasswordPage";
import VerifyEmailPage from "./pages/Auth/VerifyEmailPage";
import CheckInboxPage from "./pages/Auth/CheckInboxPage";
import LogoHeader from "./components/Auth/LogoHeader";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <LogoHeader/> */}
        <Routes>
          <Route path="/" element={<div> This main route</div>} />
          <Route path="/api/auth/login" element={<LoginPage />} />
          <Route path="/api/auth/signup" element={<SignupPage />} />
          <Route path="/api/auth/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/api/auth/set-new-password" element={<SetNewPasswordPage />} />
          <Route path="/api/auth/verify-email" element={<VerifyEmailPage />} />
          <Route path="/api/auth/check-inbox" element={<CheckInboxPage />} />
          <Route path="/api/dashboard" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
