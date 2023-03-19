import {Course} from "../../../lib/graphql/courseQuery";
import React from "react";
import CourseIcon from "../../../components/dashboard/CourseIcon";

interface Props {
    courses: Array<Course>
    title?: string
    children?: React.ReactNode
}

const DashboardList = ({courses = [], title, children}: Props) => {
    return <div className="flex flex-col w-full">
        <div className="flex flex-wrap justify-center align-middle w-full">
            {courses.map(course =>
                <div className="mx-5">
                    <CourseIcon key={course.id} course={course} />
                </div>
            )}
            {children}
        </div>
    </div>
}

export default DashboardList