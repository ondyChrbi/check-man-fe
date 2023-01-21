import {SemesterRole} from "../../../lib/graphql/courseQuery";
import {useTranslation} from "react-i18next";
import React from "react";
import {Link} from "react-router-dom";
import {PlusIcon} from "@heroicons/react/solid";
import {useCourseRoles} from "../../../features/authorization/hooks";

interface Props {
    semesterId: number | string;
    courseId: number | string;
}

const AdministratorToolbar = ({ semesterId, courseId } : Props) => {
    const {t} = useTranslation();
    const { roles } = useCourseRoles(semesterId);

    console.log(roles);
    console.log(semesterId);

    return <>
        {roles.includes(SemesterRole.CREATE_CHALLENGE) &&
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