import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyResetCode } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";
const VerifyResetCodeHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = useState(["", "", "", "", "",""]);
    const [loading, setLoading] = useState(false);
    const isPress = useRef(false);
    const [errors, setErrors] = useState({});

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
        if (joinedCode.trim().length !== 6) {
            setErrors({ form: "Please enter your 6-digit reset code" });
            return;
        }
        setErrors({});
        isPress.current = true;
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
        if (loading === false && isPress.current === true) {
            isPress.current = false;
            if (res) {
                if (res.status === 200) {
                    localStorage.setItem("reset-code-verified", "true");
                    localStorage.setItem("reset-code", code.join(""));
                    setTimeout(() => {
                        navigate("/api/auth/verification-success");
                    }, 500);
                } else {
                    setTimeout(() => {
                        navigate("/api/auth/verification-error");
                    }, 1500)
                }
            }
        }
    }, [loading, res, navigate, code]);

    return [code, OnChangeCode, onSubmit, onPasteCode, onKeyDown, inputsRef, loading, errors];
};

export default VerifyResetCodeHook;
