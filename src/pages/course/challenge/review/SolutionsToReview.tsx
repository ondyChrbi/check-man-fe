import {Outlet, useParams} from "react-router-dom";
import React from "react";
import ReviewTable from "../../../../components/course/ui/challenge/solution/review/ReviewTable";
import {useTranslation} from "react-i18next";
import {useQuery} from "@apollo/client";
import {ChallengeQuery, getChallengeQuery} from "../../../../lib/graphql/challengeQuery";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const SolutionsToReview = () => {
    const {t} = useTranslation();
    const {challengeId, solutionId} = useParams<'courseId' | 'semesterId' | 'challengeId' | 'solutionId'>();

    const {loading, error, data} = useQuery<ChallengeQuery>(getChallengeQuery, {
        variables: {id: challengeId}
    });

    if (loading) {
        return <div className="w-full h-fit flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (!challengeId || error || !data) {
        return <p>Error</p>
    }

    return <div className="flex flex-col items-start justify-start">
        <h1 className="my-7 text-gray-600 font-light text-4xl">{t('challenge.review.editor.title', {name: data.challenge.name})}</h1>
        <ReviewTable challengeId={challengeId} />
        {solutionId && <div className="flex w-full">
            <Outlet />
        </div>}
    </div>
}

export default SolutionsToReview;