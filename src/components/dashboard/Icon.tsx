import React, {useState} from "react";

interface Props {
    onClick?: () => void | Promise<void>
    onHoverEnter?: () => void | Promise<void>
    onHoverLeave?: () => void | Promise<void>
    title?: string
    icon?: string
    color?: string
    children?: React.ReactNode
}

const Icon = ({onClick, onHoverEnter, onHoverLeave, title, icon, color, children}: Props) => {
    const [isHovering, setIsHovering] = useState(false);

    const iconClickHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onClick) {
            await onClick();
        }
    }

    const enterHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIsHovering(true);

        if (onHoverEnter) {
            await onHoverEnter();
        }
    }

    const leaveHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIsHovering(false);

        if (onHoverLeave) {
            await onHoverLeave();
        }
    }

    return <div className="course-container flex flex-col mr-5 hover:cursor-pointer"
                onClick={iconClickHandler}
                onMouseEnter={enterHandle}
                onMouseLeave={leaveHandle}>
        <div className="flex flex-col justify-center items-center align-middle course-icon rounded-3xl w-40 h-40 shadow hover:shadow-lg"
             style={{backgroundColor: color}}>
            {icon && <img className="m-5" src={icon} alt={title}/>}
            {children}
        </div>
        <div className="h-14">
            {title && isHovering && <div className="my-4 text-center">{title}</div>}
        </div>
    </div>
}

export default Icon;