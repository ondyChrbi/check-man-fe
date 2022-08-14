import {Challenge} from "../../../lib/graphql/challengeQuery";
import React from "react";

const MAX_DESCRIPTION_LENGTH = 20;

interface Props {
    challenge: Challenge
    onClick: (challenge:Challenge) => void
    selected?: boolean
}

const ChallengeCard = ({challenge, onClick, selected = false} : Props) => {
    const borderWidth = (selected) ? 8 : 4

    const onChallengeClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        onClick(challenge);
    }

    return <>
        <li onClick={onChallengeClickHandler} className={`my-1 py-2.5 md:w-80 flex flex-row bg-white shadow hover:shadow-lg hover:cursor-pointer border-r-${borderWidth} border-r-teal-400`}>
            <div className="mx-2 w-10 h-full flex items-center justify-center">
                <object className="w-8 h-8 fill-teal-400" data={`/icons/${challenge.challengeKind.toLowerCase()}-course.svg`} type="image/svg+xml" />
            </div>
            <div className="w-full">
                <h2 className="text-teal-600">{challenge.name}</h2>
                <p>{challenge.description.substring(0, MAX_DESCRIPTION_LENGTH)}...</p>
            </div>
        </li>
    </>
}

export default ChallengeCard;