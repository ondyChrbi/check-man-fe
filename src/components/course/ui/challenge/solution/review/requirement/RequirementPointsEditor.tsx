import {Requirement} from "../../../../../../../lib/graphql/requirementQuery";
import React from "react";
import Input from "../../../../../../editor/input/Input";
import {getColorProps, useRequirementReview} from "../../../../../../../features/challenge/review";
import {useTranslation} from "react-i18next";

interface Props {
    requirement: Requirement
    reviewId: number | string
}

const RequirementPointsEditor = ({reviewId, requirement}: Props) => {
    const {t} = useTranslation();
    const {
        handleSubmit,
        submitHandler,
        current,
        data,
        errors,
        inputChangeHandler,
        register
    } = useRequirementReview(reviewId, requirement);

    return <div className={`flex flex-row justify-center my-3 w-full`}>
        <form className="flex flex-col justify-around items-start align-middle w-full"
              onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col justify-center align-top w-full text-center mb-4  ">
                <div className="font-bold text-gray-600 text-lg break-words">{requirement.name}</div>
            </div>
            <div className="flex flex-row w-full justify-center align-middle items-center">
                <div className={`${getColorProps(current, requirement)} flex flex-row justify-center items-center align-middle w-24 h-24 rounded-full border-4`}>
                    <div className="flex flex-col w-6">
                        <Input propertyName="points" defaultValue={data?.requirementReview?.points}
                               onInputChange={inputChangeHandler}
                               placeHolder={t('challenge.requirement.action.point.place-holder')}
                               register={register} error={errors.points?.message}
                               css="text-gray-900 text-sm rounded-lg text-center"
                        />
                    </div>
                    <div className="mx-0.5">/</div>
                    <div>{requirement.maxPoint}</div>
                </div>
            </div>
        </form>
    </div>
}

export default RequirementPointsEditor;