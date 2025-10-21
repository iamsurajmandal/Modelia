import { useState, useEffect } from 'react';
import api from '../api';

const useGenerations = () => {
    const [generations, setGenerations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenerations = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await api.get('/generations?limit=5');
                setGenerations(response.data);
            } catch (err) {
                setError('Error fetching generations');
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenerations();
    }, []);

    return { generations, isLoading, error };
};

export default useGenerations;
