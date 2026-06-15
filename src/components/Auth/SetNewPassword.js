import "./SetNewPassword.css";
import ResetPasswordHook from "../../hook/auth/reset-password-hook";
import AuthNavbar from "../AuthNavbar/AuthNavbar";

function SetNewPassword() {
    const [
        password,
        confirmPassword,
        OnChangePassword,
        OnChangeConfirmPassword,
        onSubmit,
        loading,
        errors,
    ] = ResetPasswordHook();

    // const navigate = useNavigate();
    return (
        <div className="set-pass">
            <AuthNavbar />
            <div className="container">
                <div className="right">
                    <div className="card">
                        <h2 className="card-title">Set New Password!</h2>
                        <p className="card-description">
                            Please enter and confirm your new password
                        </p>
                        <form>
                            <div className="field">
                                <label>Set Password</label>
                                <input
                                    value={password}
                                    onChange={OnChangePassword}
                                    type="password"
                                    placeholder="************"
                                    className={errors?.password ? "input-error" : ""}
                                />
                                {errors?.password && <span className="error-text">{errors.password}</span>}
                            </div>
                            <div className="field">
                                <label>Confirm Password</label>
                                <input
                                    value={confirmPassword}
                                    onChange={OnChangeConfirmPassword}
                                    type="password"
                                    placeholder="************"
                                    className={errors?.confirmPassword ? "input-error" : ""}
                                />
                                {errors?.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                            </div>
                            
                            {errors?.form && <div className="form-error">{errors.form}</div>}
                            
                            <button 
                                type="button" 
                                onClick={onSubmit} 
                                disabled={loading}
                                className={`submit-btn ${loading ? 'loading' : ''}`}
                            >
                                {loading ? <span className="auth-spinner"></span> : "Save"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SetNewPassword;
