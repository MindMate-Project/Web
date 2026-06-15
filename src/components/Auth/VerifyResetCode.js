import "./VerifyResetCode.css";
import { useNavigate } from "react-router";
import VerifyResetCodeHook from "../../hook/auth/verify-reset-code-hook";
import ResendCodeHook from "../../hook/auth/Resend-Code-Hook";
import AuthNavbar from "../AuthNavbar/AuthNavbar";

function VerifyResetCode() {
    const [code, OnChangeCode, onSubmit, onPasteCode, onKeyDown, inputsRef, loading, errors] =
        VerifyResetCodeHook();
    const [onResendCode, isResending, resendMessage, resendError] = ResendCodeHook();
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("user-email") || "your email address";
    return (
        <div className="verify-code">
            <AuthNavbar />
            <div className="container">
                <div className="bottom">
                    <div className="card">
                        <h2>Verification Code</h2>
                        <p>
                            We've sent a 6-digit code to <strong>{userEmail}</strong>,<br/>
                            please check your inbox
                        </p>

                        {resendError && <div className="form-error" style={{marginBottom: "16px"}}>{resendError}</div>}
                        {resendMessage && <div style={{color: "#4FCB93", background: "#E8FDF3", padding: "10px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px", border: "1px solid #C4F3DD"}}>{resendMessage}</div>}

                        <button
                            type="button"
                            className="resend"
                            onClick={onResendCode}
                            disabled={isResending}
                        >
                            {isResending ? <span className="auth-spinner" style={{width: "14px", height: "14px", borderWidth: "2px", borderColor: "rgba(94, 165, 192, 0.3)", borderTopColor: "#5EA5C0"}}></span> : "Resend Code?"}
                        </button>

                        <div className="code-inputs" onPaste={onPasteCode}>
                            {code.map((num, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={num || ""}
                                    onChange={(e) => OnChangeCode(e, index)}
                                    onKeyDown={(e) => onKeyDown(e, index)}
                                    ref={(el) =>
                                        (inputsRef.current[index] = el)
                                    }
                                />
                            ))}
                        </div>

                        {errors?.form && <div className="form-error">{errors.form}</div>}

                        <button 
                            type="submit" 
                            onClick={onSubmit} 
                            disabled={loading}
                            className={`primary-btn ${loading ? 'loading' : ''}`}
                        >
                            {loading ? <span className="auth-spinner"></span> : "Verify Code"}
                        </button>
                        <button
                            className="edit-btn"
                            onClick={() =>
                                navigate("/api/auth/forgot-password")
                            }
                        >
                            Edit Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default VerifyResetCode;
