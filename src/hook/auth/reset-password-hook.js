import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";
const ResetPasswordHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setComfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const isPress = useRef(false);
    const [errors, setErrors] = useState({});

    const OnChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const OnChangeConfirmPassword = (e) => {
        setComfirmPassword(e.target.value);
    };
    const onSubmit = async () => {
        let newErrors = {};
        let hasError = false;
        if (password === "") {
            newErrors.password = "Please enter your password";
            hasError = true;
        }
        if (confirmPassword === "") {
            newErrors.confirmPassword = "Please confirm your password";
            hasError = true;
        }
        if (!hasError && password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            hasError = true;
        }
        if (!hasError && password !== confirmPassword) {
            newErrors.confirmPassword = "Password and confirm password do not match";
            hasError = true;
        }
        setErrors(newErrors);
        
        if (hasError) return;

        isPress.current = true;
        setLoading(true);
        await dispatch(
            resetPassword({
                email: localStorage.getItem("user-email"),
                password: password,
                passwordConfirmation: confirmPassword,
                code: localStorage.getItem("reset-code") || "",
            }),
        );
        setLoading(false);
    };

    const res = useSelector((state) => state.authReducer.resetPassword);

    useEffect(() => {
        if (loading === false && isPress.current === true) {
            isPress.current = false;
            if (res) {
                if (res.status === 200) {
                    localStorage.removeItem("user-email");
                    localStorage.removeItem("reset-code-verified");
                    localStorage.removeItem("reset-code");
                    setTimeout(() => {
                        navigate("/api/auth/login");
                    }, 500);
                }
                else if (res.status === 400) {
                    setErrors({ form: res.data?.message || "Invalid password or request. Please try again." });
                }
                else{
                    setErrors({ form: res.data?.message || "An error occurred while resetting password" });
                }
            }
        }
    }, [loading, res, navigate]);

    return [
        password,
        confirmPassword,
        OnChangePassword,
        OnChangeConfirmPassword,
        onSubmit,
        loading,
        errors,
    ];
};

export default ResetPasswordHook;
