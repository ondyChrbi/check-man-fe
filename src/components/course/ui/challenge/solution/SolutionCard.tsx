import {useQuery} from "@apollo/client";
import {
    getSolutionQuery,
    GetSolutionQuery,
    GetSolutionVariables,
    Status
} from "../../../../../lib/graphql/challengeQuery";
import React from "react";
import {
    ArrowUturnLeftIcon,
    CheckIcon,
    XMarkIcon
} from "@heroicons/react/24/solid";
import {ClockIcon} from "@heroicons/react/24/outline";
import {useTranslation} from "react-i18next";
import LoadingSpinner from "../../../../loading/LoadingSpinner";
import {useCourseRoles} from "../../../../../features/authorization/hooks";
import {SemesterRole} from "../../../../../lib/graphql/courseQuery";
import TestResultButton from "./TestResultButton";
import {toFormattedDateTime} from "../../../../../features/helper";
import {statusBackgroundColorMap, statusFontColorMap} from "../../../../../features/challenge/solution";

interface Props {
    solutionId: number | string
    courseId: number | string
    semesterId: number | string
}

const SolutionCard = ({solutionId, courseId, semesterId}: Props) => {
    const {t} = useTranslation();
    const {roles} = useCourseRoles(semesterId!);

    const {data, loading, error} = useQuery<GetSolutionQuery, GetSolutionVariables>(getSolutionQuery, {
        variables: {id: solutionId}
    });

    if (loading) {
        return <div className="w-full h-fit flex flex-col items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !data) {
        return <p>Error</p>
    }

    return <div className="flex flex-col bg-gray-100 rounded-2xl p-3.5">
        <div className="flex flex-row justify-start items-start">
            <div className="mr-5">
                <SolutionStatusIcon status={data.solution.status}/>
            </div>
            <div className="flex flex-col ">
                <p className={`font-bold ${statusFontColorMap.get(data.solution.status)}`}>
                    {t(`challenge.solution.status.title.${data.solution.status}`)}
                </p>
                <h2 className="mt-0.5 text-gray-800 font-light text-sm">
                    {toFormattedDateTime(data.solution.uploadDate)}
                </h2>
            </div>
        </div>
        {roles.includes(SemesterRole.VIEW_TEST_RESULT) && data.solution.testResult &&
            <div className="flex flex-col justify-center items-center align-middle mt-5">
                <TestResultButton testResult={data.solution.testResult} courseId={courseId} semesterId={semesterId} />
            </div>
        }
    </div>
}

interface SolutionStatusIconProps {
    status: Status
}

export const SolutionStatusIcon = ({status}: SolutionStatusIconProps) => {
    return <div className={`flex flex-col w-12 h-12 p-3 rounded-full ${statusBackgroundColorMap.get(status)}`}>
        {statusColorIcons.get(status)}
    </div>
};

export const statusColorIcons = new Map([
    [Status.APPROVED, <CheckIcon color="#FFFFFF"/>],
    [Status.RETURN_TO_EDIT, <ArrowUturnLeftIcon color="#FFFFFF"/>],
    [Status.DENIED, <XMarkIcon color="#FFFFFF"/>],
    [Status.WAITING_TO_REVIEW, <ClockIcon color="#FFFFFF"/>],
]);

export default SolutionCard;