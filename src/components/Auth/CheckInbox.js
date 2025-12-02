import "./CheckInbox.css";
import logo from "./../../images/logo.svg";

function CheckInbox() {
  return (
    <div className="check-inbox">
      <div className="container">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <h2>Verify Your Email</h2>
        </div>
        <div className="right">
          <div className="card">
            <h2 className="card-title">Check your inbox!</h2>
            <p>
              We've sent 5 digit code to example@mail.com
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
export default CheckInbox;
