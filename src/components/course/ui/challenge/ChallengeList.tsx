import {Challenge} from "../../../../lib/graphql/challengeQuery";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ChallengeMap} from "./ChallengeAside";
import ChallengeCard from "./ChallengeCard";

interface Props {
    challenges: ChallengeMap,
    challengeId: string | number | undefined;
    courseId: string | number;
    semesterId: string | number;
    showCaptions?: boolean
    onChallengePicked?: (challenge: Challenge) => void | Promise<void>
}

const ChallengeList = ({challenges, courseId, semesterId, challengeId, onChallengePicked, showCaptions = false}: Props) => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const challengeCardClickHandler = async (challenge: Challenge) => {
        if (onChallengePicked) {
            await onChallengePicked(challenge);
        }

        return navigate(`/courses/${courseId}/semester/${semesterId}/challenge/${challenge.id}`, {replace: true})
    }

    return <div className="">
        {showCaptions && challenges.optional.length !== 0 && <h1 className="text-center text-white">{t('challenge.optional')}</h1>}
        {challenges.optional.map((challenge) =>
            <ChallengeCard onClick={challengeCardClickHandler}
                           selected={challenge.id.toString() === challengeId} key={challenge.id}
                           challenge={challenge}/>
        )}
        {showCaptions && challenges.mandatory.length !== 0 && <h1 className="text-center text-white">{t('challenge.mandatory')}</h1>}
        {challenges.mandatory.map((challenge) =>
            <ChallengeCard onClick={challengeCardClickHandler}
                           selected={challenge.id.toString() === challengeId} key={challenge.id}
                           challenge={challenge}/>
        )}
        {showCaptions && challenges.credit.length !== 0 && <h1 className="text-center text-white">{t('challenge.credit')}</h1>}
        {challenges.credit.map((challenge) =>
            <ChallengeCard onClick={challengeCardClickHandler}
                           selected={challenge.id.toString() === challengeId} key={challenge.id}
                           challenge={challenge}/>
        )}
        {showCaptions && challenges.exam.length !== 0 && <h1 className="text-center text-white">{t('challenge.exam')}</h1>}
        {challenges.exam.map((challenge) =>
            <ChallengeCard onClick={challengeCardClickHandler}
                           selected={challenge.id.toString() === challengeId} key={challenge.id}
                           challenge={challenge}/>
        )}
    </div>
}

export default ChallengeList