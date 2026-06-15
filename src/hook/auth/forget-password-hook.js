import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";

const ForgetPasswordHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const isPress = useRef(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const OnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

const onSubmit = async (e) => {
    e.preventDefault();
        if (email === "") {
             setErrors({email: "Please enter your email address"});
            return;
        } else if (!validateEmail(email)) {
             setErrors({email: "Email is not valid"});
             return;
        }
        setErrors({});
        setSuccessMessage("");
        localStorage.setItem("user-email", email);
        isPress.current = true;
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
        if (loading === false && isPress.current === true) {
            isPress.current = false;
            if (res) {
                if (res.status === 200) {
                    setSuccessMessage("If an account exists for that email, a password reset code has been sent.");
                    setTimeout(() => {
                        navigate("/api/auth/verify-reset-code");
                    }, 5000);
                }
                else if (res.status === 404) {
                    setErrors({ form: "This account does not exist" });
                }
                else{
                    setErrors({ form: "An error occurred while processing your request" });
                }
            }
        }
    }, [loading, res, navigate]);

    return [OnChangeEmail, email, onSubmit, loading, errors, successMessage];
};

export default ForgetPasswordHook;
