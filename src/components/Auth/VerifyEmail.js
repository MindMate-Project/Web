import "./VerifyEmail.css";
import { useNavigate } from "react-router";
import AuthLayout from "./AuthLayout";
import VerifyPasswordHook from "../../hook/auth/verify-reset-code-hook";
import { ToastContainer } from "react-toastify";
function VerifyEmail() {
    const [code, OnChangeCode, onSubmit] = VerifyPasswordHook();
    
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

            <button type="button" className="resend">
              Resend Code?
            </button>

            <div className="code-inputs">
              <input maxlength="1" value={code[0] || ""} onChange={(e) => OnChangeCode(e, 0)} />
              <input maxlength="1" value={code[1] || ""} onChange={(e) => OnChangeCode(e, 1)} />
              <input maxlength="1" value={code[2] || ""} onChange={(e) => OnChangeCode(e, 2)} />
              <input maxlength="1" value={code[3] || ""} onChange={(e) => OnChangeCode(e, 3)} />
              <input maxlength="1" value={code[4] || ""} onChange={(e) => OnChangeCode(e, 4)} />
              <input maxlength="1" value={code[5] || ""} onChange={(e) => OnChangeCode(e, 5)} />
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
