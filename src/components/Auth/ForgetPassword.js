import "./ForgetPassword.css";
import { useNavigate } from "react-router";
import LogoHeader from "./LogoHeader";
import AuthLayout from "./AuthLayout";
function ForgetPassword() {
  const navigate = useNavigate();

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
              We’ve sent a 5 digit code to example@mail.com <br />
              please enter it below
            </p>

            {/* <a className="resend">Resend Code?</a> */}

            <form>
              <div className="field">
                <label>Enter your email</label>
                <input type="email" placeholder="@gmail.com" />
              </div>

              <button type="submit"> Send Code </button>

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
  </AuthLayout>
  );
}

export default ForgetPassword;
