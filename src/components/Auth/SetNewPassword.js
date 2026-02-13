import logo from "./../../images/logo.svg";
import "./SetNewPassword.css";
import { useNavigate } from "react-router";
import AuthLayout from "./AuthLayout";
function SetNewPassword() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
    <div className="set-pass">
      <div className="container">
        <div className="left">
        </div>
        <div className="right">
          <div className="card">
            <h2 className="card-title">Set New Password</h2>
            <form>
              <div className="field">
                <label>Set Password</label>
                <input type="password" placeholder="************" />
              </div>
              <div className="field">
                <label>Confirm Password</label>
                <input type="password" placeholder="************" />
              </div>
              <button type="submit">Save</button>
              <button onClick={() => navigate("/api/auth/login")}>
                back
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </AuthLayout>
  );
}

export default SetNewPassword;
