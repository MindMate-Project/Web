import "./ForgetPassword.css";
import { useNavigate } from "react-router";
import ForgetPasswordHook from "../../hook/auth/forget-password-hook";
import AuthNavbar from "../AuthNavbar/AuthNavbar";

function ForgetPassword() {
    const navigate = useNavigate();
    const [OnChangeEmail, email, onSubmit, loading, errors, successMessage] = ForgetPasswordHook();

    return (
        <div className="fo-pass">
            <AuthNavbar />
            <div className="container">
                <div className="right">
                    <div className="card">
                        <h2 className="card-title">Forgot Password?</h2>

                        <p className="card-desc">
                            Don’t worry! enter your email to reset the password
                        </p>

                        {/* <a className="resend">Resend Code?</a> */}

                        <form>
                            <div className="field">
                                <label>Enter your email</label>
                                <input
                                    onChange={OnChangeEmail}
                                    value={email}
                                    type="email"
                                    placeholder="@gmail.com"
                                    className={errors?.email ? "input-error" : ""}
                                />
                                {errors?.email && <span className="error-text">{errors.email}</span>}
                            </div>
                            
                            {errors?.form && <div className="form-error">{errors.form}</div>}
                            {successMessage && <div style={{color: "#4FCB93", background: "#E8FDF3", padding: "10px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px", border: "1px solid #C4F3DD", textAlign: "center"}}>{successMessage}</div>}

                            <button 
                                type="submit" 
                                onClick={onSubmit} 
                                disabled={loading}
                                className={`submit-btn ${loading ? 'loading' : ''}`}
                            >
                                {loading ? <span className="auth-spinner"></span> : "Send Code"}
                            </button>

                            <button
                                type="button"
                                className="back-btn"
                                onClick={() => navigate("/api/auth/login")}
                            >
                                Back to login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
