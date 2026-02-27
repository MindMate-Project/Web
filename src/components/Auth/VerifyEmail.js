import "./VerifyEmail.css";
import { useNavigate } from "react-router";
import AuthLayout from "./AuthLayout";
import VerifyPasswordHook from "../../hook/auth/verify-reset-code-hook";
import ResendCodeHook from "../../hook/auth/Resend-Code-Hook";
import { ToastContainer } from "react-toastify";
function VerifyEmail() {
    const [code, OnChangeCode, onSubmit, onPasteCode, onKeyDown, inputsRef] = VerifyPasswordHook();
    const [onResendCode] = ResendCodeHook();
    const navigate = useNavigate();
  return (
    <AuthLayout>
    <div className="verify-email">
      <div className="container">
        <div className="bottom">
          <div className="card">
            <h2>Verification Code</h2>
            <p>
              We've sent 6 digit code to your email address, please check your inbox
            </p>

            <button type="button" className="resend" onClick={onResendCode}>
              Resend Code?
            </button>

            <div 
              className="code-inputs" 
              onPaste={onPasteCode} 
            >
              {code.map((num, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={num || ""}
                  onChange={(e) => OnChangeCode(e, index)}
                  onKeyDown={(e) => onKeyDown(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                />
            ))} 
            </div>

            <button className="submit-btn" onClick={onSubmit}>Submit</button>
            <button className="edit-btn"
            onClick={() => navigate("/api/auth/forgot-password")}>Edit Email</button>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </AuthLayout>
  );
}
export default VerifyEmail;
