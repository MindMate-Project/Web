import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateReminder, getRemindersByPatient } from "../../redux/slices/reminderSlice";

const useUpdateReminder = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateReminder = async (id, data, patientId) => {
    setLoading(true);
    setError(null);

    try {
      await dispatch(updateReminder({ id, data })).unwrap();

      if (patientId) {
        await dispatch(getRemindersByPatient(patientId));
      }

      return { success: true };

    } catch (err) {
      const msg = err?.data?.message || err.message || "Update failed";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  return [handleUpdateReminder, { loading, error }];
};

export default useUpdateReminder;