import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMemories } from '../../redux/slices/memorySlice';

const useGetAllMemories = (patientId) => {
    const dispatch = useDispatch();

    // Select the memories from the Redux store
    const allMemories = useSelector((state) => state.memoryReducer.memories);

    useEffect(() => {
        if (patientId) {
            dispatch(getAllMemories(patientId));
        }
    }, [dispatch, patientId]);

    return allMemories;
};

export default useGetAllMemories;
