import "./VerificationStatus.css";
import { useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import AuthNavbar from "../AuthNavbar/AuthNavbar";

export default function VerificationSuccessPage() {
    const navigate = useNavigate();

    return (
        <div className="verification-page">
            <AuthNavbar />
            <div className="container">
                <div className="verification-card success">
                    <div className="icon success-icon">
                        <MdCheckCircle />
                    </div>

                    <h2 className="success-text">Verification Successful</h2>

                    <p className="verification-text">
                        <span>Your email has been successfully verified.</span>
                        <span>You can now reset your password.</span>
                    </p>
                    <button
                        className="primary-btn"
                        onClick={() => navigate("/api/auth/set-new-password")}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
