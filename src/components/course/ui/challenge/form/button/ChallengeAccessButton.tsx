import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {KeyIcon} from "@heroicons/react/24/solid";
import React from "react";
import {Challenge} from "../../../../../../lib/graphql/challengeQuery";

interface Props {
    courseId: number | string,
    semesterId: number | string,
    challenge: Challenge,
}

const ChallengeAccessButton = ({courseId, semesterId, challenge}: Props) => {
    const {t} = useTranslation();

    return <div>
        <Link to={`/courses/${courseId}/semester/${semesterId}/challenge/${challenge.id}/access-requests`}>
            <div
                className="w-fit bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
                <KeyIcon width={20} height={20}/>
                <span>{t('challenge.action.access-request')}</span>
            </div>
        </Link>
    </div>
}

export default ChallengeAccessButton;