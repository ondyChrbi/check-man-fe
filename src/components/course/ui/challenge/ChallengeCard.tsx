import {Challenge} from "../../../../lib/graphql/challengeQuery";
import React, {useState} from "react";
import ChallengeChips from "./ChallengeChips";

const ICON_WIDTH = 15;
const ICON_HEIGHT = 15;
const DESCRIPTION_LENGTH = 60;

interface Props {
    challenge: Challenge
    onClick: (challenge: Challenge) => void
    selected?: boolean
    iconWidth?: number,
    iconHeight?: number,
}

const ChallengeCard = ({challenge, onClick, iconWidth = ICON_WIDTH, iconHeight = ICON_HEIGHT}: Props) => {
    const [isHovering, setIsHovering] = useState(false);

    const onChallengeClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        onClick(challenge);
    }

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return <>
        <li onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={onChallengeClickHandler}
            className="my-1 py-2.5 md:w-72 flex flex-row hover:cursor-pointer">
            <div className="m-2 w-10 h-full flex items-center justify-center">
                <object className="w-5 h-5 fill-white"
                        data={`/icons/${challenge.challengeKind.toLowerCase()}-course.svg`} type="image/svg+xml"/>
            </div>
            <div className="flex flex-col w-full text-white">
                <h2 className={`text-md ${isHovering && 'font-bold'}`}>{challenge.name}</h2>
                {isHovering && <div className="flex flex-col mt-2">
                    <p className="text-sm">{challenge.description.slice(0, DESCRIPTION_LENGTH)}...</p>
                    <div className="flex flex-wrap justify-start items-end mt-1">
                        <ChallengeChips challenge={challenge} iconWidth={iconWidth} iconHeight={iconHeight} />
                    </div>
                </div>}
            </div>
        </li>
    </>
}



export default ChallengeCard