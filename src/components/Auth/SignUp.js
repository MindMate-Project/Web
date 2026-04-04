import "./SignUp.css";
import SignupHook from "./../../hook/auth/signup-hook";
import { ToastContainer } from "react-toastify";
import ImageSlider from "../ImageSlider/ImageSlider";
import Navbar from "../Navbar/Navbar";

function SignupPage() {
    const [
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        gender,
        password,
        confirmPassword,
        onChangeFirstName,
        onChangeLastName,
        onChangeEmail,
        onChangePhone,
        onChangeBirthDate,
        onChangeGender,
        onChangePassword,
        onChangeConfirmPassword,
        onSubmit,
    ] = SignupHook();
    return (
        <div className="signup">
            <Navbar />
            <div className="container">
                <div className="left">
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

                            <div className="row dob-gender-row">
                                <div className="field">
                                    <label>Date of birth</label>
                                    <input
                                        type="date"
                                        value={birthDate}
                                        onChange={onChangeBirthDate}
                                        required
                                    />
                                </div>

                                <div className="field">
                                    <label>Gender</label>
                                    <div className="gender-options">
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={gender === "male"}
                                                onChange={onChangeGender}
                                            />
                                            Male
                                        </label>
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={gender === "female"}
                                                onChange={onChangeGender}
                                            />
                                            Female
                                        </label>
                                    </div>
                                </div>
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

                            <button type="submit" onClick={onSubmit}>
                                Sign Up
                            </button>
                            <div className="login-redirect">
                                <p className="login-link">
                                    Already have an account?{" "}
                                    <a href="/api/auth/login">Log In</a>
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

export default SignupPage;
