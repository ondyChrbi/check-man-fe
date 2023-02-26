import {Challenge, ChallengeKind} from "../../../../lib/graphql/challengeQuery";
import React, {useState} from "react";
import {ClockIcon} from "@heroicons/react/24/outline";
import {toFormattedDate} from "../../../../features/helper";
import {useTranslation} from "react-i18next";
import {PencilIcon} from "@heroicons/react/24/solid";

const CHIP_WIDTH = 15;
const CHIP_HEIGHT = 15;

const DESCRIPTION_LENGTH = 60;

interface Props {
    challenge: Challenge
    onClick: (challenge: Challenge) => void
    selected?: boolean
}

const challengeKindSelectValue = new Map();
challengeKindSelectValue.set(ChallengeKind.OPTIONAL, 'challenge.action.challenge-kind.option.optional');
challengeKindSelectValue.set(ChallengeKind.MANDATORY, 'challenge.action.challenge-kind.option.mandatory');
challengeKindSelectValue.set(ChallengeKind.CREDIT, 'challenge.action.challenge-kind.option.credit');
challengeKindSelectValue.set(ChallengeKind.EXAM, 'challenge.action.challenge-kind.option.exam');

const challengeKindColors = new Map();
challengeKindColors.set(ChallengeKind.OPTIONAL, 'bg-blue-300');
challengeKindColors.set(ChallengeKind.MANDATORY, 'bg-blue-600');
challengeKindColors.set(ChallengeKind.CREDIT, 'bg-purple-600');
challengeKindColors.set(ChallengeKind.EXAM, 'bg-gray-800');

const ChallengeCard = ({challenge, onClick}: Props) => {
    const {t} = useTranslation();
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
                        {challenge.deadlineDate && <ChallengeChip bgColor={'bg-red-600'} textColor={'text-white'}>
                            <ClockIcon className="mr-1" width={CHIP_WIDTH} height={CHIP_HEIGHT}/>
                            {toFormattedDate(challenge.deadlineDate)}
                        </ChallengeChip>
                        }
                        <ChallengeChip bgColor={challengeKindColors.get(challenge.challengeKind)}
                                       textColor={'text-white'}>
                            {t(challengeKindSelectValue.get(challenge.challengeKind))}
                        </ChallengeChip>
                        {!challenge.published &&
                            <ChallengeChip bgColor={'bg-yellow-500'} textColor={'text-white'}>
                                <PencilIcon className="mr-1" width={CHIP_WIDTH} height={CHIP_HEIGHT}/>
                                {t('challenge.not-published')}
                            </ChallengeChip>
                        }
                    </div>
                </div>}
            </div>
        </li>
    </>
}

interface ChallengeChipProps {
    bgColor: string,
    textColor: string,
    children: React.ReactNode
}

const ChallengeChip = ({bgColor, textColor, children}: ChallengeChipProps) => {
    return <div
        className={`flex flex-row text-xs font-bold ${bgColor} ${textColor} w-fit px-1.5 py-1 rounded-full ml-0 mr-1 mt-1`}>
        {children}
    </div>
}

export default ChallengeCard