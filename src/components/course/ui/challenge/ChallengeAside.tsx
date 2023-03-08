import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {Challenge, ChallengeKind, ChallengesQuery, getChallengesQuery} from "../../../../lib/graphql/challengeQuery";
import {useTranslation} from "react-i18next";
import LoadingSpinner from "../../../LoadingSpinner";
import ChallengeList from "./ChallengeList";
import {useParams} from "react-router-dom";
import ChallengeAsideActionsMenu from "./ChallengeAsideActionsMenu";
import CollapsibleButton from "../../../CollapsibleButton";

import './ChallengeAside.css';

interface Props {
    courseId: number | string
    semesterId: number | string
}

export interface ChallengeMap {
    optional: Array<Challenge>,
    mandatory: Array<Challenge>,
    credit: Array<Challenge>,
    exam: Array<Challenge>
}

const groupChallenges = (challenges: Array<Challenge>) => {
    const grouped: ChallengeMap = {
        optional: [],
        mandatory: [],
        credit: [],
        exam: []
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

const HIDDEN = '-18rem';
const OPEN = '0rem'

const ChallengeAside = ({courseId, semesterId}: Props) => {
    const {challengeId} = useParams<'challengeId'>();
    const {loading, error, data} = useQuery<ChallengesQuery>(getChallengesQuery, {variables: {"semesterId": semesterId}});
    const {t} = useTranslation();

    const [isOpen, setIsOpen] = useState(true);

    const collapsibleButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    if (loading) {
        return <div className="md:w-80 h-full flex flex-row items-center justify-center">
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

    return <aside className="flex flex-row justify-start items-start md:w-80 h-full fixed background z-10" style={{left: (isOpen) ? OPEN : HIDDEN}}>
        <menu className="w-72 h-full">
            <div className="w-72 absolute top-0 left-0 overflow-y-auto z-0 h-full">
                <ChallengeList challenges={challenges} courseId={courseId} semesterId={semesterId}
                               challengeId={challengeId!}/>
                <ChallengeAsideActionsMenu courseId={courseId} semesterId={semesterId} />
            </div>
        </menu>

        <CollapsibleButton onClick={collapsibleButtonClickHandler} open={isOpen}/>
    </aside>
}

export default ChallengeAside;