import {FeedbackType} from "../../../../../../../lib/graphql/challengeQuery";
import {HandThumbDownIcon, HandThumbUpIcon, MinusIcon, StarIcon} from "@heroicons/react/24/solid";
import React, {useState} from "react";

const WIDTH = 25;
const HEIGHT = 25;

const NEUTRAL_COLOR = '#000000';

const typeIconsMap = new Map([
    [FeedbackType.EXTREMELY_POSITIVE, <StarIcon width={WIDTH} height={HEIGHT}/>],
    [FeedbackType.POSITIVE, <HandThumbUpIcon width={WIDTH} height={HEIGHT}/>],
    [FeedbackType.NEUTRAL, <MinusIcon width={WIDTH} height={HEIGHT}/>],
    [FeedbackType.NEGATIVE, <HandThumbDownIcon width={WIDTH} height={HEIGHT}/>],
]);

const typeIconsColorsMap = new Map([
    ['EXTREMELY_POSITIVE', "#fcd34d"],
    ['POSITIVE', "#16a34a"],
    ['NEUTRAL', "#60a5fa"],
    ['NEGATIVE', "#991c1c"],
])

const getIcon = (type: string, active: boolean) => {
    const color = (active) ? typeIconsColorsMap.get(type) : NEUTRAL_COLOR;

    switch (type) {
        case 'EXTREMELY_POSITIVE':
            return <StarIcon color={color} width={WIDTH} height={HEIGHT}/>
        case 'POSITIVE':
            return <HandThumbUpIcon color={color} width={WIDTH} height={HEIGHT}/>
        case 'NEGATIVE':
            return <HandThumbDownIcon color={color} width={WIDTH} height={HEIGHT}/>
        default:
            return <MinusIcon color={color} width={WIDTH} height={HEIGHT}/>
    }
};

interface FeedbackTypeSelectProps {
    onTypeSelected?: (type: FeedbackType) => void
}

const FeedbackTypeSelect = ({ onTypeSelected } : FeedbackTypeSelectProps) => {
    const [selectedType, setSelectedType] = useState<FeedbackType | null>(null);

    const clickHandle = async (e: React.MouseEvent<HTMLElement>, type: FeedbackType) => {
        e.preventDefault();

        if (onTypeSelected) {
            setSelectedType(type);
            await onTypeSelected(type);
        }
    };

    return <>
        {Array.from(typeIconsMap.keys()).map((type) =>
            <div key={type} className="p-2 pl-0 hover:cursor-pointer"
                 onClick={(e) => clickHandle(e, type)}>{getIcon(type, type === selectedType)}
            </div>
        )}
    </>
}

export default FeedbackTypeSelect