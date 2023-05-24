import {useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import { Solution } from "../../../../../../lib/graphql/challengeQuery";
import React from "react";
import {useTranslation} from "react-i18next";
import {DocumentCheckIcon} from "@heroicons/react/24/solid";
import {
    createReviewMutation,
    CreateReviewMutation,
    CreateReviewVariables
} from "../../../../../../lib/graphql/reviewQuery";
import {showErrorToast} from "../../../../../editor/helpers";

interface Props {
    courseId: number | string;
    semesterId: number | string;
    challengeId: number | string;
    solution: Solution;
}

const ReviewStartButton = ({courseId, semesterId, challengeId, solution} : Props) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {id : solutionId} = solution;

    const [createEmpty] = useMutation<CreateReviewMutation, CreateReviewVariables>(createReviewMutation);
    const addReviewClickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        let reviewId = solution.review?.id

        if (!reviewId) {
            const input = {description: t('challenge.review.editor.description.default')};
            try {
                const result = await createEmpty({variables: {solutionId, input}});

                reviewId = result.data?.createReview.id!
            } catch (error) {
                showErrorToast(error);
                return;
            }
        }
        navigate(`/courses/${courseId}/semester/${semesterId}/challenge/${challengeId}/solution/${solution.id}/review/${reviewId}/edit`)
    };

    return <div className="cursor-pointer" onClick={addReviewClickHandle}>
        <div className="w-fit bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
            <DocumentCheckIcon width={20} height={20} />
            <span>{t('challenge.review.action.edit')}</span>
        </div>
    </div>
}

export default ReviewStartButton;