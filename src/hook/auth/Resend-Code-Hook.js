import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../redux/actions/authAction";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ResendCodeHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onResendCode = async () => {
    const email = localStorage.getItem("user-email");

    if (!email) {
      toast("Email not found");
      return;
    }

    setLoading(true);

    await dispatch(
      forgetPassword({
        email,
      })
    );

    setLoading(false);

    toast("Verification code resent to your email");
  };

  return [onResendCode, loading];
};

export default ResendCodeHook;