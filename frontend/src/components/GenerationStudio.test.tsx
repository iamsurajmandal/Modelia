import { render, screen } from '@testing-library/react';
import GenerationStudio from './GenerationStudio';
import useGenerate from '../hooks/useGenerate';
import { vi } from 'vitest';

vi.mock('../hooks/useGenerate');

describe('GenerationStudio', () => {
    it('renders the form', () => {
        (useGenerate as any).mockReturnValue({ isLoading: false });
        render(<GenerationStudio />);
        expect(screen.getByLabelText('Image')).toBeInTheDocument();
        expect(screen.getByLabelText('Prompt')).toBeInTheDocument();
        expect(screen.getByLabelText('Style')).toBeInTheDocument();
        expect(screen.getByText('Generate')).toBeInTheDocument();
    });

    it('disables the generate button when submitting', () => {
        (useGenerate as any).mockReturnValue({ isLoading: true });
        render(<GenerationStudio />);
        expect(screen.getByText('Generating...')).toBeDisabled();
    });

    it('shows the abort button when submitting', () => {
        (useGenerate as any).mockReturnValue({ isLoading: true });
        render(<GenerationStudio />);
        expect(screen.getByText('Abort')).toBeInTheDocument();
    });
});
