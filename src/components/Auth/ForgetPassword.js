import "./ForgetPassword.css";
import { useNavigate } from "react-router";
import AuthLayout from "./AuthLayout";
import ForgetPasswordHook from "../../hook/auth/forget-password-hook";
import { ToastContainer } from "react-toastify";
function ForgetPassword() {
    const navigate = useNavigate();
    const [OnChangeEmail, email, onSubmit] = ForgetPasswordHook();

    return (
        <AuthLayout>
            <div className="fo-pass">
                {/* <div className="logo">
        <LogoHeader />
      </div> */}
                <div className="container">
                    <div className="right">
                        <div className="card">
                            <h2 className="card-title">Forgot Password?</h2>

                            <p className="card-desc">
                                Don’t worry! enter your email to reset the
                                password
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
                                    />
                                </div>

                                <button type="submit" onClick={onSubmit}>
                                    {" "}
                                    Send Code{" "}
                                </button>

                                <button
                                    type="button"
                                    className="back-btn"
                                    onClick={() => navigate("/api/auth/login")}
                                >
                                    Back To Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AuthLayout>
    );
}

export default ForgetPassword;
