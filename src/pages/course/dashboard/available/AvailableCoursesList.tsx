import CourseIcon from "../../../../components/dashboard/CourseIcon";
import CourseIconChip from "../../../../components/dashboard/CourseIconChip";
import React from "react";
import {useTranslation} from "react-i18next";
import {Course} from "../../../../lib/graphql/courseQuery";
import CourseAccessRequest from "./CourseAccessRequest";

interface Props {
    availableCourses: Array<Course>
}

const AvailableCoursesList = ({availableCourses}: Props) => {
    const {t} = useTranslation();

    return <div className="mx-5">
        {availableCourses.map(course => course.semesters?.map(semester => <div className="mx-5">
                <CourseIcon key={semester.id} course={course} semester={semester}>
                    <CourseIconChip title={t('course.semester.available.new').toUpperCase()}/>
                </CourseIcon>
                <CourseAccessRequest semester={semester}/>
            </div>
        ))}
    </div>
}

export default AvailableCoursesList;