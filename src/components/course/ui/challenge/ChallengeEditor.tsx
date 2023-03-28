import React from 'react'
import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {
    ChallengeKind,
} from "../../../../lib/graphql/challengeQuery";
import {useParams} from "react-router-dom";
import LoadingSpinner from "../../../loading/LoadingSpinner";
import TextEditor from "../../../editor/TextEditor";
import {useChallenge} from "../../../../features/hooks/challenge";
import Input from "../../../editor/input/Input";
import Select from "../../../editor/input/Select";
import DateTime from "../../../editor/input/DateTime";
import {showErrorToast} from "../../../editor/helpers";

interface Inputs {
    name: string,
    description: string,
    deadlineDate: string,
    startDate: string,
    challengeKind: ChallengeKind
}

const ChallengeEditor = () => {
    const {semesterId, challengeId} = useParams<'semesterId' | 'challengeId'>();
    const {t} = useTranslation();

    const {getChallenge, createChallenge, editChallenge, challengeKindSelectValue, resolver} = useChallenge({semesterId});
    const {loading, data} = getChallenge(challengeId);

    const {register, handleSubmit, control, formState: {errors}} = useForm<Inputs>({resolver});

    const submitHandler: SubmitHandler<Inputs> = async input => {
        if (semesterId) {
            try {
                challengeId ? await editChallenge({variables: {challengeId, input}})
                    : await createChallenge({variables: {semesterId, input}});
            } catch (error) {
                showErrorToast(error);
            }
        }
    }

    const defaultInputs = {
        name: (challengeId && data?.challenge.name) ?? "",
        description: (challengeId && data?.challenge.description) ?? "",
        deadlineDate: (challengeId && data?.challenge.deadlineDate) ?? "",
        startDate: (challengeId && data?.challenge.startDate) ?? "",
        challengeKind: (challengeId && data?.challenge.challengeKind) ?? ChallengeKind.OPTIONAL,
    };

    if (challengeId && loading) {
        return <div className="w-full h-fit flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    return <div className="flex flex-col w-full">
        <h1 className="my-7 text-gray-600 font-light text-4xl">{t('challenge.new.title')}</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2">
                <div className="m-0 lg:mr-5 mt-1 lg:mt-0 flex flex-col items-start justify-start">
                    <Input propertyName="name" label={t('challenge.action.name.name')}
                           placeHolder={t('challenge.action.name.place-holder')} register={register}
                           defaultValue={defaultInputs.name} error={errors.name?.message}
                    />
                </div>

                <div className="m-0 lg:ml-5 mt-1 lg:mt-0 flex flex-col items-start justify-start">
                    <Select values={challengeKindSelectValue} propertyName="challengeKind"
                            label={t('challenge.action.challenge-kind.name')} register={register}
                            defaultValue={defaultInputs.challengeKind} error={errors.challengeKind?.message}
                    />
                </div>
            </div>

            <div className="m-0 lg:my-5 grid grid-cols-1 ">
                <div className="flex flex-col items-start justify-start">
                    <TextEditor control={control} propertyName="description" register={register}/>
                </div>
            </div>

            <div className="my-5 grid grid-cols-1 md:grid-cols-2">
                <div className="m-0 lg:mr-5 mt-1 lg:mt-0 flex flex-col items-start justify-start">
                    <DateTime propertyName="startDate" defaultValue={defaultInputs.startDate} register={register}
                              label={t('challenge.action.start-date.name')} control={control}
                    />
                </div>

                <div className="m-0 lg:ml-5 mt-1 lg:mt-0 flex flex-col items-start justify-start">
                    <DateTime propertyName="deadlineDate" defaultValue={defaultInputs.deadlineDate} register={register}
                              label={t('challenge.action.end-date.name')} control={control}
                    />
                </div>
            </div>

            <div className="my-5 grid grid-cols-1">
                <div className="flex flex items-start justify-start w-full h-20">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{t('common.button.save')}</button>
                </div>
            </div>
        </form>
    </div>
}

export default ChallengeEditor;