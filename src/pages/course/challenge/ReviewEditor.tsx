import {useQuery} from "@apollo/client";
import {
    ChallengeQuery, getChallengeQuery,
    getSolutionQuery,
    GetSolutionQuery,
    GetSolutionVariables, Solution
} from "../../../lib/graphql/challengeQuery";
import Loader from "../../../components/course/ui/Loader";
import React from "react";
import FeedbacksView from "../../../components/course/ui/challenge/solution/review/feedback/FeedbacksView";
import {useParams} from "react-router-dom";
import ReviewPublishButton from "../../../components/course/ui/challenge/solution/review/ReviewPublishButton";
import ReviewDescriptionEditor from "../../../components/course/ui/challenge/solution/review/ReviewDescriptionEditor";

const ReviewEditor = () => {
    const {challengeId, solutionId} = useParams<'courseId' | 'semesterId' | 'challengeId' | 'solutionId'>();

    const {
        data: solutionData,
        loading: solutionLoading,
        error: solutionError
    } = useQuery<GetSolutionQuery, GetSolutionVariables>(getSolutionQuery, {
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
        <div className="my-2">
            <FeedbacksView review={solutionData.solution.review} solutionId={solutionId!}/>
        </div>
        <div className="my-2 w-full">
            <ReviewDescriptionEditor review={solutionData.solution.review}>
                <SolutionEditorActions solution={solutionData.solution}/>
            </ReviewDescriptionEditor>
        </div>
    </div>
}

export interface SolutionEditorActionsProps {
    solution: Solution
}

const SolutionEditorActions = ({solution}: SolutionEditorActionsProps) => {
    return <div className="flex flex-row justify-start items-center align-middle">
        <ReviewPublishButton reviewId={solution.review.id}/>
    </div>
}

export default ReviewEditor;