import {TestResult, TestStatus} from "../../../../../../lib/graphql/solutionQuery";
import {useTranslation} from "react-i18next";
import {getStatusTranslate} from "../../../../../../features/challenge/test";
import {ClockIcon} from "@heroicons/react/24/outline";
import {FaceFrownIcon, ForwardIcon, ScaleIcon} from "@heroicons/react/24/solid";
import React from "react";

interface Props {
    result?: TestResult;
}

const TestStatusIcon = ({result}: Props) => {
    const {t} = useTranslation();

    return <div className="flex flex-row justify-center items-center align-middle rounded-sm w-fit p-5">
        {getStatusIcon(result?.status)}
        <div className="mx-3.5 text-xl font-bold text-red-800">
            {t(getStatusTranslate(result?.status))}
        </div>
    </div>
};

const ICON_WIDTH = 50;
const ICON_HEIGHT= 50;

const getStatusIcon = (status?: TestStatus | undefined | null) => {
    switch (status) {
        default:
        case TestStatus.WAITING_TO_TEST:
            return <ClockIcon width={ICON_WIDTH} height={ICON_HEIGHT} color="#4b5563" />
        case TestStatus.RUNNING:
            return <ForwardIcon width={ICON_WIDTH} height={ICON_HEIGHT} color="#4b5563" />
        case TestStatus.FINISHED:
            return <ScaleIcon width={ICON_WIDTH} height={ICON_HEIGHT} color="#4b5563" />
        case TestStatus.ERROR:
            return <FaceFrownIcon width={ICON_WIDTH} height={ICON_HEIGHT} color="#991c1c" />
    }
};

export default TestStatusIcon;