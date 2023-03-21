import FeedbackChip from "./FeedbackChip";
import React from "react";
import {Feedback} from "../../../../../../../lib/graphql/challengeQuery";
import {Feedback as SuggestedFeedback} from "../../../../../../../lib/axois";

interface Props {
    feedbacks: Array<Feedback>,
    reviewId?: string | number,
    onChipClick?: (feedback: Feedback | SuggestedFeedback, reviewId: string | number) => void
}

const FeedbackList = ({feedbacks, reviewId, onChipClick} : Props) => {
    return <div className="flex flex-wrap justify-start items-end">
            {feedbacks.map((feedback) =>
                <FeedbackChip key={feedback.id} feedback={feedback} reviewId={reviewId} onClicked={onChipClick} />
            )}
        </div>
}

export default FeedbackList;