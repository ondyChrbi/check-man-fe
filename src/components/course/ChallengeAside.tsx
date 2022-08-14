import React from "react";
import {useQuery} from "@apollo/client";
import {Challenge, ChallengeKind, ChallengesQuery, getChallengesQuery} from "../../lib/graphql/challengeQuery";
import {useTranslation} from "react-i18next";
import LoadingSpinner from "../LoadingSpinner";
import ChallengeCard from "./ui/ChallengeCard";
import {useNavigate, useParams} from "react-router-dom";

interface Props {
    courseId: number | string
    semesterId: number | string
}

interface ChallengeMap {
    optional: Array<Challenge>,
    mandatory: Array<Challenge>,
    credit: Array<Challenge>,
    exam: Array<Challenge>
}

const groupChallenges = (challenges: Array<Challenge>) => {
    const grouped : ChallengeMap = {
        optional : [],
        mandatory : [],
        credit : [],
        exam : []
    };

    challenges.forEach((challenge) => {
        switch (challenge.challengeKind) {
            case ChallengeKind.OPTIONAL:
                grouped.optional.push(challenge)
                break;
            case ChallengeKind.MANDATORY:
                grouped.mandatory.push(challenge)
                break;
            case ChallengeKind.CREDIT:
                grouped.credit.push(challenge)
                break;
            case ChallengeKind.EXAM:
                grouped.exam.push(challenge)
                break;
        }
    });

    return grouped;
}

const ChallengeAside = ({courseId, semesterId}: Props) => {
    const {challengeId} = useParams<'challengeId'>();
    const navigate = useNavigate();
    const {loading, error, data} = useQuery<ChallengesQuery>(getChallengesQuery,
        {variables: {"semesterId": semesterId}}
    );
    const {t} = useTranslation();
    
    const onChallengeCardClickHandler = (challenge: Challenge) => {
        return navigate(`/courses/${courseId}/semester/${semesterId}/challenge/${challenge.id}`, {replace: true})
    }

    if (loading) {
        return <div className="w-screen h-screen flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error) {
        return <p>Error</p>
    }

    if (!data?.challenges || data.challenges.length === 0) {
        return <div className="w-full h-full flex items-center justify-center">
            {t('challenge.not-available')}
        </div>
    }

    const challenges = groupChallenges(data.challenges);

    return <>
        <menu className="w-full">
            {challenges.optional.length !== 0 && <h1 className="text-center">{t('challenge.optional')}</h1>}
            {challenges.optional.map((challenge) =>
                <ChallengeCard onClick={onChallengeCardClickHandler} selected={ challenge.id.toString() === challengeId } key={challenge.id} challenge={challenge} />
            )}
            {challenges.mandatory.length !== 0 && <h1 className="text-center">{t('challenge.mandatory')}</h1>}
            {challenges.mandatory.map((challenge) =>
                <ChallengeCard onClick={onChallengeCardClickHandler} selected={ challenge.id.toString() === challengeId} key={challenge.id} challenge={challenge} />
            )}
            {challenges.credit.length !== 0 && <h1 className="text-center">{t('challenge.credit')}</h1>}
            {challenges.credit.map((challenge) =>
                <ChallengeCard onClick={onChallengeCardClickHandler} selected={ challenge.id.toString() === challengeId } key={challenge.id} challenge={challenge} />
            )}
            {challenges.exam.length !== 0 && <h1 className="text-center">{t('challenge.exam')}</h1>}
            {challenges.exam.map((challenge) =>
                <ChallengeCard onClick={onChallengeCardClickHandler} selected={ challenge.id.toString() === challengeId } key={challenge.id} challenge={challenge} />
            )}
        </menu>
    </>
}

export default ChallengeAside;