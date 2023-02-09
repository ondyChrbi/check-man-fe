import Input from "../../../../editor/input/Input";
import React from "react";
import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {showErrorToast} from "../../../../editor/helpers";
import {Requirement} from "../../../../../lib/graphql/requirementQuery";
import {useRequirements} from "../../../../../features/authentication/hooks/challenge";
import {XMarkIcon} from "@heroicons/react/24/solid";

interface Inputs {
    name: string,
    description: string,
    minPoint: number,
    maxPoint: number
}

interface Props {
    challengeId: string | number;
    requirement?: Requirement | null | undefined
    onFinished?: (requirement: Requirement) => void | undefined;
    onHide?: () => Promise<void> | void;
}

const ICON_WIDTH = 30;
const ICON_HEIGHT = 30;

const RequirementEditor = ({challengeId, requirement, onFinished, onHide}: Props) => {
    const {t} = useTranslation();
    const {createRequirement, editRequirement, resolver} = useRequirements({challengeId});

    const {register, handleSubmit, reset, formState: {errors}} = useForm<Inputs>({resolver});

    const defaultInputs = {
        name: (requirement && requirement.name) ?? "",
        description: (requirement && requirement.description) ?? "",
        minPoint: (requirement && requirement.minPoint) ?? 0,
        maxPoint: (requirement && requirement.maxPoint) ?? 10,
    };

    const edit = async (requirementId: string | number, input: Inputs) => {
        const result = await editRequirement({variables: {requirementId, input}});

        if (onFinished && result.data && result.data.editRequirement) {
            onFinished(result.data.editRequirement);
        }
    }

    const create = async (challengeId: string | number, input: Inputs) => {
        const result = await createRequirement({variables: {challengeId, input}});

        if (onFinished && result.data && result.data.createRequirement) {
            onFinished(result.data.createRequirement);
        }
    }

    const submitHandler: SubmitHandler<Inputs> = async input => {
        try {
            (requirement) ? await edit(requirement.id, input) : await create(challengeId, input);

            reset(defaultInputs);
            if (requirement && onHide) {
                await onHide();
            }
        } catch (error) {
            showErrorToast(error);
        }
    }

    const hideClickedHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onHide) {
            await onHide();
        }
    }

    return <div className="w-full my-5 flex flex-row justify-center items-center">
        <form className="bg-gray-100 rounded-2xl" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-row justify-between">
                <h2 className="px-4 pt-4 text-gray-600 font-bold text-2xl">{t('challenge.requirement.new.title')}</h2>
                <button onClick={hideClickedHandle} className="flex flex-col justify-center items-center h-full w-12 h-12 px-2 hover:bg-gray-300 rounded-full">
                    <XMarkIcon width={ICON_WIDTH} height={ICON_HEIGHT} />
                </button>
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col px-5">
                    <div className="my-5 w-full flex flex-row justify-center">
                        <div
                            className="w-32 h-32 flex flex-row justify-center items-center text-teal-600 border-teal-600 border-8 rounded-full text-2xl mr-5">
                            <div className="mx-2 w-16">
                                <Input propertyName="minPoint" defaultValue={defaultInputs.minPoint}
                                       placeHolder={t('challenge.requirement.action.minPoint.place-holder')}
                                       register={register}
                                />
                            </div>
                            <div>/</div>
                            <div className="mx-2 w-16">
                                <Input propertyName="maxPoint" defaultValue={defaultInputs.maxPoint}
                                       placeHolder={t('challenge.requirement.action.maxPoint.place-holder')}
                                       register={register}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col w-96 justify-center items-center">
                            <div className="flex flex-col my-1 w-full">
                                <Input propertyName="name" defaultValue={defaultInputs.name}
                                       placeHolder={t('challenge.requirement.action.name.place-holder')}
                                       register={register}
                                       error={errors.name?.message}
                                />
                            </div>
                            <div className="flex flex-row w-full">
                                <div className="flex flex-col w-full">
                                    <Input propertyName="description" defaultValue={defaultInputs.description}
                                           placeHolder={t('challenge.requirement.action.description.place-holder')}
                                           register={register}
                                           error={errors.description?.message}
                                    />
                                </div>
                                <div className="ml-2">
                                    <button
                                        className="bg-teal-200 hover:bg-blue-700 text-white text-gray-800 font-bold py-2 px-4 rounded">
                                        {t((requirement) ? 'common.button.save' : 'common.button.add')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {errors.minPoint && <div className="w-full text-red-800">{errors.minPoint.message}</div>}
                    {errors.maxPoint && <div className="w-full text-red-800">{errors.maxPoint.message}</div>}
                </div>
                </div>
        </form>
    </div>
}

export default RequirementEditor;