import {Course} from "../../../lib/graphql/courseQuery";
import React from "react";
import CourseIcon from "../../../components/dashboard/CourseIcon";
import AvailableCoursesList from "./available/AvailableCoursesList";

interface Props {
    courses: Array<Course>
    availableCourses: Array<Course>
    children?: React.ReactNode
}

const DashboardList = ({courses = [], availableCourses = [], children}: Props) => {
    return <div className="flex flex-col w-full">
        <div className="flex flex-wrap justify-center align-middle w-full">
            {courses.map(course => course.semesters?.map(semester => <div key={semester.id} className="mx-5">
                    <CourseIcon course={course} semester={semester} />
                </div>
            ))}
            <AvailableCoursesList availableCourses={availableCourses} />
            {children}
        </div>
    </div>
}

export default DashboardList