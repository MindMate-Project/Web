import "./VerificationStatus.css";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import ResendCodeHook from "../../hook/auth/Resend-Code-Hook";
import logo from "../../images/logo.png";
export default function VerificationErrorPage() {
    const [onResendCode] = ResendCodeHook();
    const navigate = useNavigate();

    return (
        <div className="verification-page">
            <div className="logo-header">
                <img src={logo} alt="Logo" />
                <h1 className="brand-title">MindMate</h1>
            </div>
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

                <button className="primary-btn" onClick={onResendCode}>
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
    );
}
