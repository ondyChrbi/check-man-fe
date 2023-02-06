import {Feedback} from "../../../../../../../lib/graphql/challengeQuery";
import {useTranslation} from "react-i18next";
import FeedbackChip from "./FeedbackChip";
import React from "react";

interface Props {
    feedbacks: Array<Feedback>
}

const FeedbacksView = ({feedbacks}: Props) => {
    const {t} = useTranslation();

    return <div className="flex flex-col">
        <h2 className="my-3 text-gray-600 font-light text-2xl">{t('challenge.review.editor.feedback.title')}</h2>

        <div className="flex flex-wrap justify-start space-x-2 items-end">
            {feedbacks.map((feedback) =>
                <FeedbackChip feedback={feedback}/>
            )}
        </div>
    </div>
}

export default FeedbacksView;