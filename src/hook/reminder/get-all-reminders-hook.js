import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRemindersByPatient } from '../../redux/slices/reminderSlice';

const useGetAllReminders = () => {
    const dispatch = useDispatch();

    const allReminders = useSelector(
        (state) => state.reminderReducer.reminders
    );

    useEffect(() => {
        const patientId = localStorage.getItem("selectedPatientId");

        if (patientId) {
            dispatch(getRemindersByPatient(patientId));
        }
    }, [dispatch]);

    return allReminders; 
};

export default useGetAllReminders;