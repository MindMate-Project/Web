import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRemindersByPatient } from "../../redux/slices/reminderSlice";

const useGetReminders = () => {
  const dispatch = useDispatch();
  const reminders = useSelector(state => state.reminderReducer?.reminders || []);
  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    if (patientId) {
      dispatch(getRemindersByPatient(patientId));
    }
  }, [dispatch, patientId]);

  return { reminders, getReminders: (id) => dispatch(getRemindersByPatient(id)) };
};

export default useGetReminders;