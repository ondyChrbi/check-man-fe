import React from "react";
import {UseFormRegister} from "react-hook-form/dist/types/form";

export interface InputProps {
    propertyName: string;
    register: UseFormRegister<any>;
    placeHolder?: string | undefined;
    defaultValue?: string | number | undefined;
    label?: string | undefined;
    error?: string | undefined;
}

const Input = ({propertyName, register, placeHolder, defaultValue, label, error} : InputProps) => {
    return <>
        {label && <label htmlFor={propertyName}>{label}</label>}
        <input defaultValue={defaultValue} placeholder={placeHolder}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
               {...register(propertyName)} />
        {error && <div className="text-red-800">{error}</div>}
    </>
};

export default Input;