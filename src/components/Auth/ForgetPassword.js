import logo from "./../../images/logo.svg";
import "./ForgetPassword.css";
import { useNavigate } from "react-router";

function ForgetPassword() {
  const navigate = useNavigate();
  return (
    <div className="fo-pass">
      <div className="container">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="Alzheimer Assistant Logo" />
          </div>
          <h2>Forget Your Password?</h2>
        </div>
        <div className="right">
          <div className="card">
            <h2 className="card-title"> Forget Password?</h2>
            <form>
              <div className="field">
                <label>Enter your email</label>
                <input type="email" placeholder="@gmail.com" />
              </div>

              <button type="submit">Send Code</button>
              <button onClick={() => navigate("/api/auth/login")}>
                back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
