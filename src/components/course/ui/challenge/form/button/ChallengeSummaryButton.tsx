import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {PresentationChartBarIcon} from "@heroicons/react/24/solid";
import React from "react";

interface Props {
    courseId: number | string,
    semesterId: number | string,
    challengeId: number | string,
}

const ChallengeSummaryButton = ({courseId, semesterId, challengeId}: Props) => {
    const {t} = useTranslation();

    return <div>
        <Link to={`/courses/${courseId}/semester/${semesterId}/challenge/${challengeId}/summary`}>
            <div
                className="w-fit bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
                <PresentationChartBarIcon width={20} height={20}/>
                <span>{t('challenge.action.summary')}</span>
            </div>
        </Link>
    </div>
}

export default ChallengeSummaryButton;