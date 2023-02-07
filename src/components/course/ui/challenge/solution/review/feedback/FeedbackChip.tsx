import {Feedback} from "../../../../../../../lib/graphql/challengeQuery";
import {HandThumbDownIcon, HandThumbUpIcon, MinusIcon, StarIcon, XMarkIcon} from "@heroicons/react/24/solid";
import React from "react";
import {Feedback as SuggestedFeedback} from "../../../../../../../lib/axois";

const WIDTH = 15;
const HEIGHT = 15;

const NEUTRAL_COLOR = '#000000';
const NEUTRAL_TEXT_COLOR = 'text-gray-500';
const NEUTRAL_BORDER_COLOR = 'border-gray-500';

const typeIconsColorsMap = new Map([
    ['EXTREMELY_POSITIVE', "#fcd34d"],
    ['POSITIVE', "#16a34a"],
    ['NEUTRAL', "#60a5fa"],
    ['NEGATIVE', "#991c1c"],
])

const typeBorderColorsMap = new Map([
    ['EXTREMELY_POSITIVE', 'border-amber-300'],
    ['POSITIVE', 'border-green-600'],
    ['NEUTRAL', 'border-blue-400'],
    ['NEGATIVE', 'border-red-800'],
]);

const typeTextColorsMap = new Map([
    ['EXTREMELY_POSITIVE', 'text-amber-300'],
    ['POSITIVE', 'text-green-600'],
    ['NEUTRAL', 'text-blue-400'],
    ['NEGATIVE', 'text-red-800'],
]);

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

const getBorderColor = (type: string, active: boolean) => {
    return (active) ? typeBorderColorsMap.get(type) : NEUTRAL_BORDER_COLOR;
}

const getTextColor = (type: string, active: boolean) => {
    return (active) ? typeTextColorsMap.get(type) : NEUTRAL_TEXT_COLOR;
}

interface Props {
    feedback: Feedback | SuggestedFeedback,
    reviewId: number | string,
    onClicked?: (feedback: Feedback | SuggestedFeedback, reviewId: string | number) => void | Promise<void>
    active?: boolean
}

const FeedbackChip = ({feedback, reviewId, onClicked, active = true}: Props) => {
    const chipClickedHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onClicked) {
            await onClicked(feedback, reviewId);
        }
    }

    return <div onClick={chipClickedHandle}
        className={`${getBorderColor(feedback.type, active)} rounded-full border-2 text-gray-500 bg-white font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max my-1`}>
        <div className="p-2">
            {getIcon(feedback.type, active)}
        </div>
        <span className={`${getTextColor(feedback.type, active)} flex items-center px-3 pr-2 pl-0`}>
            {feedback.description}
        </span>
        <button className="bg-transparent hover focus:outline-none">
            <XMarkIcon/>
        </button>
    </div>
}

export default FeedbackChip;