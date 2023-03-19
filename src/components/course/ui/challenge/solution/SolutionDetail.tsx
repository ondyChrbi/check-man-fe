import {useQuery} from "@apollo/client";
import {
    getSolutionQuery,
    GetSolutionQuery,
    GetSolutionVariables,
    Status
} from "../../../../../lib/graphql/challengeQuery";
import React from "react";
import Loader from "../../../../ui/Loader";
import {
    ArrowUturnLeftIcon,
    CheckIcon,
    XMarkIcon
} from "@heroicons/react/24/solid";
import {ClockIcon} from "@heroicons/react/24/outline";
import {useTranslation} from "react-i18next";
import TestResultDetail from "./test/TestResultDetail";
import LoadingSpinner from "../../../../LoadingSpinner";

interface Props {
    solutionId: number | string
}

const SolutionDetail = ({solutionId}: Props) => {
    const {t} = useTranslation();

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

    return <div className="flex flex-col">
        <div className="flex flex-row justify-start items-start">
            <div className="mr-5">
                <SolutionStatusIcon status={data.solution.status}/>
            </div>
            <div className="flex flex-col ">
                <p className={`font-bold ${statusFontColorMap.get(data.solution.status)}`}>
                    {t(`challenge.solution.status.title.${data.solution.status}`)}
                </p>
                <h2 className="mt-0.5 text-gray-600 font-light text-sm">
                    {data.solution.uploadDate}
                </h2>
            </div>
        </div>
        {data.solution.testResult &&
            <div className="flex flex-col">
                <TestResultDetail testResult={data.solution.testResult}/>
            </div>
        }
    </div>
}

interface SolutionStatusIconProps {
    status: Status
}

const SolutionStatusIcon = ({status}: SolutionStatusIconProps) => {
    return <div className={`flex flex-col w-12 h-12 p-1.5 rounded-full border-2 ${statusBorderColorMap.get(status)}`}>
        {statusColorIcons.get(status)}
    </div>
};

const statusBorderColorMap = new Map([
    [Status.APPROVED, "border-green-500"],
    [Status.RETURN_TO_EDIT, "border-purple-800"],
    [Status.DENIED, "border-red-800"],
    [Status.WAITING_TO_REVIEW, "border-blue-400"],
]);

const statusFontColorMap = new Map([
    [Status.APPROVED, "text-green-500"],
    [Status.RETURN_TO_EDIT, "text-purple-800"],
    [Status.DENIED, "text-red-800"],
    [Status.WAITING_TO_REVIEW, "text-blue-400"],
]);

const statusColorIcons = new Map([
    [Status.APPROVED, <CheckIcon color="#22C55E"/>],
    [Status.RETURN_TO_EDIT, <ArrowUturnLeftIcon color="#6B21A8"/>],
    [Status.DENIED, <XMarkIcon color="#9A1D1D"/>],
    [Status.WAITING_TO_REVIEW, <ClockIcon color="#60A5FA"/>],
]);

export default SolutionDetail;