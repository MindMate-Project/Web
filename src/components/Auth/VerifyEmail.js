import "./VerifyEmail.css";
// import logo from "./../../images/logo.svg";
import { useNavigate } from "react-router";
import LogoHeader from "./LogoHeader";
import AuthLayout from "./AuthLayout";
function VerifyEmail() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
    <div className="verify-email">
      <div className="container">
        <div className="bottom">
          <div className="card">
            <h2>Verification Code</h2>
            <p>
              We've sent 5 digit code to example@mail.com
              <br />
              please enter it below
            </p>

            <button type="button" className="resend">
              Resend Code?
            </button>

            <div className="code-inputs">
              <input maxlength="1" />
              <input maxlength="1" />
              <input maxlength="1" />
              <input maxlength="1" />
              <input maxlength="1" />
              
            </div>

            <button className="submit-btn">Submit</button>
            <button className="edit-btn"
            onClick={() => navigate("/api/auth/forgot-password")}>Edit Email</button>
          </div>
        </div>
      </div>
    </div>
    </AuthLayout>
  );
}
export default VerifyEmail;
