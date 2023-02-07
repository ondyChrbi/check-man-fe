import FeedbackForm from "./FeedbackForm";
import React, {useState} from "react";
import {Feedback as SuggestedFeedback, FeedbackSearchV1ApiFp} from "../../../../../../../lib/axois";
import FeedbackChip from "./FeedbackChip";
import {useMutation} from "@apollo/client";
import {
    LinkFeedbackMutation,
    linkFeedbackMutation,
    LinkFeedbackMutationVariables,
} from "../../../../../../../lib/graphql/feedbackQuery";
import {Feedback, getSolutionQuery} from "../../../../../../../lib/graphql/challengeQuery";

interface Props {
    reviewId: number | string,
    solutionId: number | string,
    selectedFeedbacks?: Array<Feedback>
}

const findToSuggestion = (selectedFeedbacks : Array<Feedback>, suggestedFeedbacks : Array<SuggestedFeedback>) => {
    const selectedFeedbacksIds = selectedFeedbacks.map((f) => parseInt(`${f.id}`));
    return suggestedFeedbacks.filter((f) => !selectedFeedbacksIds.includes(f.id));
}

const FeedbackEditor = ({reviewId, solutionId, selectedFeedbacks = []} : Props) => {
    const [suggestions, setSuggestions] = useState<Array<SuggestedFeedback>>([]);

    const [link, {loading}] = useMutation<LinkFeedbackMutation, LinkFeedbackMutationVariables>(linkFeedbackMutation, {
        refetchQueries: [{query: getSolutionQuery, variables: {id : solutionId}}]
    });

    const onInputChangeHandle = async (value: string) => {
        const getAllSuggestions = await FeedbackSearchV1ApiFp().getAllFeedback(value);
        const result = await getAllSuggestions();

        if (result) {
            const suggested = findToSuggestion(selectedFeedbacks, result.data)

            setSuggestions([...suggested]);
        }
    };

    const chipClickHandle = async (feedback: Feedback | SuggestedFeedback, reviewId: string | number) => {
        if (loading) { return; }

        await link({variables: {feedbackId: feedback.id, reviewId}});
        setSuggestions([...suggestions.filter(s => s.id != feedback.id)]);
    }

    return <div className="flex flex-col w-full bg-gray-200 rounded-2xl p-2">
        <FeedbackForm reviewId={reviewId} solutionId={solutionId} onInputChange={onInputChangeHandle} />
        <div className="flex flex-wrap justify-start space-x-2 items-end">
            {suggestions.map((sF) =>
                <FeedbackChip key={sF.id} feedback={sF} reviewId={reviewId} active={false} onClicked={chipClickHandle} />
            )}
        </div>
    </div>
}

export default FeedbackEditor;