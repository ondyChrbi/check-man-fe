import {Feedback, getSolutionQuery, Review} from "../../../../../../../lib/graphql/challengeQuery";
import {useTranslation} from "react-i18next";
import FeedbackChip from "./FeedbackChip";
import React from "react";
import {Feedback as SuggestedFeedback} from "../../../../../../../lib/axois";
import {useMutation} from "@apollo/client";
import {
    unlinkFeedbackMutation,
    UnlinkFeedbackMutation,
    UnlinkFeedbackMutationVariables
} from "../../../../../../../lib/graphql/feedbackQuery";
import FeedbackEditor from "./FeedbackEditor";

interface Props {
    review: Review,
    solutionId: number | string
}

const FeedbacksView = ({review, solutionId}: Props) => {
    const {t} = useTranslation();

    const [unlink, {loading}] = useMutation<UnlinkFeedbackMutation, UnlinkFeedbackMutationVariables>(unlinkFeedbackMutation, {
        refetchQueries: [{query: getSolutionQuery, variables: {id : solutionId}}]
    });

    const chipClickHandle = async (feedback: Feedback | SuggestedFeedback, reviewId: string | number) => {
        if (loading) { return; }

        await unlink({variables: {feedbackId: feedback.id, reviewId}});
    }

    return <div className="flex flex-col">
        <h2 className="my-3 text-gray-600 font-light text-2xl">{t('challenge.review.editor.feedback.title')}</h2>

        {review && review.feedbacks && review.feedbacks.length !== 0 &&
            <div className="flex flex-wrap justify-start space-x-2 items-end">
                {review.feedbacks.map((feedback) =>
                    <FeedbackChip key={feedback.id} feedback={feedback} reviewId={review.id} onClicked={chipClickHandle} />
                )}
            </div>
        }

        <FeedbackEditor reviewId={review.id} solutionId={solutionId} selectedFeedbacks={review.feedbacks} />
    </div>
}

export default FeedbacksView;