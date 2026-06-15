import "./Login.css";
import LoginHook from "../../hook/auth/login-hook";
import ImageSlider from "../ImageSlider/ImageSlider";
import AuthNavbar from "../AuthNavbar/AuthNavbar";

function Login() {
    const [email, password, loading, onChangeEmail, onChangePassword, onSubmit, errors] =
        LoginHook();
    return (
        <div className="login">
            <AuthNavbar />
            <div className="container">
                <div className="left">
                    <ImageSlider />
                </div>
                <div className="right">
                    <div className="card">
                        <h2 className="card-title">Log In</h2>
                        <form>
                            <div className="field">
                                <label>Enter your email</label>
                                <input
                                    type="email"
                                    placeholder="@gmail.com"
                                    value={email}
                                    onChange={onChangeEmail}
                                    className={errors?.email ? "input-error" : ""}
                                />
                                {errors?.email && <span className="error-text">{errors.email}</span>}
                            </div>

                            <div className="field">
                                <label>Enter your Password</label>
                                <input
                                    type="password"
                                    placeholder="***********"
                                    value={password}
                                    onChange={onChangePassword}
                                    className={errors?.password ? "input-error" : ""}
                                />
                                {errors?.password && <span className="error-text">{errors.password}</span>}
                                <div className="option-forgot-password">
                                    <p className="forgot-password">
                                        {" "}
                                        <a href="/api/auth/forgot-password">
                                            Forgot Password?
                                        </a>
                                    </p>
                                </div>
                            </div>
                            
                            {errors?.form && <div className="form-error">{errors.form}</div>}

                            <button 
                                type="submit" 
                                onClick={onSubmit} 
                                disabled={loading}
                                className={`submit-btn ${loading ? 'loading' : ''}`}
                            >
                                {loading ? <span className="auth-spinner"></span> : "Log In"}
                            </button>
                            <div className="signup-redirect">
                                <p className="signup-link">
                                    Don't have an account?{" "}
                                    <a href="/api/auth/signup">Sign Up</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
