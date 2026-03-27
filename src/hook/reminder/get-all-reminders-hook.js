import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRemindersByPatient } from '../../redux/slices/reminderSlice';

const useGetAllReminders = () => {
    const dispatch = useDispatch();

    const reminders = useSelector((state) => state.reminderReducer.reminders || []);
    const loading = useSelector((state) => state.reminderReducer.loading);

    const fetchReminders = useCallback((patientId) => {
        if (patientId) {
            dispatch(getRemindersByPatient(patientId));
        }
    }, [dispatch]);

    useEffect(() => {
        const patientId = localStorage.getItem("selectedPatientId");
        fetchReminders(patientId);
    }, [fetchReminders]);

    return { reminders, loading, fetchReminders };
};

export default useGetAllReminders;