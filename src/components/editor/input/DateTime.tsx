import {InputProps} from "./Input";
import {Control, Controller} from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import React from "react";

export interface Props extends InputProps {
    control: Control<any>,
    required?: boolean | undefined;
}

const DateTime = ({
                      propertyName,
                      defaultValue,
                      label,
                      control,
                      required = false
                  }: Props) => {
    return <>
        <label>{label}</label>
        <Controller control={control} name={propertyName} rules={{required}}
                    render={({field: {onChange, value}}) => (
                        <DatePicker value={value || defaultValue} required={required} onChange={(date) => {
                            //@ts-ignore
                            onChange(date.toDate().toISOString())
                        }}/>
                    )}
        />
    </>
}

export default DateTime