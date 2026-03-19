import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRemindersByPatient } from "../../redux/slices/reminderSlice";

const useGetReminders = () => {
  const dispatch = useDispatch();
  const reminders = useSelector(state => state.reminder.reminders);
  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    if (patientId) dispatch(getRemindersByPatient(patientId));
  }, [dispatch, patientId]);

  return reminders;
};

export default useGetReminders;