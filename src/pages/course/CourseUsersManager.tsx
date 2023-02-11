import React from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import CourseUserTable from "../../components/course/ui/user/CourseUserTable";

const CourseUsersManager = () => {
    const {t} = useTranslation();
    const {courseId, semesterId} = useParams<'courseId' | 'semesterId'>();

    return <div className="flex flex-col justify-center items-center p-8">
        <h1 className="my-7 text-gray-600 font-light text-4xl">{t('course.users.title')}</h1>
        <CourseUserTable courseId={courseId!} semesterId={semesterId!} />
    </div>
};

export default CourseUsersManager;