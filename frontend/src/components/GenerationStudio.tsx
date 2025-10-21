import React, { useState, useEffect } from 'react';
import useGenerate from '../hooks/useGenerate';

interface GenerationStudioProps {
    prompt?: string;
    style?: string;
    imageUrl?: string;
}

const GenerationStudio: React.FC<GenerationStudioProps> = ({
                                                               prompt: initialPrompt = '',
                                                               style: initialStyle = 'style1',
                                                               imageUrl: initialImageUrl,
                                                           }) => {
    const [prompt, setPrompt] = useState(initialPrompt);
    const [style, setStyle] = useState(initialStyle);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(initialImageUrl ? `${import.meta.env.VITE_API_BASE_URL}${initialImageUrl}` : null);
    const { isLoading, error, generate, abort } = useGenerate();

    useEffect(() => {
        setPrompt(initialPrompt);
        setStyle(initialStyle);
        setPreview(initialImageUrl ? `${import.meta.env.VITE_API_BASE_URL}${initialImageUrl}` : null);
    }, [initialPrompt, initialStyle, initialImageUrl]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image && !initialImageUrl) return;

        const formData = new FormData();
        formData.append('prompt', prompt);
        formData.append('style', style);
        if (image) {
            formData.append('imageUpload', image);
        }

        await generate(formData);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Image Generation Studio</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="image-upload" className="block text-gray-700">Image</label>
                    <input id="image-upload" type="file" onChange={handleImageChange} className="w-full" />
                    {preview && <img src={preview} alt="Preview" className="mt-2 h-48" />}
                </div>
                <div className="mb-4">
                    <label htmlFor="prompt-input" className="block text-gray-700">Prompt</label>
                    <input
                        id="prompt-input"
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="style-select" className="block text-gray-700">Style</label>
                    <select
                        id="style-select"
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="style1">Style 1</option>
                        <option value="style2">Style 2</option>
                        <option value="style3">Style 3</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded" disabled={isLoading}>
                    {isLoading ? 'Generating...' : 'Generate'}
                </button>
                {isLoading && (
                    <button onClick={abort} className="w-full bg-red-500 text-white py-2 rounded mt-2">
                        Abort
                    </button>
                )}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default GenerationStudio;
