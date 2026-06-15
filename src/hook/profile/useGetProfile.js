import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/slices/profileSlice";

const useGetProfile = () => {
  const dispatch = useDispatch();

  const profileState = useSelector(
    (state) => state.profileReducer
  );

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return profileState;
};

export default useGetProfile;