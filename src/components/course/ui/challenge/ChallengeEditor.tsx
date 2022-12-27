import React from 'react'
import {useTranslation} from "react-i18next";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {
    ChallengeKind,
    ChallengeQuery,
    createChallengeMutation,
    CreateChallengeMutation,
    CreateChallengeVariables, editChallengeMutation, EditChallengeMutation, EditChallengeVariables,
    getChallengeQuery
} from "../../../../lib/graphql/challengeQuery";
import DatePicker from "react-multi-date-picker";
import {useMutation, useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";
import LoadingSpinner from "../../../LoadingSpinner";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import parse from "date-fns/parse";
import TextEditor from "../../../editor/TextEditor";

interface Props {
}

interface Inputs {
    name: string,
    description: string,
    deadlineDate: string,
    startDate: string,
    challengeKind: ChallengeKind
}

const ChallengeEditor = ({}: Props) => {
    const {semesterId, challengeId} = useParams<'courseId' | 'semesterId' | 'challengeId'>();
    const {t} = useTranslation();

    const {loading, data} = useQuery<ChallengeQuery>(getChallengeQuery, {
        variables: {"id": challengeId}
    });

    const [createChallenge] = useMutation<CreateChallengeMutation, CreateChallengeVariables>(createChallengeMutation);
    const [editChallenge] = useMutation<EditChallengeMutation, EditChallengeVariables>(editChallengeMutation);

    const submitHandler: SubmitHandler<Inputs> = async data => {
        console.table(data)
        if (semesterId) {
            if (challengeId) {
                await editChallenge({variables: {challengeId: challengeId, input: data}});
            } else {
                const response = await createChallenge({variables: {semesterId: semesterId, input: data}});
                console.table(response)
            }
        }
    }

    const {register, handleSubmit, control, formState: {errors}} = useForm<Inputs>({
        resolver: yupResolver(yup.object({
            "name": yup.string()
                .max(20, t('challenge.action.name.error.max-length'))
                .required(t('challenge.action.name.error.required')),
            "challengeKind": yup.mixed()
                .oneOf(Object.values(ChallengeKind))
                .required(t('challenge.action.challenge-kind.error.required')),
            "startDate": yup.date()
                .transform(function (value, originalValue) {
                    if (this.isType(value)) { return value; }
                    return parse(originalValue, "dd.MM.yyyy", new Date());
                })
        }))
    })

    const challengeKindSelectValue = new Map();
    challengeKindSelectValue.set(ChallengeKind.OPTIONAL, t('challenge.action.challenge-kind.option.optional'));
    challengeKindSelectValue.set(ChallengeKind.MANDATORY, t('challenge.action.challenge-kind.option.mandatory'));
    challengeKindSelectValue.set(ChallengeKind.CREDIT, t('challenge.action.challenge-kind.option.credit'));
    challengeKindSelectValue.set(ChallengeKind.EXAM, t('challenge.action.challenge-kind.option.exam'));


    const defaultInputs = {
        name: (challengeId && data?.challenge.name) ?? "",
        description: (challengeId && data?.challenge.description) ?? "",
        deadlineDate: (challengeId && data?.challenge.deadlineDate) ?? "",
        startDate: (challengeId && data?.challenge.startDate) ?? "",
        challengeKind: (challengeId && data?.challenge.challengeKind) ?? ChallengeKind.OPTIONAL,
    }

    if (challengeId && loading) {
        return <div className="w-screen h-screen flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    return <>
        <h1 className="mx-5">{t('challenge.new.title')}</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2">
                <div className="mx-5 flex flex-col items-start justify-start">
                    <label htmlFor="name">{t('challenge.action.name.name')}</label>
                    <input defaultValue={defaultInputs.name} placeholder={t('challenge.action.name.place-holder')}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                           {...register("name")} />
                    <div>{errors.name?.message}</div>
                </div>

                <div className="mx-5 flex flex-col items-start justify-start">
                    <label htmlFor="challengeKind">{t('challenge.action.challenge-kind.name')}</label>
                    <select defaultValue={defaultInputs.challengeKind}
                            {...register("challengeKind")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        {Object.values(ChallengeKind).map((chK) =>
                            <option key={chK} value={chK}>{challengeKindSelectValue.get(chK)}</option>
                        )}
                    </select>
                </div>
            </div>

            <div className="my-5 grid grid-cols-1 ">
                <div className="mx-5 flex flex-col items-start justify-start">
                    <label htmlFor="text">
                        {t('challenge.action.description.name')}
                    </label>
                    <div
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-fit pb-2.5 ">
                        <Controller control={control}
                                    name="description"
                                    rules={{required: true}}
                                    render={({field: {onChange}}) => <TextEditor onChange={onChange}/>}
                        />
                    </div>
                </div>
            </div>

            <div className="my-5 grid grid-cols-1 md:grid-cols-2">
                <div className="mx-5 flex flex-col items-start justify-start">
                    <label>{t('challenge.action.start-date.name')}</label>
                    <Controller control={control} name="startDate" rules={{required: false}}
                                render={({field: {onChange, value}}) => (
                                    <DatePicker value={value || defaultInputs.startDate}
                                                required={false}
                                                onChange={(date) => {
                                                    //@ts-ignore
                                                    onChange(date.toDate().toISOString())
                                                }}
                                    />
                                )}
                    />
                </div>

                <div className="mx-5 flex flex-col items-start justify-start">
                    <label>{t('challenge.action.end-date.name')}</label>
                    <Controller control={control} name="deadlineDate" rules={{required: false}}
                                render={({field: {onChange, value}}) => (
                                    <DatePicker value={value || defaultInputs.deadlineDate}
                                                required={false}
                                                onChange={(date) => {
                                                    //@ts-ignore
                                                    onChange(date.toDate().toISOString())
                                                }}
                                    />
                                )}
                    />
                </div>
            </div>

            <div className="my-5 grid grid-cols-1">
                <div className="mx-5 flex flex items-start justify-start w-full h-20">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{t('common.button.publish')}</button>
                </div>
            </div>
        </form>
    </>
}

export default ChallengeEditor;