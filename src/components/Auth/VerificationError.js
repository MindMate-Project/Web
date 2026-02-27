import "./VerificationStatus.css";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import AuthLayout from "../../components/Auth/AuthLayout";
import ResendCodeHook from "../../hook/auth/Resend-Code-Hook";

export default function VerificationErrorPage() {
  const [onResendCode] = ResendCodeHook();
  const navigate = useNavigate();
  

  return (
    <AuthLayout>
      <div className="verification-page">
        <div className="verification-card error">

          <div className="icon error-icon">
            <MdError />
          </div>

          <h2 className="error-text">Invalid Code</h2>

          <p>
            The code you entered is incorrect.
            <br />
            Please try again or request a new code.
          </p>

          <button className="primary-btn" onClick={onResendCode} >
            Resend Code
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/api/auth/forgot-password")}
          >
            Edit Email
          </button>

        </div>
      </div>
    </AuthLayout>
  );
}