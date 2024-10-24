import { useState } from 'react';

export const useForm = <T extends Record<string, unknown>>(initialState: T): {
    formState: T;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleFileChange: (files: File[] | null, name: string) => void;
    setFormState: React.Dispatch<React.SetStateAction<T>>;
} => {
    const [formState, setFormState] = useState<T>(initialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { name, value, } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (files: File[] | null, name: string): void => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: files,
        }));
    };

    return { formState, handleInputChange, handleFileChange, setFormState };
};
