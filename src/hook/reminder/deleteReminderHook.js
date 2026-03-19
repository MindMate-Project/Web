import { useDispatch } from "react-redux";
import { deleteReminder } from "../../redux/slices/reminderSlice";
import { useState } from "react";

export const useDeleteReminder = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);

    try {
      
      await dispatch(deleteReminder(id)).unwrap();

      setLoading(false);
      return true; // success

    } catch (err) {
      setLoading(false);
      setError(err?.message || "Failed to delete reminder");
      return false;
    }
  };

  return { handleDelete, loading, error };
};