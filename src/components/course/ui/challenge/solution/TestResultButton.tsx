import {TestResult, TestStatus} from "../../../../../lib/graphql/solutionQuery";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {CheckIcon, ChevronDoubleRightIcon} from "@heroicons/react/24/solid";
import {ClockIcon} from "@heroicons/react/24/outline";
import React from "react";
import {ExclamationTriangleIcon} from "@heroicons/react/20/solid";

interface Props {
    testResult: TestResult,
    courseId: number | string,
    semesterId: number | string,
}

const TestResultButton = ({testResult, courseId, semesterId}: Props) => {
    const {t} = useTranslation();

    return <Link to={`/courses/${courseId}/semester/${semesterId}/test-result/${testResult.id}`}>
        <div className="flex flex-row align-middle items-center w-fit py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
            <div className="flex flex-col align-middle justify-center w-6 h-6">{statusColorIcons.get(testResult.status)}</div>
            <div className="flex flex-col align-middle justify-center ml-3 h-6">{t('challenge.solution.test-result.action.go-to')}</div>
        </div>
    </Link>
}

const ICON_WIDTH = 18
const ICON_HEIGHT = 18

const statusColorIcons = new Map([
    [TestStatus.WAITING_TO_TEST, <ClockIcon width={ICON_WIDTH} height={ICON_HEIGHT} color="#60A5FA"/>],
    [TestStatus.RUNNING, <ChevronDoubleRightIcon width={ICON_WIDTH} height={ICON_HEIGHT} color="#6B21A8"/>],
    [TestStatus.FINISHED, <CheckIcon width={ICON_WIDTH} height={ICON_HEIGHT} color="#22C55E"/>],
    [TestStatus.ERROR, <ExclamationTriangleIcon width={ICON_WIDTH} height={ICON_HEIGHT} color="#FF6600"/>],
    [undefined, <ExclamationTriangleIcon width={ICON_WIDTH} height={ICON_HEIGHT} color="#FF6600"/>],
    [null, <ExclamationTriangleIcon width={ICON_WIDTH} height={ICON_HEIGHT} color="#FF6600"/>]
]);

export default TestResultButton;