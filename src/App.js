import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgetPasswordPage from "./pages/Auth/ForgetPasswordPage";
import SetNewPasswordPage from "./pages/Auth/SetNewPasswordPage";
import VerifyEmailPage from "./pages/Auth/VerifyEmailPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/api/auth/login" element={<LoginPage />} />
          <Route path="/api/auth/signup" element={<SignupPage />} />
          <Route path="/api/auth/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/api/auth/set-new-password" element={<SetNewPasswordPage />} />
          <Route path="/api/auth/verify-email" element={<VerifyEmailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
