import {Feedback} from "../../../../../../../lib/graphql/challengeQuery";
import {HandThumbDownIcon, HandThumbUpIcon, MinusIcon, StarIcon} from "@heroicons/react/24/solid";
import React from "react";
import {Feedback as SuggestedFeedback} from "../../../../../../../lib/axois";
import {animated} from "@react-spring/web";
import {useAnimations} from "../../../../../../../features/animation";

interface Props {
    feedback: Feedback | SuggestedFeedback,
    reviewId?: number | string | undefined | null,
    onClicked?: (feedback: Feedback | SuggestedFeedback, reviewId: string | number) => void | Promise<void>
    active?: boolean
}

const FeedbackChip = ({feedback, reviewId, onClicked, active = true}: Props) => {
    const {growUp : props} = useAnimations();

    const chipClickedHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onClicked && reviewId) {
            await onClicked(feedback, reviewId);
        }
    }

    return <animated.div style={props} onClick={chipClickedHandle}
        className={`${getBackgroundColor(feedback.type, active)} rounded-lg text-gray-500 font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max mx-0.5 my-1`}>
        <div className="p-2">
            {getIcon(feedback.type, active)}
        </div>
        <span className={`${getTextColor(feedback.type, active)} flex items-center px-3 pr-2 pl-0`}>
            {feedback.description}
        </span>
    </animated.div>
}


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

const getBackgroundColor = (type: string, active: boolean) => {
    return (active) ? typeBackgroundColorsMap.get(type) : NEUTRAL_BACKGROUND_COLOR;
}

const getTextColor = (type: string, active: boolean) => {
    return (active) ? typeTextColorsMap.get(type) : NEUTRAL_TEXT_COLOR;
}

const WIDTH = 15;
const HEIGHT = 15;

const NEUTRAL_COLOR = '#6a7280';
const NEUTRAL_TEXT_COLOR = 'text-gray-500';
const NEUTRAL_BACKGROUND_COLOR = 'bg-gray-100';

const typeIconsColorsMap = new Map([
    ['EXTREMELY_POSITIVE', "#fcd34d"],
    ['POSITIVE', "#16a34a"],
    ['NEUTRAL', "#60a5fa"],
    ['NEGATIVE', "#f97d7c"],
])

const typeBackgroundColorsMap = new Map([
    ['EXTREMELY_POSITIVE', 'bg-amber-200'],
    ['POSITIVE', 'bg-green-200'],
    ['NEUTRAL', 'bg-blue-200'],
    ['NEGATIVE', 'bg-red-200'],
]);

const typeTextColorsMap = new Map([
    ['EXTREMELY_POSITIVE', 'text-amber-600'],
    ['POSITIVE', 'text-green-600'],
    ['NEUTRAL', 'text-blue-400'],
    ['NEGATIVE', 'text-red-400'],
]);

export default FeedbackChip;