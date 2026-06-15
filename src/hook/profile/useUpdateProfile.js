import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  getProfile,
} from "../../redux/slices/profileSlice";

const useUpdateProfile = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    updateStatus,
    profile,
  } = useSelector((state) => state.profileReducer);

  const handleUpdateProfile = async (profileData) => {
    const result = await dispatch(
      updateProfile(profileData)
    );

    if (updateProfile.fulfilled.match(result)) {
      dispatch(getProfile());
    }

    return result;
  };

  return {
    handleUpdateProfile,
    loading,
    error,
    updateStatus,
    profile,
  };
};

export default useUpdateProfile;