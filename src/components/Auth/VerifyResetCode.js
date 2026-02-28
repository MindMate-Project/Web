import "./VerifyResetCode.css";
import { useNavigate } from "react-router";
import VerifyPasswordHook from "../../hook/auth/verify-reset-code-hook";
import ResendCodeHook from "../../hook/auth/Resend-Code-Hook";
import { ToastContainer } from "react-toastify";
import logo from "../../images/logo.png";
function VerifyResetCode() {
    const [code, OnChangeCode, onSubmit, onPasteCode, onKeyDown, inputsRef] =
        VerifyPasswordHook();
    const [onResendCode] = ResendCodeHook();
    const navigate = useNavigate();
    return (
        <div className="verify-code">
            <div className="logo-header">
                <img src={logo} alt="Logo" />
                <h1 className="brand-title">MindMate</h1>
            </div>
            <div className="container">
                <div className="bottom">
                    <div className="card">
                        <h2>Verification Code</h2>
                        <p>
                            We've sent 6 digit code to your email address,
                            please check your inbox
                        </p>

                        <button
                            type="button"
                            className="resend"
                            onClick={onResendCode}
                        >
                            Resend Code?
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

                        <button className="submit-btn" onClick={onSubmit}>
                            Submit
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
            <ToastContainer />
        </div>
    );
}
export default VerifyResetCode;
