import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePatient, getAllPatients } from '../../redux/slices/patientSlice';

const useDeletePatient = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await dispatch(deletePatient(id)).unwrap();
            // Refresh the patients list after deleting a patient
            await dispatch(getAllPatients());
        } catch (error) {
            console.error("Failed to delete patient", error);
        } finally {
            setLoading(false);
        }
    };

    return [handleDelete, loading];
};

export default useDeletePatient;
