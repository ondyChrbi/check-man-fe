import {Feedback, FeedbackType} from "../../../../../../../lib/graphql/challengeQuery";
import {
    HandThumbDownIcon,
    HandThumbUpIcon,
    MinusIcon,
    StarIcon,
    XMarkIcon
} from "@heroicons/react/24/solid";

const WIDTH = 25;
const HEIGHT = 25;

const typeIconsMap = new Map([
    [FeedbackType.EXTREMELY_POSITIVE, <StarIcon color="#fcd34d" width={WIDTH} height={HEIGHT}/>],
    [FeedbackType.POSITIVE, <HandThumbUpIcon color="#16a34a" width={WIDTH} height={HEIGHT}/>],
    [FeedbackType.NEUTRAL, <MinusIcon color="#60a5fa" width={WIDTH} height={HEIGHT}/>],
    [FeedbackType.NEGATIVE, <HandThumbDownIcon color="#991c1c" width={WIDTH} height={HEIGHT}/>],
]);

const typeBorderColorsMap = new Map([
    [FeedbackType.EXTREMELY_POSITIVE, 'border-amber-300'],
    [FeedbackType.POSITIVE, 'border-green-600'],
    [FeedbackType.NEUTRAL, 'border-blue-400'],
    [FeedbackType.NEGATIVE, 'border-red-800'],
]);

const typeTextColorsMap = new Map([
    [FeedbackType.EXTREMELY_POSITIVE, 'text-amber-300'],
    [FeedbackType.POSITIVE, 'text-green-600'],
    [FeedbackType.NEUTRAL, 'text-blue-400'],
    [FeedbackType.NEGATIVE, 'text-red-800'],
]);

interface Props {
    feedback: Feedback
}

const FeedbackChip = ({feedback}: Props) => {
    return <div
        className={`${typeBorderColorsMap.get(feedback.type)} rounded-full border-2 text-gray-500 bg-white font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max my-1`}>
        <div className="p-2">
            {typeIconsMap.get(feedback.type)}
        </div>
        <span className={`${typeTextColorsMap.get(feedback.type)} flex items-center px-3 pr-2 pl-0`}>
            {feedback.description}
        </span>
        <button className="bg-transparent hover focus:outline-none">
            <XMarkIcon/>
        </button>
    </div>
}

export default FeedbackChip;