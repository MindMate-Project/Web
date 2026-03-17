import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createNewUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("male");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const lastProcessedRes = useRef(null);
    const hasSubmitted = useRef(false);

    const onChangeFirstName = (e) => {
        setfirstName(e.target.value);
    };
    const onChangeLastName = (e) => {
        setlastName(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const onChangeBirthDate = (e) => {
        const raw = e.target.value;
        if (raw) {
            const [year, month, day] = raw.split("-");
            setBirthDate(
                `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
            );
        } else {
            setBirthDate("");
        }
    };

    const onChangeGender = (e) => {
        setGender(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };
    const validatePhoneNumber = (phone) => {
        return String(phone)
            .toLowerCase()
            .match(/^01[0-9]{9}$/);
    };
    const validateBirthDate = (birthDate) => {
        return birthDate && birthDate.trim() !== "";
    };

    const validationValues = () => {
        let isValid = true;
        let message = "";
        if (firstName === "") {
            isValid = false;
            message = "First name is required";
        } else if (lastName === "") {
            isValid = false;
            message = "Last name is required";
        } else if (!validateEmail(email)) {
            isValid = false;
            message = "Email is not valid";
        } else if (!validatePhoneNumber(phone)) {
            isValid = false;
            message = "Phone number is not valid";
        } else if (!validateBirthDate(birthDate)) {
            isValid = false;
            message = "Birth date is not valid";
        } else if (!gender) {
            isValid = false;
            message = "Gender is required";
        } else if (password.length < 6) {
            isValid = false;
            message = "Password must be more than 5 characters";
        } else if (password !== confirmPassword) {
            isValid = false;
            message = "Passwords do not match";
        }
        return [isValid, message];
    };

    const res = useSelector((state) => state.authReducer.createUser);

    const onSubmit = (e) => {
        e?.preventDefault();

        const [isValid, message] = validationValues();
        if (!isValid) {
            alert(message);
            return;
        }
        lastProcessedRes.current = res;
        hasSubmitted.current = true;
        setLoading(true);
        dispatch(
            createNewUser({
                name: `${firstName} ${lastName}`,
                email: email,
                password: password,
                passwordConfirm: confirmPassword,
                phoneNumber: phone,
                dateOfBirth: birthDate,
                gender: gender,
                address: "No Address",
                role: "caregiver",
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

            if (res.status === 201) {
                // alert("Account created successfully!");
                toast(
                    "Account created successfully! Please verify your email. check your inbox",
                    {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        style: { backgroundColor: "white", color: "#0b236c" },
                    },
                );
                setTimeout(() => {
                    navigate("/api/auth/login");
                }, 3000);
            } else {
                // console.log('this is res',res);
                toast.error(`Error Creating Account ,${res.data.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            }
        }
    }, [loading, res, navigate]);

    return [
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        gender,
        password,
        confirmPassword,
        onChangeFirstName,
        onChangeLastName,
        onChangeEmail,
        onChangePhone,
        onChangeBirthDate,
        onChangeGender,
        onChangePassword,
        onChangeConfirmPassword,
        onSubmit,
    ];
};
export default SignupHook;
