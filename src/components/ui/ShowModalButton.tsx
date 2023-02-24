import React, {useState} from "react";
import CoolModal from "./CoolModal";

interface Props {
    buttonTitle?: string
    modalTitle?: string
    icon?: JSX.Element
    children: JSX.Element
}

export const ShowModalButton = ({buttonTitle, modalTitle, icon, children}: Props) => {
    const [clicked, setClicked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const clickedHandle = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        setClicked(false);
    }

    const closeClickedHandle = () => {
        setClicked(false);
    }

    if (clicked) {
        return <CoolModal title={modalTitle} onCloseClicked={closeClickedHandle}>
            {children}
        </CoolModal>
    }

    return <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={clickedHandle}>
        <button className="rounded-full w-fit hover:bg-teal-200 text-gray-800 font-bold py-2 p-2 inline-flex items-center">
            {icon}
            {buttonTitle && isHovering && <span>{buttonTitle}</span>}
        </button>
    </div>
}

export default ShowModalButton;