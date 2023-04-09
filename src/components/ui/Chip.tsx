import React from "react";

interface Chip {
    bgColor: string,
    textColor: string,
    children: React.ReactNode,
}

const Chip = ({bgColor, textColor, children}: Chip) => {
    return <div
        className={`flex flex-row text-xs font-bold ${bgColor} ${textColor} w-fit px-1.5 py-1 rounded-full ml-0 mr-1 mt-1`}>
        {children}
    </div>
}

export default Chip;