import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../../redux/slices/authSlice";

const LoginHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const lastProcessedRes = useRef(null);
    const hasSubmitted = useRef(false);

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const validationValues = () => {
        let isValid = true;
        let newErrors = {};
        if (!validateEmail(email)) {
            isValid = false;
            newErrors.email = "Email not valid";
        } else if (password.length < 6) {
            isValid = false;
            newErrors.password = "Password must be more than 5 characters";
        }
        setErrors(newErrors);
        return isValid;
    };

    const res = useSelector((state) => state.authReducer.loginUser);

    const onSubmit = (e) => {
        e?.preventDefault();
        const isValid = validationValues();
        if (!isValid) {
            return;
        }

        lastProcessedRes.current = res;
        hasSubmitted.current = true;
        setLoading(true);
        dispatch(
            loginUser({
                email: email,
                password: password,
            }),
        );
    };

    useEffect(() => {
        if (
            hasSubmitted.current &&
            loading &&
            res &&
            res !== lastProcessedRes.current
        ) {
            lastProcessedRes.current = res;
            hasSubmitted.current = false;
            setLoading(false);
            try {
                if (res.status === 200) {
                    localStorage.setItem(
                        "token",
                        res.data.token,
                    );
                    localStorage.setItem("user", JSON.stringify(res.data.data));
                    setTimeout(() => {
                        navigate("/api/dashboard");
                    }, 500);
                } else {
                    setErrors({ form: "Login failed. Please check your credentials." });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }, [loading, res, navigate]);

    return [
        email,
        password,
        loading,
        onChangeEmail,
        onChangePassword,
        onSubmit,
        errors,
    ];
};
export default LoginHook;
