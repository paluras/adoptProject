import { useState } from 'react';

export const useForm = <T extends Record<string, unknown>>(initialState: T) => {
    const [formState, setFormState] = useState<T>(initialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (files: File[] | null, name: string) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: files,
        }));
    };

    return { formState, handleInputChange, handleFileChange, setFormState };
};
