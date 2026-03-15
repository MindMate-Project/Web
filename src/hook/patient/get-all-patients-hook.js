import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPatients } from '../../redux/slices/patientSlice';

const useGetAllPatients = () => {
    const dispatch = useDispatch();

    // Select the patients, loading, and error states from the Redux store
    const allPatients = useSelector((state) => state.patientReducer.patients);
  
    useEffect(() => {
        // Dispatch the action to fetch all patients when the hook is used
        dispatch(getAllPatients());
    }, [dispatch]);
    // Returning patients (as an array [patients, loading, error] for standard hook usage)
    return allPatients;
};

export default useGetAllPatients;
