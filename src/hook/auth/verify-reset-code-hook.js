import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyResetCode } from "../../redux/actions/authAction";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const VerifyResetCodeHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = useState(["", "", "", "", ""]);
    const [loading, setLoading] = useState(true);

    const OnChangeCode = (e, index) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) {
            return;
        }

        setCode((prevCode) => {
            const nextCode = [...prevCode];
            nextCode[index] = value.slice(-1);
            return nextCode;
        });
    };

    const onSubmit = async () => {
        const joinedCode = code.join("");
        if (joinedCode.trim() === "") {
            toast("Please enter your reset code", {
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
            verifyResetCode({
                code: joinedCode,
            }),
        );
        setLoading(false);
    };

    const res = useSelector((state) => state.authReducer.verifyResetCode);

    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.status === 200) {
                    toast("Reset code verified successfully", {
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
                        navigate("/api/auth/set-new-password");
                    }, 1500);
                } else {
                    toast("Invalid or expired reset code", {
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
    }, [loading]);

    return [code, OnChangeCode, onSubmit];
};

export default VerifyResetCodeHook;
