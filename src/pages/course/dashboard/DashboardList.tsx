import {Course} from "../../../lib/graphql/courseQuery";
import React from "react";
import CourseIcon from "../../../components/dashboard/CourseIcon";
import AvailableCoursesList from "./available/AvailableCoursesList";
import ManageCoursesList from "./ManageCoursesList";
import {GlobalRoleValue} from "../../../lib/graphql/meQuery";
import ManageCourseButton from "./ManageCourseButton";
import {useGlobalRoles} from "../../../features/authorization/hooks";

interface Props {
    coursesToManage?: Array<Course>
    myCourses: Array<Course>
    availableCourses: Array<Course>
    children?: React.ReactNode
}

const DashboardList = ({coursesToManage = [], myCourses = [], availableCourses = [], children}: Props) => {
    const {globalRoles} = useGlobalRoles();

    return <div className="flex flex-col w-full">
        <div className="flex flex-wrap justify-center align-middle w-full">
            {myCourses.map(course => course.semesters?.map(semester =>
                <div key={semester.id} className="mx-5">
                    <CourseIcon course={course} semester={semester} />
                    { globalRoles.includes(GlobalRoleValue.ROLE_COURSE_MANAGE) &&
                        <div className="my-2">
                            <ManageCourseButton course={course} />
                        </div>
                    }
                </div>
            ))}
            <AvailableCoursesList availableCourses={availableCourses} />
            <ManageCoursesList courses={coursesToManage} />
            {children}
        </div>
    </div>
}

export default DashboardList