import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMemory, getAllMemories } from '../../redux/slices/memorySlice';

const useDeleteMemory = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleDeleteMemory = async (id, patientId) => {
        setLoading(true);
        try {
            await dispatch(deleteMemory(id)).unwrap();

            // Refresh the memories list if patientId is provided
            if (patientId) {
                await dispatch(getAllMemories(patientId));
            }
        } catch (error) {
            console.error("Failed to delete memory:", error);
        } finally {
            setLoading(false);
        }
    };

    return [handleDeleteMemory, loading];
};

export default useDeleteMemory;
