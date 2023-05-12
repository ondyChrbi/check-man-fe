import {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {
    editReviewPoints,
    EditReviewPointsMutation, EditReviewPointsVariables,
    GetRequirementReview,
    GetRequirementReviewVariables,
    requirementReview
} from "../../../lib/graphql/reviewQuery";
import {showErrorToast, showSuccessToast} from "../../../components/editor/helpers";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {Requirement} from "../../../lib/graphql/requirementQuery";

interface Inputs {
    points: number,
}

export const useRequirementReview = (reviewId : string | number, requirement : Requirement) => {
    const {t} = useTranslation();

    const [current, setCurrent] = useState<number | null | undefined>(null);
    const {data} = useQuery<GetRequirementReview, GetRequirementReviewVariables>(requirementReview, {
        variables: {reviewId, requirementId: requirement.id},
        onCompleted: (data) => {
            setCurrent(data.requirementReview?.points);
        },
    });

    const [addPoints, {loading}] = useMutation<EditReviewPointsMutation, EditReviewPointsVariables>(editReviewPoints, {
        onError: (error) => {
            showErrorToast(error);
        },
        onCompleted: () => {
            showSuccessToast(t('common.message.publish'));
        },
    });

    const resolver = yupResolver(yup.object({
        "points": yup.number()
            .nullable()
            .required(t('challenge.requirement.action.point.error.required')),
    }));

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({resolver});

    const inputChangeHandler = async (points?: string) => {
        if (points) {
            await addPoints({variables: {
                    reviewId, requirementId: requirement.id, reviewPointsInput : { points }
                }});

            setCurrent(parseInt(points));
        }
    }

    const submitHandler: SubmitHandler<Inputs> = async input => {
        if (!loading) {
            const {points} = input

            await addPoints({variables: {
                    reviewId, requirementId: requirement.id, reviewPointsInput : { points }
                }});

            setCurrent(points);
        }
    }

    return {
        data,
        errors,
        current,
        register,
        handleSubmit,
        inputChangeHandler,
        submitHandler,
        addPoints
    }
}