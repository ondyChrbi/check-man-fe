import React from "react";
import CourseSemesterList from "../../components/course/CourseSemesterList";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CourseAdministrationToolbar from "../../components/course/ui/CourseAdministrationToolbar";

const CourseDetail = () => {
    const {t} = useTranslation();
    const {courseId} = useParams<'courseId'>();

    return <div className="flex flex-col w-full">
        <h1 className="my-7 text-gray-600 font-light text-4xl">
            {t('course.manager.title', {name: courseId!})}
        </h1>
        <div className="my-2">
            <CourseAdministrationToolbar />
        </div>
        <CourseSemesterList courseId={courseId!} />
    </div>
}



export default CourseDetail;