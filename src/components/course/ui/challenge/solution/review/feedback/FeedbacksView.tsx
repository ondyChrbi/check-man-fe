import {Review} from "../../../../../../../lib/graphql/challengeQuery";
import {useTranslation} from "react-i18next";
import FeedbackChip from "./FeedbackChip";
import React from "react";
import FeedbackForm from "./FeedbackForm";

interface Props {
    review: Review,
    solutionId: number | string
}

const FeedbacksView = ({review, solutionId}: Props) => {
    const {t} = useTranslation();

    return <div className="flex flex-col">
        <h2 className="my-3 text-gray-600 font-light text-2xl">{t('challenge.review.editor.feedback.title')}</h2>

        {review.feedbacks.length !== 0 &&
            <div className="flex flex-wrap justify-start space-x-2 items-end">
                {review.feedbacks.map((feedback) =>
                    <FeedbackChip feedback={feedback} reviewId={review.id} solutionId={solutionId} />
                )}
            </div>
        }

        <div className="flex flex-col w-full">
            <FeedbackForm reviewId={review.id} solutionId={solutionId} />
        </div>
    </div>
}

export default FeedbacksView;