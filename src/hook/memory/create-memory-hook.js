import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMemory, getAllMemories } from '../../redux/slices/memorySlice';

const useCreateMemory = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleCreateMemory = async (body, patientId) => {
        setLoading(true);
        try {
            const response = await dispatch(createMemory(body)).unwrap();

            // Refresh the memories list if patientId is provided
            if (patientId) {
                await dispatch(getAllMemories(patientId));
            }

            return {
                success: true,
                data: response,
            };
        } catch (error) {
            console.error("Failed to create memory:", error);
            return {
                success: false,
                error: error,
            };
        } finally {
            setLoading(false);
        }
    };

    return [handleCreateMemory, loading];
};

export default useCreateMemory;
