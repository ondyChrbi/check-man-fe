import {SemesterRole} from "../../../../../lib/graphql/courseQuery";
import {Link} from "react-router-dom";
import {ArchiveBoxIcon, DocumentCheckIcon} from "@heroicons/react/24/solid";
import React from "react";
import {useTranslation} from "react-i18next";

interface Props {
    courseId: number | string
}

const ChallengeReviewButton = ({courseId} : Props) => {
    const {t} = useTranslation();

    return <Link to={`/courses/${courseId}/review/editor`}>
        <div
            className="w-fit bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
            <DocumentCheckIcon width={20} height={20}/>
            <span>{t('challenge.action.review')}</span>
        </div>
    </Link>
}

export default ChallengeReviewButton;