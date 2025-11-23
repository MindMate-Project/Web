import logo from "../../images/logo.svg";
import "./SignUp.css";

function SignupPage() {
  return (
    <div className="signup">
      <div className="container">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="Alzheimer Assistant Logo" />
          </div>

          <h2>Sign up</h2>
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
            <h2 className="card-title">Sign Up</h2>

            <form>
              <div class="row">
                <div class="field">
                  <label>First name</label>
                  <input type="text" placeholder="Mahmoud" />
                </div>

                <div class="field">
                  <label>Last name</label>
                  <input type="text" placeholder="Abdellah" />
                </div>
              </div>

              <div class="field">
                <label>Enter your email</label>
                <input type="email" placeholder="@gmail.com" />
              </div>

              <div class="field">
                <label>Phone number</label>
                <input type="text" placeholder="***********" />
              </div>

              <div class="field">
                <label>Date of birth</label>
                <input type="text" placeholder="14/2/2004" />
              </div>

              <div class="field">
                <label>Set Password</label>
                <input type="password" placeholder="***********" />
              </div>

              <div class="field">
                <label>Confirm Password</label>
                <input type="password" placeholder="***********" />
              </div>

              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
