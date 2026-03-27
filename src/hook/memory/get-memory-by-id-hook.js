import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemoryById } from '../../redux/slices/memorySlice';

const useGetMemoryById = (id) => {
    const dispatch = useDispatch();

    // Select the single memory from the Redux store
    const memoryData = useSelector((state) => state.memoryReducer.memory);

    useEffect(() => {
        if (id) {
            dispatch(getMemoryById(id));
        }
    }, [dispatch, id]);

    return [memoryData];
};

export default useGetMemoryById;
