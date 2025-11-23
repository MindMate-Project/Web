import "./CheckInbox.css";
import logo from './../../images/logo.svg';

function CheckInbox() {
  return (
    <div className="check-inbox">
      <div className="container">
        <div className="left-side">
          <img src={logo} alt="logo" className="logo" />
          <h1>Verify Your Email</h1>
        </div>

        <div className="card">
          <h2>Check your inbox!</h2>
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
  );
}
export default CheckInbox;
