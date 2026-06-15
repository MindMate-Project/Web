import "./VerificationStatus.css";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import ResendCodeHook from "../../hook/auth/Resend-Code-Hook";
import AuthNavbar from "../AuthNavbar/AuthNavbar";
export default function VerificationErrorPage() {
    const [onResendCode, loading, message, error] = ResendCodeHook();
    const navigate = useNavigate();

    return (
        <div className="verification-page">
            <AuthNavbar />
            <div className="container">
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

                    {error && <div className="form-error" style={{marginBottom: "16px"}}>{error}</div>}
                    {message && <div style={{color: "#4FCB93", background: "#E8FDF3", padding: "10px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px", border: "1px solid #C4F3DD"}}>{message}</div>}

                    <button 
                        className={`primary-btn ${loading ? 'loading' : ''}`} 
                        onClick={onResendCode}
                        disabled={loading}
                    >
                        {loading ? <span className="auth-spinner"></span> : "Resend Code"}
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/api/auth/forgot-password")}
                    >
                        Edit Email
                    </button>
                </div>
            </div>
        </div>
    );
}
