import "./SignUp.css";
import SignupHook from "./../../hook/auth/signup-hook";
import ImageSlider from "../ImageSlider/ImageSlider";
import AuthNavbar from "../AuthNavbar/AuthNavbar";

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
        loading,
        errors,
    ] = SignupHook();
    return (
        <div className="signup">
            <AuthNavbar />
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
                                        className={errors?.firstName ? "input-error" : ""}
                                    />
                                    {errors?.firstName && <span className="error-text">{errors.firstName}</span>}
                                </div>

                                <div className="field">
                                    <label>Last name</label>
                                    <input
                                        type="text"
                                        placeholder="Abdellah"
                                        value={lastName}
                                        onChange={onChangeLastName}
                                        className={errors?.lastName ? "input-error" : ""}
                                    />
                                    {errors?.lastName && <span className="error-text">{errors.lastName}</span>}
                                </div>
                            </div>

                            <div className="field">
                                <label>Enter your email</label>
                                <input
                                    type="email"
                                    placeholder="@gmail.com"
                                    value={email}
                                    onChange={onChangeEmail}
                                    className={errors?.email ? "input-error" : ""}
                                />
                                {errors?.email && <span className="error-text">{errors.email}</span>}
                            </div>

                            <div className="field">
                                <label>Phone number</label>
                                <input
                                    type="text"
                                    placeholder="***********"
                                    value={phone}
                                    onChange={onChangePhone}
                                    className={errors?.phone ? "input-error" : ""}
                                />
                                {errors?.phone && <span className="error-text">{errors.phone}</span>}
                            </div>

                            <div className="row dob-gender-row">
                                <div className="field">
                                    <label>Date of birth</label>
                                    <input
                                        type="date"
                                        value={birthDate}
                                        onChange={onChangeBirthDate}
                                        className={errors?.birthDate ? "input-error" : ""}
                                    />
                                    {errors?.birthDate && <span className="error-text">{errors.birthDate}</span>}
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
                                    {errors?.gender && <span className="error-text">{errors.gender}</span>}
                                </div>
                            </div>

                            <div className="field">
                                <label>Set Password</label>
                                <input
                                    type="password"
                                    placeholder="***********"
                                    value={password}
                                    onChange={onChangePassword}
                                    className={errors?.password ? "input-error" : ""}
                                />
                                {errors?.password && <span className="error-text">{errors.password}</span>}
                            </div>

                            <div className="field">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="***********"
                                    value={confirmPassword}
                                    onChange={onChangeConfirmPassword}
                                    className={errors?.confirmPassword ? "input-error" : ""}
                                />
                                {errors?.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                            </div>
                            
                            {errors?.form && <div className="form-error">{errors.form}</div>}

                            <button 
                                type="submit" 
                                onClick={onSubmit} 
                                disabled={loading}
                                className={`submit-btn ${loading ? 'loading' : ''}`}
                            >
                                {loading ? <span className="auth-spinner"></span> : "Sign Up"}
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
        </div>
    );
}

export default SignupPage;
