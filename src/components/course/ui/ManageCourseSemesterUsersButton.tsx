import {Link} from "react-router-dom";
import {UsersIcon} from "@heroicons/react/24/solid";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

interface Props {
    courseId: number | string,
    semesterId: number | string,
}

const ManageCourseSemesterUsersButton = ({courseId, semesterId}: Props) => {
    const {t} = useTranslation();

    return <div>
        <Link to={`/courses/${courseId}/semester/${semesterId}/users`}>
            <div
                className="w-fit bg-teal-500 hover:bg-teal-300 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
                <UsersIcon width={20} height={20}/>
                <span>{t('course.action.users')}</span>
            </div>
        </Link>
    </div>
}

export default ManageCourseSemesterUsersButton;