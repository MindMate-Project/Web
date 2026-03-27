import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMemory, getMemoryById } from '../../redux/slices/memorySlice';

const useUpdateMemory = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleUpdateMemory = async (id, body) => {
        setLoading(true);
        try {
            const response = await dispatch(
                updateMemory({ id, body })
            ).unwrap();

            // Refresh the specific memory data in the store
            await dispatch(getMemoryById(id));

            return {
                success: true,
                data: response,
            };
        } catch (error) {
            console.error("Failed to update memory:", error);
            return {
                success: false,
                error: error,
            };
        } finally {
            setLoading(false);
        }
    };

    return [handleUpdateMemory, loading];
};

export default useUpdateMemory;
