import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {PlusIcon} from "@heroicons/react/24/solid";

const ICON_WIDTH = 30;
const ICON_HEIGHT = 30;

interface Props {
    onClick?: () => Promise<void> | void
    hoveringTitle?: boolean | null | undefined
}

const AddRequirementButton = ({onClick, hoveringTitle = true} : Props) => {
    const {t} = useTranslation();
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const clickedHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onClick) {
            await onClick();
        }
    }

    return <button onClick={clickedHandle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
                   className={`flex justify-center items-center h-fit hover:bg-gray-100 rounded-full p-8 ${hoveringTitle ? 'flex-row' : 'flex-col'}`}>
        <PlusIcon color="#4b5563" width={ICON_WIDTH} height={ICON_HEIGHT} />
        {(isHovering || !hoveringTitle) && t('challenge.requirement.new.title')}
    </button>
}

export default AddRequirementButton;