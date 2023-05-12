import React, {useState} from "react";
import CoolModal from "./CoolModal";

interface Props {
    buttonTitle?: string;
    modalTitle?: string;
    icon?: JSX.Element;
    css?: string;
    children?: JSX.Element;
}

export const ShowModalButton = ({
                                    buttonTitle = "",
                                    modalTitle = "",
                                    icon = <></>,
                                    css = "hover:bg-teal-200 text-gray-800",
                                    children = <></>
                                }: Props) => {
    const [clicked, setClicked] = useState(false);

    const clickedHandle = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        setClicked(true);
    }

    const closeClickedHandle = () => {
        setClicked(false);
    }

    if (clicked) {
        return <CoolModal title={modalTitle} onCloseClicked={closeClickedHandle}>
            {children}
        </CoolModal>
    }

    return <div onClick={clickedHandle}>
        <button className={`rounded-full w-fit font-bold py-2 px-2 inline-flex items-center ${css}`}>
            {icon}
            {buttonTitle && <span className="ml-2.5">{buttonTitle}</span>}
        </button>
    </div>
}

export default ShowModalButton;