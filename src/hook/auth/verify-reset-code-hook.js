import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyResetCode } from "../../redux/actions/authAction";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const VerifyResetCodeHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = useState(["", "", "", "", "",""]);
    const [loading, setLoading] = useState(true);

    const inputsRef = useRef([]);
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

        if (value && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const onKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
        inputsRef.current[index - 1].focus();
        }
    };


    const onPasteCode = (e) => {

        e.preventDefault();
        const pasteData = e.clipboardData.getData("text");

   
        if (!/^\d+$/.test(pasteData)) return;

        setCode((prev) => {
        const newCode = [...prev];
        const maxLength = newCode.length;

        
        for (let i = 0; i < maxLength; i++) {
            newCode[i] = pasteData[i] || "";
        }

        return newCode;
        });
        const lastFilled = Math.min(pasteData.length, inputsRef.current.length) - 1;
        if (inputsRef.current[lastFilled]) inputsRef.current[lastFilled].focus();
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
                        navigate("/api/auth/verification-success");
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
                    setTimeout(() => {
                        navigate("/api/auth/verification-error");
                    }, 1500)
                }
            }
        }
    }, [loading]);

    return [code, OnChangeCode, onSubmit, onPasteCode, onKeyDown, inputsRef];
};

export default VerifyResetCodeHook;
