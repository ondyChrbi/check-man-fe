import Input from "../../../../editor/input/Input";
import React from "react";
import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRequirements} from "../../../../../features/authentication/hooks/challenge";
import {showErrorToast} from "../../../../editor/helpers";
import { Requirement } from "../../../../../lib/graphql/requirementQuery";

interface Inputs {
    name: string,
    description: string,
    minPoint: number,
    maxPoint: number
}

interface Props {
    challengeId: string | number;
    requirementId?: string | number | undefined;
    onFinished?: (requirement : Requirement) => void | undefined;
}

const RequirementEditor = ({challengeId, requirementId, onFinished}: Props) => {
    const {t} = useTranslation();
    const {createRequirement, editRequirement, resolver} = useRequirements({challengeId});

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({resolver});

    const submitHandler: SubmitHandler<Inputs> = async input => {
        try {
            (requirementId) ? await edit(requirementId, input) : await create(challengeId, input);
        } catch (error) {
            showErrorToast(error);
        }
    }

    const edit = async (requirementId : string | number, input: Inputs) => {
        const result = await editRequirement({variables: {requirementId, input}});

        if (onFinished && result.data && result.data.editRequirement) {
            onFinished(result.data.editRequirement);
        }
    }

    const create = async (challengeId : string | number, input: Inputs) => {
        const result = await createRequirement({variables: {challengeId, input}});

        if (onFinished && result.data && result.data.createRequirement) {
            onFinished(result.data.createRequirement);
        }
    }

    return <div className="my-5 flex flex-row justify-between">
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="my-5 w-full grid grid-cols-1 md:grid-cols-5 justify-between">
                <div className="mr-2">
                    <Input propertyName="name"
                           placeHolder={t('requirement.action.name.place-holder')} register={register}
                           error={errors.name?.message}
                    />
                </div>
                <div className="mx-2">
                    <Input propertyName="description"
                           placeHolder={t('requirement.action.description.place-holder')}
                           register={register}
                           error={errors.name?.message}
                    />
                </div>
                <div className="mx-2">
                    <Input propertyName="minPoint"
                           placeHolder={t('requirement.action.minPoint.place-holder')} register={register}
                           error={errors.name?.message}
                    />
                </div>
                <div className="mx-2">
                    <Input propertyName="maxPoint"
                           placeHolder={t('requirement.action.maxPoint.place-holder')} register={register}
                           error={errors.name?.message}
                    />
                </div>
                <div className="ml-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {t((requirementId) ? 'common.button.save' : 'common.button.add')}
                    </button>
                </div>
            </div>
        </form>
    </div>
}

export default RequirementEditor;