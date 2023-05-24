import React, {useEffect, useState} from "react";
import {UseFormRegister} from "react-hook-form/dist/types/form";

export interface InputProps {
    propertyName: string;
    register: UseFormRegister<any>;
    css?: string;
    placeHolder?: string | undefined;
    defaultValue?: string | number | undefined | null;
    label?: string | undefined;
    error?: string | undefined;
    onInputChange? : (value: string) => void
}

const Input = ({propertyName, register, placeHolder, defaultValue, label, error, onInputChange, css = CSS_DEFAULT} : InputProps) => {
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
        <input onChange={onChangeHandle} defaultValue={defaultValue!} placeholder={placeHolder}
               className={`${css} focus:ring-blue-500 focus:border-blue-500 block`}
               {...registers} />
        {error && <div className="text-red-800">{error}</div>}
    </>
};

const CSS_DEFAULT = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full";
const TYPING_DELAY = 1000;

export default Input;