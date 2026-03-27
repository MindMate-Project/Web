import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMemories } from '../../redux/slices/memorySlice';

const useSearchMemories = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // Select the search results from the Redux store
    const searchResults = useSelector((state) => state.memoryReducer.searchResults);

    const handleSearchMemories = async (tags) => {
        setLoading(true);
        try {
            await dispatch(searchMemories(tags)).unwrap();
        } catch (error) {
            console.error("Failed to search memories:", error);
        } finally {
            setLoading(false);
        }
    };

    return [handleSearchMemories, searchResults, loading];
};

export default useSearchMemories;
