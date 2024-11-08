import React from "react";
interface Selection {
    key: string;
    display: string;
}

interface SelectFormProps {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selections: Selection[];
    placeHolder: string;
    disabled?: boolean;
    labelName?: string;
}

const SelectForm: React.FC<SelectFormProps> = ({ name, value, onChange, selections, placeHolder, labelName }) => {
    return (
        <div>
            <label htmlFor={name}>{labelName}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
                <option value="">{placeHolder}</option>
                {selections.map((selection, index) => (
                    <option key={index} value={selection.key}>{selection.display}</option>
                ))}
            </select>
        </div>
    )
}
export default SelectForm