import {Requirement} from "../../../../../../../lib/graphql/requirementQuery";
import React, {useState} from "react";
import {CheckIcon, PencilIcon, XMarkIcon} from "@heroicons/react/24/solid";
import Input from "../../../../../../editor/input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";

const WIDTH = 30;
const HEIGHT = 30;

interface Props {
    requirement: Requirement
}

interface Inputs {
    point: number,
}

const getIcon = (current: number, requirement: Requirement) => {
    if (current >= requirement.minPoint!) {
        return <CheckIcon width={WIDTH} height={HEIGHT}/>
    }

    return <XMarkIcon width={WIDTH} height={HEIGHT}/>
}

const RequirementPointsEditor = ({requirement}: Props) => {
    const {t} = useTranslation();
    const [current, setCurrent] = useState(requirement.minPoint || 0);

    const resolver = yupResolver(yup.object({
        "point": yup.number()
            .nullable()
            .required(t('challenge.requirement.action.point.error.required')),
    }));

    const {register, handleSubmit, reset, formState: {errors}} = useForm<Inputs>({resolver});

    const defaultInputs = {
        point: 0,
    };

    const submitHandler: SubmitHandler<Inputs> = async input => {
    }

    return <div className="flex flex-row justify-start bg-gray-100 rounded-2xl my-3 p-5 w-full">
        <form className="flex flex-row justify-around items-start align-middle w-full"
              onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-row">
                <div className="flex flex-col justify-center items-center align-middle h-full mr-4">
                    {getIcon(current, requirement)}
                </div>
                <div className="flex flex-row justify-center items-center align-middle">
                    <div className="flex flex-col w-12">
                        <Input propertyName="point" defaultValue={defaultInputs.point}
                               placeHolder={t('challenge.requirement.action.point.place-holder')}
                               register={register} error={errors.point?.message}
                        />
                    </div>
                    <div className="mx-2">/</div>
                    <div>{requirement.maxPoint}</div>
                </div>
            </div>
            <div className="flex flex-col justify-center align-top">
                <div className="font-bold text-gray-600 text-lg break-words">{requirement.name}</div>
                <div className="text-sm break-words">{requirement.description}</div>
            </div>
            <div className="flex flex-col w-20">
                <button type="submit"
                        className="w-fit hover:bg-gray-300 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
                    <PencilIcon width={20} height={20}/>
                    <span>{t('common.button.update')}</span>
                </button>
            </div>
        </form>
    </div>
}

export default RequirementPointsEditor;