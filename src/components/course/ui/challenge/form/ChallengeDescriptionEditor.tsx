import {
    Challenge,
    editChallengeMutation,
    EditChallengeMutation,
    EditChallengeVariables, getChallengesQuery
} from "../../../../../lib/graphql/challengeQuery";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/client";
import {showErrorToast, showSuccessToast} from "../../../../editor/helpers";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {toChallengeInput} from "../../../../../features/challenge/helper";
import TextEditor from "../../../../editor/TextEditor";
import {CheckIcon} from "@heroicons/react/24/solid";
import React from "react";

const WIDTH_ICON = 30;
const HEIGHT_ICON = 30;

const MAX_LENGTH = 5000;

interface Inputs {
    description: string,
}

interface Props {
    semesterId: number | string
    challenge: Challenge
    onEditFinished?: (challenge: Challenge) => void
}

const ChallengeDescriptionEditor = ({challenge, onEditFinished}: Props) => {
    const {t} = useTranslation();

    const [editChallenge, {loading}] = useMutation<EditChallengeMutation, EditChallengeVariables>(editChallengeMutation, {
        onError: (error) => {
            showErrorToast(error);
        },
        onCompleted: () => {
            showSuccessToast(t('common.message.publish'));
        },
        refetchQueries: [{ query: getChallengesQuery, variables: { id: challenge.id } }],
    });

    const resolver = yupResolver(yup.object({
        "description": yup.string()
            .max(MAX_LENGTH, t('challenge.action.description.error.max-length'))
            .required(t('challenge.action.description.error.required'))
    }));

    const {register, handleSubmit, control, formState: {errors}} = useForm<Inputs>({resolver});

    const submitHandler: SubmitHandler<Inputs> = async input => {
        if (loading) { return }

        const challengeId = challenge.id;
        const edited = {...toChallengeInput(challenge), ...input};

        const result = await editChallenge({variables: {challengeId, input: edited}});

        if (onEditFinished && result.data?.editChallenge) {
            onEditFinished(result.data?.editChallenge)
        }
    }

    return <form className="flex flex-col w-full justify-start align-top items-start" onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col w-full items-start justify-start my-2">
            <TextEditor control={control} propertyName="description" register={register} defaultValue={challenge.description} />
            {errors.description?.message && <div className="w-full">{errors.description.message}</div>}
        </div>
        <button className="w-fit hover:bg-teal-300 bg-teal-200 font-bold py-2 px-4 rounded-full inline-flex items-center mx-1 my-2">
            <CheckIcon width={WIDTH_ICON} height={HEIGHT_ICON}/>
            <span>{t("common.button.publish")}</span>
        </button>
    </form>
}

export default ChallengeDescriptionEditor;