import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../redux/actions/authAction";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


const ForgetPasswordHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

    const OnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

const onSubmit = async (e) => {
    e.preventDefault();
        if (email === "") {
             toast('Please enter your email address', {
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
        localStorage.setItem("user-email", email);
        setLoading(true);
        await dispatch(
            forgetPassword({
                email,
            }),
        );
        setLoading(false);
    };

    const res = useSelector((state) => state.authReducer.forgetPassword);

    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.status === 200) {
                    toast("Verification code sent to your email", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    });
                    setTimeout(() => {
                        navigate("/api/auth/verify-reset-password");
                    }, 2000);
                }
                else if (res.status === 404) {
                    toast("This account does not exist", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    });
                }
                else{
                    toast("An error occurred while processing your request", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    });
                }
            }
        }
    }, [loading, res, navigate]);

    return [OnChangeEmail, email, onSubmit];
};

export default ForgetPasswordHook;
