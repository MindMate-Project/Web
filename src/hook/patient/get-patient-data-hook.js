import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientData } from '../../redux/slices/patientSlice';

const useGetPatientData = (id) => {
    const dispatch = useDispatch();

    // Select the patient, loading, and error states from the Redux store
    const patientData = useSelector((state) => state.patientReducer.patient);
  
    useEffect(() => {
        // Dispatch the action to fetch patient data when the hook is used and an ID is provided
        if (id) {
            dispatch(getPatientData(id));
        }
    }, [dispatch, id]);

    // Returning the patient slice state (which contains 'patient', 'loading', 'error', etc.)
    return [patientData];
};

export default useGetPatientData;
