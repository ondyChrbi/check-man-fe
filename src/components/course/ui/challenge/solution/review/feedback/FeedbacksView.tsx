import {Feedback, getSolutionQuery, Review} from "../../../../../../../lib/graphql/challengeQuery";
import React from "react";
import {Feedback as SuggestedFeedback} from "../../../../../../../lib/axois";
import {useMutation} from "@apollo/client";
import {
    unlinkFeedbackMutation,
    UnlinkFeedbackMutation,
    UnlinkFeedbackMutationVariables
} from "../../../../../../../lib/graphql/feedbackQuery";
import FeedbackEditor from "./FeedbackEditor";
import FeedbackList from "./FeedbackList";

interface Props {
    review: Review,
    solutionId: number | string
}

const FeedbacksView = ({review, solutionId}: Props) => {

    const [unlink, {loading}] = useMutation<UnlinkFeedbackMutation, UnlinkFeedbackMutationVariables>(unlinkFeedbackMutation, {
        refetchQueries: [{query: getSolutionQuery, variables: {id : solutionId}}]
    });

    const chipClickHandle = async (feedback: Feedback | SuggestedFeedback, reviewId: string | number) => {
        if (loading) { return; }

        await unlink({variables: {feedbackId: feedback.id, reviewId}});
    }

    return <div className="flex flex-col">
        {review && review.feedbacks && review.feedbacks.length !== 0 &&
            <div className="flex flex-wrap justify-start items-end">
                <FeedbackList feedbacks={review.feedbacks} reviewId={review.id} onChipClick={chipClickHandle} />
            </div>
        }

        <FeedbackEditor reviewId={review.id} solutionId={solutionId} selectedFeedbacks={review.feedbacks} />
    </div>
}

export default FeedbacksView;