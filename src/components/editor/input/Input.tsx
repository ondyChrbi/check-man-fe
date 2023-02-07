import React, {useEffect, useState} from "react";
import {UseFormRegister} from "react-hook-form/dist/types/form";

export interface InputProps {
    propertyName: string;
    register: UseFormRegister<any>;
    placeHolder?: string | undefined;
    defaultValue?: string | number | undefined;
    label?: string | undefined;
    error?: string | undefined;
    onInputChange? : (value: string) => void
}

const TYPING_DELAY = 1000;

const Input = ({propertyName, register, placeHolder, defaultValue, label, error, onInputChange} : InputProps) => {
    const {onChange, ...registers} = register(propertyName);
    const [description, setDescription] = useState("");

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (onInputChange) { onInputChange(description) }
        }, TYPING_DELAY);

        return () => clearTimeout(timeOutId);
    }, [description])

    const onChangeHandle = async (e: React.FormEvent<HTMLInputElement>) => {
        if (onChange) {
            await onChange(e)
        }

        //@ts-ignore
        setDescription(e.target.value);
    }

    return <>
        {label && <label htmlFor={propertyName}>{label}</label>}
        <input onChange={onChangeHandle} defaultValue={defaultValue} placeholder={placeHolder}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
               {...registers} />
        {error && <div className="text-red-800">{error}</div>}
    </>
};

export default Input;