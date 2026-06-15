import { useState } from "react";
import baseUrl from "../../API/baseURL";

const useDeleteProfilePicture = () => {
  const [loading, setLoading] = useState(false);

  const deletePicture = async () => {
    setLoading(true);

    try {
      const res = await baseUrl.delete("/api/users/profile-picture", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return [deletePicture, { loading }];
};

export default useDeleteProfilePicture;