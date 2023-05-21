import CourseIcon from "../../../../components/dashboard/CourseIcon";
import CourseIconChip from "../../../../components/dashboard/CourseIconChip";
import React from "react";
import {useTranslation} from "react-i18next";
import {Course} from "../../../../lib/graphql/courseQuery";
import CourseAccessRequest from "./CourseAccessRequest";
import {useGlobalRoles} from "../../../../features/authorization/hooks";
import {GlobalRoleValue} from "../../../../lib/graphql/meQuery";
import AddCourseIcon from "../../../../components/course/AddCourseIcon";
import ManageCourseButton from "../ManageCourseButton";

interface Props {
    availableCourses: Array<Course>
}

const AvailableCoursesList = ({availableCourses}: Props) => {
    const {t} = useTranslation();
    const { globalRoles } = useGlobalRoles();
    const [sent, setSent] = React.useState<boolean>(false);

    return <div className="flex flex-row mx-5">
        {availableCourses.map(course => course.semesters?.map(semester =>
            <div key={semester.id} className="mx-5">
                <CourseIcon course={course} semester={semester} disabled={true} />
                <div className="my-2">
                    <CourseAccessRequest semester={semester} onRequestSent={() => setSent(true)} />
                </div>
                { globalRoles.includes(GlobalRoleValue.ROLE_COURSE_MANAGE) &&
                    <div className="my-2">
                        <ManageCourseButton course={course} />
                    </div>
                }
            </div>
        ))}
    </div>
}

export default AvailableCoursesList;