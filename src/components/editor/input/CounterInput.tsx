import React, {useEffect, useState} from "react";

const TYPING_DELAY = 1500;

interface Props {
    name?: any
    editable?: boolean
    color?: string
    textColor?: string
    current?: number
    onValueChange?: (name: any, value: number) => void
}

export const enum Operation {
    PLUS, MINUS, DIRECT
}

const CounterInput = ({name, editable = false, color = "border-teal-600", textColor = "text-teal-700", current = 0,
                          onValueChange}: Props) => {
    const [value, setValue] = useState(current);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (editable && onValueChange && name) {
                onValueChange(name, value)
            }
        }, TYPING_DELAY);

        return () => clearTimeout(timeOutId);
    }, [value])

    const changeValueHandle = (operation: Operation, inputValue = 1) => {
        if (editable) {
            if (operation === Operation.DIRECT && inputValue >= 0) {
                setValue(inputValue);
                return;
            }

            if ((operation == Operation.PLUS || value > 0)) {
                const newValue = value + ((operation == Operation.PLUS) ? inputValue : -inputValue);
                setValue(newValue);
            }
        }
    }

    return <div className="w-fit flex flex-col justify-center items-center align-middle mx-3">
        <div
            className={`w-24 h-24 flex flex-row justify-center items-center text-teal-600 border-8 rounded-full text-2xl ${color} ${textColor}`}>
            {editable ?
                <input className="w-10 text-center bg-transparent" value={value} min={0} onChange={(e) => changeValueHandle(Operation.DIRECT, Number(e.target.value))}/> :
                <div>{value}</div>}
        </div>
        {editable && <div className="w-full flex flex-row justify-center items-center align-middle mt-3.5">
            <button
                className="mx-1 w-9 h-9 flex flex-row rounded-full bg-gray-200 justify-center items-center align-middle cursor-pointer font-bold"
                onClick={() => changeValueHandle(Operation.PLUS)}>
                +
            </button>
            <button
                className="mx-1 w-9 h-9 flex flex-row rounded-full bg-gray-200 justify-center items-center align-middle cursor-pointer font-bold"
                onClick={() => changeValueHandle(Operation.MINUS)}>
                -
            </button>
        </div>}
    </div>
}

export default CounterInput