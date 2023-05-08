import {Link} from "react-router-dom";
import {UserPlusIcon} from "@heroicons/react/24/solid";
import React from "react";
import {useTranslation} from "react-i18next";

interface Props {
    courseId: number | string,
    semesterId: number | string,
}

const ManageCourseSemesterAccessRequestsButton = ({courseId, semesterId}: Props) => {
    const {t} = useTranslation();

    return <div>
        <Link to={`/courses/${courseId}/semester/${semesterId}/access-requests`}>
            <div
                className="w-fit bg-teal-500 hover:bg-teal-300 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
                <UserPlusIcon width={20} height={20}/>
                <span>{t('course.action.request')}</span>
            </div>
        </Link>
    </div>
}

export default ManageCourseSemesterAccessRequestsButton;