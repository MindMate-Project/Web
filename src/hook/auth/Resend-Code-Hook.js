import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/actions/authAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const ResendCodeHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onResendCode = async () => {
        const email = localStorage.getItem("user-email");

        if (!email) {
            toast("Email not found, try logging in again", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                style: { backgroundColor: "white", color: "#0b236c" },
            });
            return;
        }

        setLoading(true);

        await dispatch(
            forgetPassword({
                email,
            }),
        );

        setLoading(false);

        toast("Verification code resent to your email", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            style: { backgroundColor: "white", color: "#0b236c" },
        });
        navigate("/api/auth/verify-reset-code");
    };

    return [onResendCode, loading];
};

export default ResendCodeHook;
