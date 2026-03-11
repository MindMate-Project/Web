import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePatientData, getPatientData } from '../../redux/slices/patientSlice';

const useEditPatient = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleEditPatient = async (id, data) => {
        setLoading(true);
        try {
            const response = await dispatch(
                updatePatientData({ id, data })
            ).unwrap();
            
            // Refresh the specific patient's data in the store to reflect the new edits
            await dispatch(getPatientData(id));
            
            return {
                success: true,
                data: response,
            };
        } catch (error) {
            console.error("Failed to update patient data:", error);
            return {
                success: false,
                error: error,
            };
        } finally {
            setLoading(false);
        }
    };

    return [handleEditPatient, loading];
};

export default useEditPatient;
