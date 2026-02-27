import "./SetNewPassword.css";
import { useNavigate } from "react-router";
import AuthLayout from "./AuthLayout";
import ResetPasswordHook from "../../hook/auth/reset-password-hook";
import { ToastContainer } from "react-toastify";

function SetNewPassword() {
    const [
        password,
        confirmPassword,
        OnChangePassword,
        OnChangeConfirmPassword,
        onSubmit,
    ] = ResetPasswordHook();

    const navigate = useNavigate();
    return (
        <AuthLayout>
            <div className="set-pass">
                <div className="container">
                    <div className="left"></div>
                    <div className="right">
                        <div className="card">
                            <h2 className="card-title">Set New Password!</h2>
                            <p className="card-description">Please enter and confirm your new password</p>
                            <form>
                                <div className="field">
                                    <label>Set Password</label>
                                    <input
                                        value={password}
                                        onChange={OnChangePassword}
                                        type="password"
                                        placeholder="************"
                                    />
                                </div>
                                <div className="field">
                                    <label>Confirm Password</label>
                                    <input
                                        value={confirmPassword}
                                        onChange={OnChangeConfirmPassword}
                                        type="password"
                                        placeholder="************"
                                    />
                                </div>
                                <button type="button" onClick={onSubmit}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AuthLayout>
    );
}

export default SetNewPassword;
