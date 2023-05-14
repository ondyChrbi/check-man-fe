import React from "react";

interface Props {
    color?: string
    fontColor?: string
    title?: string
    onClick?: () => void | Promise<void>
}

const CourseIconChip = ({ color = "bg-white", fontColor = "text-black", title = "", onClick = () => {}}: Props) => {
    const clickHandle = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        await onClick();
    }

    return <div onClick={clickHandle} className={`flex flex-col rounded-full font-bold absolute right-0 p-1.5 ${color} ${fontColor}`}>
        {title}
    </div>
}

export default CourseIconChip