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
import {useTranslation} from "react-i18next";
import {showErrorToast} from "../../../../../../editor/helpers";

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
    const {t} = useTranslation();
    const [suggestions, setSuggestions] = useState<Array<SuggestedFeedback>>([]);
    const [error, setError] = useState(false);

    const [link, {loading}] = useMutation<LinkFeedbackMutation, LinkFeedbackMutationVariables>(linkFeedbackMutation, {
        refetchQueries: [{query: getSolutionQuery, variables: {id : solutionId}}]
    });

    const onInputChangeHandle = async (value: string) => {
        const getAllSuggestions = await FeedbackSearchV1ApiFp().getAllFeedback(value);

        try {
            const result = await getAllSuggestions();
            if (result) {
                const suggested = findToSuggestion(selectedFeedbacks, result.data);

                setSuggestions([...suggested]);
            }
        } catch (e) {
            setError(true);
            return;
        }
    };

    const chipClickHandle = async (feedback: Feedback | SuggestedFeedback, reviewId: string | number) => {
        if (loading) { return; }

        await link({variables: {feedbackId: feedback.id, reviewId}});
        setSuggestions([...suggestions.filter(s => s.id != feedback.id)]);
    }


    return <div className="flex flex-col w-full rounded-2xl p-2">
        <FeedbackForm reviewId={reviewId} solutionId={solutionId} onInputChange={onInputChangeHandle} />
        <div className="flex flex-wrap justify-start items-end">
            {suggestions.map((sF) =>
                <FeedbackChip key={sF.id} feedback={sF} reviewId={reviewId} active={false} onClicked={chipClickHandle} />
            )}
        </div>
    </div>
}

export default FeedbackEditor;