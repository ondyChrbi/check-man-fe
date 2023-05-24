import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {useTranslation} from "react-i18next";
import {showErrorToast} from "../../../../../../editor/helpers";
import Input from "../../../../../../editor/input/Input";
import React, {useState} from "react";
import {useMutation} from "@apollo/client";
import {
    createFeedbackToReviewMutation,
    CreateFeedbackToReviewMutation,
    CreateFeedbackToReviewMutationVariables
} from "../../../../../../../lib/graphql/feedbackQuery";
import {FeedbackType, getSolutionQuery} from "../../../../../../../lib/graphql/challengeQuery";
import FeedbackTypeSelect from "./FeedbackTypeSelect";

interface Inputs {
    description: string,
}

interface Props {
    reviewId: number | string,
    solutionId: number | string
    onInputChange?: (value: string) => void,
}

const defaultInputs = {
    description: "",
};

const FeedbackForm = ({reviewId, solutionId, onInputChange} : Props) => {
    const {t} = useTranslation();

    const [type, setType] = useState<FeedbackType | null>(null);
    const [createFeedback, {}] = useMutation<CreateFeedbackToReviewMutation, CreateFeedbackToReviewMutationVariables>(createFeedbackToReviewMutation, {
        refetchQueries: [{query: getSolutionQuery, variables: {id: solutionId}}]
    });

    const resolver = yupResolver(yup.object({
        "description": yup.string()
            .max(128, t('challenge.review.editor.feedback.action.description.error.max-length'))
            .required(t('challenge.review.editor.feedback.action.description.error.required')),
    }));

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({resolver});

    const submitHandler: SubmitHandler<Inputs> = async input => {
        if (reviewId && type) {
            try {
                await createFeedback({variables: { reviewId, feedback : {...input, type} }})
            } catch (error) {
                showErrorToast(error);
            }
        }
    }

    const typeSelectHandle = (type: FeedbackType) => setType(type);

    return <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-row w-full">
            <div className="flex flex-row">
                <FeedbackTypeSelect onTypeSelected={typeSelectHandle}/>
            </div>
            <div className="flex flex-col w-4/5 pr-2">
                <Input onInputChange={onInputChange}
                       propertyName="description"
                       placeHolder={t('challenge.review.editor.feedback.action.description.place-holder')} register={register}
                       defaultValue={defaultInputs.description} error={errors.description?.message}
                />
            </div>
            <div className="flex w-1/5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-h-10">{t('common.button.save')}</button>
            </div>
        </div>
    </form>
}

export default FeedbackForm;