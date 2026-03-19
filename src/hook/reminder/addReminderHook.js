import { useDispatch } from 'react-redux';
import { createReminder } from '../../redux/slices/reminderSlice';
import { useState } from 'react';

const useCreateReminder = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateReminder = async (data) => {
        setLoading(true);
        setError(null);
        try {
            await dispatch(createReminder(data)).unwrap();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return [handleCreateReminder, { loading, error }];
};

export default useCreateReminder;