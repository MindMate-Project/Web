import logo from "../../images/logo.svg";
import google from "../../images/google.svg";
import "./Login.css";
import LoginHook from "../../hook/auth/login-hook";
import { ToastContainer } from "react-toastify";

function Login() {
  const [email, password, loading, onChangeEmail, onChangePassword, onSubmit] = LoginHook();
  return (
    <div className="login">
      <div className="container">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="Alzheimer Assistant Logo" />
          </div>

          <h2>Welcome Back</h2>
          <p className="subtitle">Please sign in to continue</p>

          <p className="description">
            Access the Alzheimer Assistant dashboard to manage patient profiles,
            monitor health updates, and stay connected with caregivers.
            Together, we're making care simpler, smarter, and more
            compassionate.
          </p>
        </div>
        <div className="right">
          <div className="card">
            <h2 className="card-title">Log In</h2>
            <form>
              <div class="field">
                <label>Enter your email</label>
                <input type="email" placeholder="@gmail.com" value={email} onChange={onChangeEmail} />
              </div>

              <div class="field">
                <label>Enter your Password</label>
                <input type="password" placeholder="***********" value={password} onChange={onChangePassword} />
              </div>

              <div className="option-forgot-password">
                <p className="forgot-password"> <a href="/api/auth/forgot-password">Forgot Password?</a></p>
              </div>

              <button type="submit" onClick={onSubmit}>Log In</button>
              <button className="google-login" type="button">
                <span className="google-icon"><img src={google} alt="Google Icon" /></span> continue with Google
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
  );
}

export default Login;
