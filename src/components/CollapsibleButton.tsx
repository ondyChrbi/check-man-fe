import React from "react";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from "@heroicons/react/24/solid";

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;
const ICON_COLOR = "#ffffff"

interface Props {
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    open: boolean;
}

const CollapsibleButton = ({onClick, open}: Props) => {
    return <div className="flex flex-col flex-2 justify-center items-center align-middle min-h-full w-8 pt-5 z-20 fill-white cursor-pointer"
                onClick={onClick}>
        {(open) ?
            <ChevronDoubleRightIcon color={ICON_COLOR} width={ICON_WIDTH} height={ICON_HEIGHT} /> :
            <ChevronDoubleLeftIcon color={ICON_COLOR} width={ICON_WIDTH} height={ICON_HEIGHT} />
        }
    </div>;
}

export default CollapsibleButton