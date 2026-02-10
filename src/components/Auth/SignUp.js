import logo from "../../images/Logo.png";
import "./SignUp.css";
import SignupHook from "./../../hook/auth/signup-hook";
import { ToastContainer } from "react-toastify";
import ImageSlider from "../ImageSlider/ImageSlider";
import LogoHeader from "./LogoHeader"
function SignupPage() {
  const [
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    password,
    confirmPassword,
    onChangeFirstName,
    onChangeLastName,
    onChangeEmail,
    onChangePhone,
    onChangeBirthDate,
    onChangePassword,
    onChangeConfirmPassword,
    onSubmit,
  ] = SignupHook();
  return (
    <div className="signup">
      <div className="container">
        <div className="left">
          <div className="logo">
            <LogoHeader/>
          </div>

          <ImageSlider />
          
        </div>
        <div className="right">
          <div className="card">
            <h2 className="card-title">Sign Up</h2>

            <form className="card-form">
              <div className="row">
                <div className="field">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder="Mahmoud"
                    value={firstName}
                    onChange={onChangeFirstName}
                  />
                </div>

                <div className="field">
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Abdellah"
                    value={lastName}
                    onChange={onChangeLastName}
                  />
                </div>
              </div>

              <div className="field">
                <label>Enter your email</label>
                <input
                  type="email"
                  placeholder="@gmail.com"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>

              <div className="field">
                <label>Phone number</label>
                <input
                  type="text"
                  placeholder="***********"
                  value={phone}
                  onChange={onChangePhone}
                />
              </div>

              <div className="field">
                <label>Date of birth</label>
                <input
                  type="text"
                  placeholder="14/2/2004"
                  value={birthDate}
                  onChange={onChangeBirthDate}
                />
              </div>

              <div className="field">
                <label>Set Password</label>
                <input
                  type="password"
                  placeholder="***********"
                  value={password}
                  onChange={onChangePassword}
                />
              </div>

              <div className="field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="***********"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                />
              </div>

              <button type="submit" onClick={onSubmit} >Sign Up</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignupPage;
