import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/authAction";
import { toast } from "react-toastify";

const LoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
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
    let message = "";
    if (!validateEmail(email)) {
      isValid = false;
      message = "Email not valid";
    } else if (password.length < 6) {
      isValid = false;
      message = "Password must be more than 5 characters";
    }

    return [isValid, message];
  };

  const res = useSelector((state) => state.authReducer.loginUser);

  const onSubmit = (e) => {
    e?.preventDefault();
    console.log("Submitting login form with:", { email, password });
    const [isValid, message] = validationValues();
    if (!isValid) {
      toast(message, {
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
      console.log("Response received:", res);
      try {
        if (res.status === 200) {
          console.log("inside res.status :", res.status);
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("user", JSON.stringify(res.data.data));
          toast("Login successful! Redirecting...", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            style: { backgroundColor: "white", color: "#0b236c" },
          });
          setTimeout(() => {
              navigate("/");
          }, 1600);
          //
        } else {
          toast("Login failed. Please check your credentials.", {
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
      } catch (err) {
        console.log(err);
      }
    }
  }, [loading, res]);

  return [email, password, loading, onChangeEmail, onChangePassword, onSubmit];
};
export default LoginHook;
