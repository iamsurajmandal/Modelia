import React from 'react';
import { useNavigate } from 'react-router-dom';
import GenerationStudio from '../components/GenerationStudio';
import RecentGenerations from '../components/RecentGenerations';

interface Generation {
    id: number;
    prompt: string;
    style: string;
    imageUrl: string;
    createdAt: string;
}

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [restoredGeneration, setRestoredGeneration] = React.useState<Generation | null>(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleRestore = (generation: Generation) => {
        setRestoredGeneration(generation);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">Welcome to the AI Studio</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">
                    Logout
                </button>
            </div>
            <GenerationStudio
                key={restoredGeneration?.id}
                prompt={restoredGeneration?.prompt}
                style={restoredGeneration?.style}
                imageUrl={restoredGeneration?.imageUrl}
            />
            <RecentGenerations onRestore={handleRestore} />
        </div>
    );
};

export default HomePage;
