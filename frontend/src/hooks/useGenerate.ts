import { useState, useRef } from 'react';
import api from '../api';

const useGenerate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const generate = async (formData: FormData, currentRetries = 0) => {
        setIsLoading(true);
        setError(null);
        abortControllerRef.current = new AbortController();

        try {
            const response = await api.post('/generations', formData, {
                signal: abortControllerRef.current.signal,
            });
            setIsLoading(false);
            return response.data;
        } catch (err) {
            if ((err as any).response && (err as any).response.status === 500 && currentRetries < 3) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return generate(formData, currentRetries + 1);
            }
            setError('Error generating image');
            setIsLoading(false);
        }
    };

    const abort = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    return { isLoading, error, generate, abort };
};

export default useGenerate;
