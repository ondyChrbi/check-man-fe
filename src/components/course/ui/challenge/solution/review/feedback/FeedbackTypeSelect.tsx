import {FeedbackType} from "../../../../../../../lib/graphql/challengeQuery";
import {HandThumbDownIcon, HandThumbUpIcon, MinusIcon, StarIcon} from "@heroicons/react/24/solid";
import React, {useState} from "react";

const WIDTH = 25;
const HEIGHT = 25;

const typeIconsMap = new Map([
    [FeedbackType.EXTREMELY_POSITIVE, <StarIcon width={WIDTH} height={HEIGHT}/>],
    [FeedbackType.POSITIVE, <HandThumbUpIcon width={WIDTH} height={HEIGHT}/>],
    [FeedbackType.NEUTRAL, <MinusIcon width={WIDTH} height={HEIGHT}/>],
    [FeedbackType.NEGATIVE, <HandThumbDownIcon width={WIDTH} height={HEIGHT}/>],
]);

interface FeedbackTypeSelectProps {
    onTypeSelected?: (type: FeedbackType) => void
}

const FeedbackTypeSelect = ({ onTypeSelected } : FeedbackTypeSelectProps) => {
    const [type, setType] = useState<FeedbackType | null>(null);

    const clickHandle = async (e: React.MouseEvent<HTMLElement>, type: FeedbackType) => {
        e.preventDefault();

        if (onTypeSelected) {
            setType(type);
            await onTypeSelected(type);
        }
    };

    return <>
        {Array.from(typeIconsMap.keys()).map((type) =>
            <div className="p-2 pl-0 hover:cursor-pointer" onClick={(e) => clickHandle(e, type)}>{typeIconsMap.get(type)}</div>
        )}
    </>
}

export default FeedbackTypeSelect