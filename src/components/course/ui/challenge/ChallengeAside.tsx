import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {Challenge, ChallengeKind, ChallengesQuery, getChallengesQuery} from "../../../../lib/graphql/challengeQuery";
import {useTranslation} from "react-i18next";
import LoadingSpinner from "../../../LoadingSpinner";
import ChallengeList from "./ChallengeList";
import {useParams} from "react-router-dom";

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
    const {
        loading,
        error,
        data
    } = useQuery<ChallengesQuery>(getChallengesQuery, {variables: {"semesterId": semesterId}});
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

    return <aside className="flex flex-row justify-start items-start md:w-80 h-full fixed bg-slate-100 z-10"
                  style={{left: (isOpen) ? OPEN : HIDDEN}}>
        <menu className="w-72 h-full">
            <ChallengeList challenges={challenges} courseId={courseId} semesterId={semesterId}
                           challengeId={challengeId!}/>
        </menu>

        <CollapsibleButton onClick={collapsibleButtonClickHandler} open={isOpen}/>
    </aside>
}

interface CollapsibleButtonProps {
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    open: boolean;
}

const CollapsibleButton = ({onClick, open}: CollapsibleButtonProps) => {
    return <div className="flex flex-col flex-2 justify-center items-center align-middle min-h-full w-8 pt-5 z-20"
                onClick={onClick}>
        {open ? <svg className="h-8 w-8 text-gray-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                     stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <polyline points="11 7 6 12 11 17"/>
            <polyline points="17 7 12 12 17 17"/>
        </svg> : <svg className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13 17 18 12 13 7"/>
            <polyline points="6 17 11 12 6 7"/>
        </svg>
        }
    </div>;
}

export default ChallengeAside;