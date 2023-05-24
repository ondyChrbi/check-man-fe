import FeedbackChip from "./FeedbackChip";
import React from "react";
import {Feedback, FeedbackType} from "../../../../../../../lib/graphql/challengeQuery";
import {Feedback as SuggestedFeedback} from "../../../../../../../lib/axois";

interface Props {
    feedbacks: Array<Feedback>,
    reviewId?: string | number,
    onChipClick?: (feedback: Feedback | SuggestedFeedback, reviewId: string | number) => void
}

const FeedbackList = ({feedbacks, reviewId, onChipClick} : Props) => {
    const extremelyPositive = feedbacks.filter((f) => f.type === FeedbackType.EXTREMELY_POSITIVE);
    const positive= feedbacks.filter((f) => f.type === FeedbackType.POSITIVE);
    const neutral = feedbacks.filter((f) => f.type === FeedbackType.NEUTRAL);
    const negative = feedbacks.filter((f) => f.type === FeedbackType.NEGATIVE);

    return <div className="flex flex-col w-full">
            <div className="flex flex-wrap justify-start items-end my-0.5">
                {extremelyPositive.map((feedback) =>
                    <FeedbackChip key={feedback.id} feedback={feedback} reviewId={reviewId} onClicked={onChipClick} />
                )}
            </div>
            <div className="flex flex-wrap justify-start items-end my-0.5">
                {positive.map((feedback) =>
                    <FeedbackChip key={feedback.id} feedback={feedback} reviewId={reviewId} onClicked={onChipClick} />
                )}
            </div>
            <div className="flex flex-wrap justify-start items-end my-0.5">
                {neutral.map((feedback) =>
                    <FeedbackChip key={feedback.id} feedback={feedback} reviewId={reviewId} onClicked={onChipClick} />
                )}
            </div>
            <div className="flex flex-wrap justify-start items-end my-0.5">
                {negative.map((feedback) =>
                    <FeedbackChip key={feedback.id} feedback={feedback} reviewId={reviewId} onClicked={onChipClick} />
                )}
            </div>
        </div>
}

export default FeedbackList;