import React from "react";

interface InputFormProps {
    type: "text" | "number";
    name: string;
    formValue: string | number;
    placeHolder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    labelName: string;
}
const InputForm: React.FC<InputFormProps> = ({ type, name, formValue, placeHolder, onChange, labelName }) => {
    return (
        <div>
            <label htmlFor={name}>{labelName}</label>
            <input
                required
                type={type}
                name={name}
                value={formValue}
                onChange={onChange}
                placeholder={placeHolder}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
        </div>
    )
}

export default InputForm