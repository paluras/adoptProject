import React, { useState, useEffect } from 'react';

interface AutoCompleteSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    label: string;
}

const AutoCompleteSelect: React.FC<AutoCompleteSelectProps> = ({
    options,
    value,
    onChange,
    placeholder,
    label
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {

            if (!options) return null;
            const newFilteredOptions = options
                .filter((option) =>
                    option.toLowerCase().includes(inputValue.toLowerCase())
                )
                .slice(0, 10);
            setFilteredOptions(newFilteredOptions);
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [inputValue, options]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsOpen(true);
    };

    const handleOptionClick = (option: string) => {
        setInputValue(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
            />
            {isOpen && filteredOptions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoCompleteSelect;