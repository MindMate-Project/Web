// import logo from "../../images/Logo.png";
import google from "../../images/google.svg";
import "./Login.css";
import LoginHook from "../../hook/auth/login-hook";
import { ToastContainer } from "react-toastify";
import ImageSlider from "../ImageSlider/ImageSlider";
import LogoHeader from "./LogoHeader";
import AuthLayout from "./AuthLayout";
function Login() {
  const [email, password, , onChangeEmail, onChangePassword, onSubmit] =
    LoginHook();
  return (

  <AuthLayout>
    <div className="login">
      <div className="container">
        {/* <div className="logo">
            <LogoHeader/>
         </div> */}
        <div className="left">


            <ImageSlider/>
       </div>
        <div className="right">
          <div className="card">
            <h2 className="card-title">Log In</h2>
            <form>
              <div class="field">
                <label>Enter your email</label>
                <input
                  type="email"
                  placeholder="@gmail.com"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>

              <div class="field">
                <label>Enter your Password</label>
                <input
                  type="password"
                  placeholder="***********"
                  value={password}
                  onChange={onChangePassword}
                />
                <div className="option-forgot-password">
                <p className="forgot-password">
                  {" "}
                  <a href="/api/auth/forgot-password">Forgot Password?</a>
                </p>
              </div>
              </div>


              <button type="submit" onClick={onSubmit}>
                Log In
              </button>
              <button className="google-login" type="button">
                <span className="google-icon">
                  <img src={google} alt="Google Icon" />
                </span>{" "}
                Continue with Google
              </button>
              <div className="signup-redirect">
                <p className="signup-link">
                  Don't have an account? <a href="/api/auth/signup">Sign Up</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  </AuthLayout>
  );
}

export default Login;
