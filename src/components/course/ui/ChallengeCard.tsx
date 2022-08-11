import {InformationCircleIcon} from "@heroicons/react/solid";
import {Challenge} from "../../../lib/graphql/challengeQuery";

const MAX_DESCRIPTION_LENGTH = 25;

interface Props {
    challenge: Challenge
}

const ChallengeCard = ({challenge} : Props) => {
    return <>
        <li className="my-1 py-2.5 flex flex-row bg-white border-r-4 border-r-teal-400 shadow hover:shadow-lg hover:cursor-pointer">
            <div className="mx-2 w-10 h-full flex items-center justify-center">
                <InformationCircleIcon className="h-7 w-7" />
            </div>
            <div className="w-full">
                <h1 className="text-teal-600">{challenge.name}</h1>
                <p>{challenge.description.substring(0, MAX_DESCRIPTION_LENGTH)}</p>
            </div>
        </li>
    </>
}

export default ChallengeCard;