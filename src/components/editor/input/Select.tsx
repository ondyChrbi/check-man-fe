import React from "react";
import {InputProps} from "./Input";

export interface Props extends InputProps {
    values : Map<string, string>
}

const Select = ({values, propertyName, register, placeHolder, defaultValue, label, error} : Props) => {
    return <>
        <label htmlFor={propertyName}>{label}</label>
        <select defaultValue={defaultValue} placeholder={placeHolder}
                {...register(propertyName)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
            {Array.from(values.keys()).map((key) =>
                <option key={key} value={key}>{values.get(key)}</option>
            )}

        </select>
        {error && <div className="text-red-800">{error}</div>}
    </>
}

export default Select;