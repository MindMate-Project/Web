import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ResetPasswordHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setComfirmPassword] = useState("");
    const [loading, setLoading] = useState(true);

    const OnChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const OnChangeConfirmPassword = (e) => {
        setComfirmPassword(e.target.value);
    };
    const onSubmit = async () => {
        if (password === "" || confirmPassword === "") {
            toast("Please enter your password and confirm password", {
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
        if (password !== confirmPassword) {
            toast("Password and confirm password do not match", {
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
            resetPassword({
                email: localStorage.getItem("user-email"),
                password: password,
                passwordConfirmation: confirmPassword,
            }),
        );
        setLoading(false);
    };

    const res = useSelector((state) => state.authReducer.resetPassword);

    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.status === 200) {
                    toast("Password changed successfully", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        style: { backgroundColor: "white", color: "#0b236c" },
                    });
                    setTimeout(() => {
                        navigate("/api/auth/login");
                    }, 1500);
                }
                else if (res.status === 400) {
                    toast("Please enter your password", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        style: { backgroundColor: "white", color: "#0b236c" },
                    });
                }
                else{
                    toast("An error occurred while resetting password", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        style: { backgroundColor: "white", color: "#0b236c" },
                    });
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
    ];
};

export default ResetPasswordHook;
