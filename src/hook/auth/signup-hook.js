import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createNewUser } from "../../redux/slices/authSlice";

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
    const [errors, setErrors] = useState({});
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
        let newErrors = {};
        if (firstName === "") {
            isValid = false;
            newErrors.firstName = "First name is required";
        } 
        if (lastName === "") {
            isValid = false;
            newErrors.lastName = "Last name is required";
        } 
        if (!validateEmail(email)) {
            isValid = false;
            newErrors.email = "Email is not valid";
        } 
        if (!validatePhoneNumber(phone)) {
            isValid = false;
            newErrors.phone = "Phone number is not valid";
        } 
        if (!validateBirthDate(birthDate)) {
            isValid = false;
            newErrors.birthDate = "Birth date is required";
        } 
        if (!gender) {
            isValid = false;
            newErrors.gender = "Gender is required";
        } 
        if (password.length < 6) {
            isValid = false;
            newErrors.password = "Password must be at least 6 characters";
        } 
        if (password !== confirmPassword) {
            isValid = false;
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return isValid;
    };

    const res = useSelector((state) => state.authReducer.createUser);

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
                setTimeout(() => {
                    navigate("/api/auth/login");
                }, 500);
            } else {
                setErrors({ form: `Error Creating Account, ${res.data.message}` });
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
        loading,
        errors,
    ];
};
export default SignupHook;
