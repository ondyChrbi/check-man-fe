import {useQuery} from "@apollo/client";
import {ChallengesQuery, getChallengeQuery} from "../../lib/graphql/challengeQuery";
import {useTranslation} from "react-i18next";
import LoadingSpinner from "../LoadingSpinner";
import React from "react";
import ChallengeCard from "./ui/ChallengeCard";



interface Props {
    semesterId: number | string
}

const ChallengeAside = ({semesterId}: Props) => {
    const {loading, error, data} = useQuery<ChallengesQuery>(getChallengeQuery,
        {variables: {"semesterId": semesterId}}
    );
    const {t} = useTranslation();

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

    return <>
        <menu className="w-full">
            {data.challenges.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}
        </menu>
    </>
}

export default ChallengeAside;