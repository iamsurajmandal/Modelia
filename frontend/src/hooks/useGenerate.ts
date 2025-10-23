import { useState, useRef } from 'react';
import api from '../api';

const useGenerate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [retries, setRetries] = useState(0);
    const abortControllerRef = useRef<AbortController | null>(null);

    const generate = async (formData: FormData) => {
        setIsLoading(true);
        setError(null);
        abortControllerRef.current = new AbortController();

        try {
            const response = await api.post('/generations', formData, {
                signal: abortControllerRef.current.signal,
            });
            setIsLoading(false);
            setRetries(0);
            return response.data;
        } catch (err: any) {
            if (err.name === 'CanceledError') {
                setIsLoading(false);
                return;
            }

            if (err.response && err.response.data.message === 'Model overloaded' && retries < 3) {
                setError('Model is overloaded. Retrying...');
                setRetries(retries + 1);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                return generate(formData);
            }

            setError(err.response?.data?.message || 'Error generating image. Please try again.');
            setIsLoading(false);
        }
    };

    const abort = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const tryAgain = (formData: FormData) => {
        setRetries(0);
        setError(null);
        generate(formData);
    }

    return { isLoading, error, generate, abort, tryAgain };
};

export default useGenerate;
