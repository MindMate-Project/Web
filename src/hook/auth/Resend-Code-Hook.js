import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";
const ResendCodeHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const onResendCode = async () => {
        const email = localStorage.getItem("user-email");

        if (!email) {
            setError("Email not found, try logging in again");
            return;
        }

        setError("");
        setMessage("");
        setLoading(true);

        await dispatch(
            forgetPassword({
                email,
            }),
        );

        setLoading(false);
        setMessage("Verification code resent to your email");
        setTimeout(() => {
            navigate("/api/auth/verify-reset-code");
        }, 1000);
    };

    return [onResendCode, loading, message, error];
};

export default ResendCodeHook;
