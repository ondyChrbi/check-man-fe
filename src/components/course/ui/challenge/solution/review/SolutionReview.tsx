import {useQuery} from "@apollo/client";
import {
    ChallengeQuery, getChallengeQuery,
    getSolutionQuery,
    GetSolutionQuery,
    GetSolutionVariables
} from "../../../../../../lib/graphql/challengeQuery";
import Loader from "../../../Loader";
import React from "react";
import FeedbacksView from "./feedback/FeedbacksView";
import {useParams} from "react-router-dom";

export interface Props {
}

const SolutionReview = () => {
    const {challengeId, solutionId} = useParams<'courseId' | 'semesterId' | 'challengeId' | 'solutionId'>();

    const {data : solutionData, loading : solutionLoading, error : solutionError} = useQuery<GetSolutionQuery, GetSolutionVariables>(getSolutionQuery, {
        variables: {id: solutionId!}
    });
    const {data: challengeData} = useQuery<ChallengeQuery>(getChallengeQuery, {variables: {id: challengeId}});

    if (solutionLoading) {
        return <Loader/>
    }

    if (solutionError || !solutionData) {
        return <p>Error</p>
    }

    return <div className="flex flex-col w-full h-full">
        <h1 className="my-7 text-gray-600 font-light text-4xl">{challengeData?.challenge.name}</h1>
        <FeedbacksView review={solutionData.solution.review} solutionId={solutionId!} />
    </div>
}

export default SolutionReview;