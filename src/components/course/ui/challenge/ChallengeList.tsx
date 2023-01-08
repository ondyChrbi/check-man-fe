import {Challenge} from "../../../../lib/graphql/challengeQuery";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ChallengeMap} from "./ChallengeAside";

interface Props {
    challenges: ChallengeMap,
    challengeId: string | number | undefined;
    courseId: string | number;
    semesterId: string | number;
}

const ChallengeList = ({challenges, courseId, semesterId, challengeId}: Props) => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const challengeCardClickHandler = (challenge: Challenge) => {
        return navigate(`/courses/${courseId}/semester/${semesterId}/challenge/${challenge.id}`, {replace: true})
    }

    return <div className="w-72 absolute top-0 left-0 overflow-y-auto z-0 h-full">
        {challenges.optional.length !== 0 && <h1 className="text-center">{t('challenge.optional')}</h1>}
        {challenges.optional.map((challenge) =>
            <ChallengeCard onClick={challengeCardClickHandler}
                           selected={challenge.id.toString() === challengeId} key={challenge.id}
                           challenge={challenge}/>
        )}
        {challenges.mandatory.length !== 0 && <h1 className="text-center">{t('challenge.mandatory')}</h1>}
        {challenges.mandatory.map((challenge) =>
            <ChallengeCard onClick={challengeCardClickHandler}
                           selected={challenge.id.toString() === challengeId} key={challenge.id}
                           challenge={challenge}/>
        )}
        {challenges.credit.length !== 0 && <h1 className="text-center">{t('challenge.credit')}</h1>}
        {challenges.credit.map((challenge) =>
            <ChallengeCard onClick={challengeCardClickHandler}
                           selected={challenge.id.toString() === challengeId} key={challenge.id}
                           challenge={challenge}/>
        )}
        {challenges.exam.length !== 0 && <h1 className="text-center">{t('challenge.exam')}</h1>}
        {challenges.exam.map((challenge) =>
            <ChallengeCard onClick={challengeCardClickHandler}
                           selected={challenge.id.toString() === challengeId} key={challenge.id}
                           challenge={challenge}/>
        )}
    </div>
}

interface ChallengeCardProps {
    challenge: Challenge
    onClick: (challenge:Challenge) => void
    selected?: boolean
}

const ChallengeCard = ({challenge, onClick, selected = false} : ChallengeCardProps) => {
    const borderWidth = (selected) ? 8 : 4

    const onChallengeClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        onClick(challenge);
    }

    return <>
        <li onClick={onChallengeClickHandler} className={`rounded-md my-1 py-2.5 md:w-72 flex flex-row bg-white shadow hover:shadow-lg hover:cursor-pointer border-r-${borderWidth} border-r-teal-400`}>
            <div className="m-2 w-10 h-full flex items-center justify-center">
                <object className="w-8 h-8 fill-teal-400" data={`/icons/${challenge.challengeKind.toLowerCase()}-course.svg`} type="image/svg+xml" />
            </div>
            <div className="flex flex-col w-full">
                <h2 className="text-teal-600">{challenge.name}</h2>
                <div className="flex flex-row justify-between">
                    <div>{challenge.startDate}</div>
                    <div>{challenge.deadlineDate}</div>
                </div>
            </div>
        </li>
    </>
}

export default ChallengeList