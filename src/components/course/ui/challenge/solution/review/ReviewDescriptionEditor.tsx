import {useTranslation} from "react-i18next";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {showErrorToast} from "../../../../../editor/helpers";
import TextEditor from "../../../../../editor/TextEditor";
import React from "react";
import {Review} from "../../../../../../lib/graphql/challengeQuery";
import {useMutation} from "@apollo/client";
import {editReviewMutation, EditReviewMutation, EditReviewVariables} from "../../../../../../lib/graphql/reviewQuery";
import {PencilIcon} from "@heroicons/react/24/solid";

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;

interface Inputs {
    description: string,
}

interface Props {
    review: Review,
    children?: React.ReactNode
}

const ReviewDescriptionEditor = ({review, children}: Props) => {
    const {t} = useTranslation();
    const [save] = useMutation<EditReviewMutation, EditReviewVariables>(editReviewMutation, {
        onError: (error) => {
            showErrorToast(error);
        },
    });

    const resolver = yupResolver(yup.object({
        "description": yup.string()
            .required(t('challenge.review.editor.description.error.required')),
    }));
    const defaultInputs = {
        description: (review && review.description) ?? "",
    };

    const {register, handleSubmit, control, formState: {errors}} = useForm<Inputs>({resolver});

    const submitHandler: SubmitHandler<Inputs> = async input => {
        try {
            await save({variables: {id: review.id, input: {description: input.description}}})
        } catch (error) {
            showErrorToast(error);
        }
    }

    return <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col items-start justify-start">
            <TextEditor defaultValue={defaultInputs.description} control={control} propertyName="description"
                        register={register}/>
        </div>
        <div className="flex flex-row justify-start space-x-1">
            {children}
            <div className="flex flex-row justify-start items-center align-middle">
                <button
                    className="w-fit hover:bg-gray-300 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
                    <PencilIcon className="mr-2" width={ICON_WIDTH} height={ICON_HEIGHT}  />
                    {t('common.button.save')}
                </button>
            </div>
        </div>
    </form>
}

export default ReviewDescriptionEditor