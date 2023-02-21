import {Requirement} from "../../../../../../../lib/graphql/requirementQuery";
import React, {useState} from "react";
import {CheckIcon, PencilIcon, XMarkIcon} from "@heroicons/react/24/solid";
import Input from "../../../../../../editor/input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {useMutation} from "@apollo/client";
import {
    editReviewPoints,
    EditReviewPointsMutation,
    EditReviewPointsVariables
} from "../../../../../../../lib/graphql/reviewQuery";
import {showErrorToast, showSuccessToast} from "../../../../../../editor/helpers";
import {ClockIcon} from "@heroicons/react/24/outline";

interface Props {
    requirement: Requirement
    reviewId: number | string
}

interface Inputs {
    points: number,
}

const RequirementPointsEditor = ({reviewId, requirement}: Props) => {
    const {t} = useTranslation();
    const [current, setCurrent] = useState<number | null>(null);

    const [addPoints] = useMutation<EditReviewPointsMutation, EditReviewPointsVariables>(editReviewPoints, {
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

    const defaultInputs = {
        points: 0,
    };

    const inputChangeHandler = (value: string) => {
        setCurrent(Number(value));
    }

    const submitHandler: SubmitHandler<Inputs> = async input => {
        const {points} = input

        await addPoints({variables: {
            reviewId, requirementId: requirement.id, reviewPointsInput : { points }
        }});

        setCurrent(points);
    }

    return <div className={`${getColorProps(current, requirement)} flex flex-row justify-start bg-gray-100 rounded-2xl my-3 p-5 w-full`}>
        <form className="flex flex-row justify-around items-start align-middle w-full"
              onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-row h-full">
                <div className="flex flex-col justify-center items-center align-middle h-full mr-4">
                    {getIcon(current, requirement)}
                </div>
                <div className="flex flex-row justify-center items-center align-middle">
                    <div className="flex flex-col w-12">
                        <Input propertyName="points" defaultValue={defaultInputs.points}
                               onInputChange={inputChangeHandler}
                               placeHolder={t('challenge.requirement.action.point.place-holder')}
                               register={register} error={errors.points?.message}
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
                        className=" w-fit hover:bg-gray-300 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
                    <PencilIcon width={20} height={20}/>
                    <span>{t('common.button.update')}</span>
                </button>
            </div>
        </form>
    </div>
}

const WIDTH_ICON = 30;
const HEIGHT_ICON = 30;

const getIcon = (current: number | null | undefined, requirement: Requirement) => {
    if (!current && current !== 0) {
        return <ClockIcon width={WIDTH_ICON} height={HEIGHT_ICON} />;
    }

    if (current > requirement.minPoint!) {
        return <CheckIcon width={WIDTH_ICON} height={HEIGHT_ICON}/>;
    }

    return <XMarkIcon width={WIDTH_ICON} height={HEIGHT_ICON}/>;
}

const getColorProps = (current: number | null | undefined, requirement: Requirement) => {
    if (!current && current !== 0) {
        return "";
    }

    if (current > requirement.minPoint!) {
        return "border-2 border-teal-300";
    }

    return "border-2 border-red-400";
}

export default RequirementPointsEditor;