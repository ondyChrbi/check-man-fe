import {InputProps} from "./Input";
import {Control, Controller} from "react-hook-form";
import DatePicker, {DateObject} from "react-multi-date-picker";
import React from "react";
import './DateTime.css';

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
                        <DatePicker value={value || defaultValue}
                                    required={required}
                                    onChange={(date) => {
                                        if (date) {
                                            if (Array.isArray(date)) {
                                                const oneDate = date[0];
                                                return onChange(oneDate.toDate().toISOString());
                                            }

                                            const oneDate = date as DateObject;
                                            return onChange(oneDate.toDate().toISOString());
                                        }
                                    }}
                        />
                    )}
        />
    </>
}

export default DateTime