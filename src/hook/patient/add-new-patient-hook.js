import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assignPatientRequest, getAllPatients } from '../../redux/slices/patientSlice';

const useAddPatient = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleAddPatient = async (email, relation) => {
        setLoading(true);
        try {
            // Using the payload expected by the assignPatientRequest thunk
            const response = await dispatch(
                assignPatientRequest({ patientEmail: email, relation })
            ).unwrap();
            
            // Optionally refresh the list of patients to include the new one
            await dispatch(getAllPatients());
            
            return {
                success: true,
                data: response,
            };
        } catch (error) {
            console.error("Failed to assign new patient:", error);
            return {
                success: false,
                error: error,
            };
        } finally {
            setLoading(false);
        }
    };

    return [handleAddPatient, loading];
};

export default useAddPatient;
