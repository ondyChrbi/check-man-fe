import {SemesterRole} from "../../../lib/graphql/courseQuery";
import {useTranslation} from "react-i18next";
import React from "react";
import {Link, useParams} from "react-router-dom";
import {PlusIcon} from "@heroicons/react/solid";

interface Props {
    semesterRoles?: SemesterRole[]
}

const AdministratorToolbar = ({semesterRoles = []}: Props) => {
    const {courseId, semesterId} = useParams<'courseId' | 'semesterId'>();
    const {t} = useTranslation();

    return <>
        {semesterRoles?.includes(SemesterRole.CREATE_CHALLENGE) &&
            <Link to={`/courses/${courseId}/semester/${semesterId}/challenge/create`}>
                <div className="w-fit bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <PlusIcon width={20} height={20} />
                    <span>{t('challenge.action.create')}</span>
                </div>
            </Link>
        }
    </>
}

export default AdministratorToolbar;