import {Course} from "../../../../lib/graphql/courseQuery";
import CourseIcon from "../../../../components/dashboard/CourseIcon";
import React from "react";
import CourseIconChip from "../../../../components/dashboard/CourseIconChip";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

interface Props {
    courses?: Array<Course>
}

const ManageCoursesList = ({courses = []}: Props) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const clickHandle = (course: Course) => {
        navigate(`/courses/${course.id}/manage`);
    }

    return <div className="flex flex-row mx-5">
        {courses.map(course =>
            <div key={course.id} className="mx-5">
                <CourseIcon course={course} disabled={true}>
                    <CourseIconChip title={t('course.action.manage')} color="bg-red-700" onClick={() => clickHandle(course)} />
                </CourseIcon>
            </div>
        )}
    </div>
}

export default ManageCoursesList;