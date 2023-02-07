import {Link} from "react-router-dom";
import {PlusIcon} from "@heroicons/react/24/solid";
import React from "react";
import {useTranslation} from "react-i18next";

interface Props {
    semesterId: number | string;
    courseId: number | string;
}

const ChallengeCreateButton = ({semesterId, courseId} : Props) => {
    const {t} = useTranslation();

    return <>
        <Link to={`/courses/${courseId}/semester/${semesterId}/challenge/create`}>
            <div
                className="rounded-full w-fit bg-teal-400 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 inline-flex items-center">
                <PlusIcon width={20} height={20}/>
                <span>{t('challenge.action.create')}</span>
            </div>
        </Link>
    </>
}

export default ChallengeCreateButton;