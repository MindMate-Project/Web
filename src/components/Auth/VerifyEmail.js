import "./VerifyEmail.css";
import logo from "./../../images/logo.svg";
function VerifyEmail() {
  return (
    <div className="verify-email">
      <div className="container">
        <div className="top">
          <div className="logo">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <h2>Verify Your Email</h2>
        </div>
        <div className="bottom">
          <div className="card">
            <h2>Verification Code</h2>
            <p>
              We've sent 5 digit code to <strong>example@mail.com</strong>
              <br />
              please enter it below
            </p>

            <a href="#" className="resend">
              Resend Code?
            </a>

            <div className="code-inputs">
              <input maxlength="1" />
              <input maxlength="1" />
              <input maxlength="1" />
              <input maxlength="1" />
              <input maxlength="1" />
            </div>

            <button className="submit-btn">Submit</button>
            <button className="edit-btn">Edit Email</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VerifyEmail;
