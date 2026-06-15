import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../../redux/slices/profileSlice";
import baseUrl from "../../API/baseURL";

const useUploadProfilePicture = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const uploadPicture = async (file) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const res = await baseUrl.post(
        "/api/users/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await dispatch(getProfile());

      return {
        success: true,
        data: res.data,
      };
    } catch (err) {
      return {
        success: false,
        error: err,
      };
    } finally {
      setLoading(false);
    }
  };

  return [uploadPicture, { loading }];
};

export default useUploadProfilePicture;