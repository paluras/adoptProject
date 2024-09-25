import { useState } from 'react';

export const useForm = <T extends Record<string, unknown>>(initialState: T) => {
    const [formState, setFormState] = useState<T>(initialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (file: File | null, name: string) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: file,
        }));
    };

    return { formState, handleInputChange, handleFileChange, setFormState };
};
