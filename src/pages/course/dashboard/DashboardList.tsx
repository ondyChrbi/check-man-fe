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
        {title && <div className="my-3 bg">
            <h1>{title}</h1>
        </div>}
        <div className="flex flex-wrap justify-start items-end w-full">
            {courses.map((course) =>
                <CourseIcon key={course.id} course={course}/>)
            }
            {children}
        </div>
    </div>
}

export default DashboardList