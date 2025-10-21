import React from 'react';
import useGenerations from '../hooks/useGenerations';

interface Generation {
    id: number;
    prompt: string;
    style: string;
    imageUrl: string;
    createdAt: string;
}

interface RecentGenerationsProps {
    onRestore: (generation: Generation) => void;
}

const RecentGenerations: React.FC<RecentGenerationsProps> = ({ onRestore }) => {
    const { generations, isLoading, error } = useGenerations();

    if (isLoading) return <p>Loading recent generations...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="mt-8">
            <h3 className="text-xl mb-4">Recent Generations</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {(generations as Generation[]).map((gen) => (
                    <div
                        key={gen.id}
                        className="cursor-pointer border p-2 rounded"
                        onClick={() => onRestore(gen)}
                    >
                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}${gen.imageUrl}`}
                            alt={gen.prompt}
                            className="w-full h-32 object-cover rounded"
                        />
                        <p className="text-sm mt-2 truncate">{gen.prompt}</p>
                        <p className="text-xs text-gray-500">
                            {new Date(gen.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentGenerations;
