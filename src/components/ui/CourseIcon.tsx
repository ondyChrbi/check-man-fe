import React from "react";
import {Course, Semester} from "../../lib/graphql/meQuery";

interface Props {
    course: Course,
    semester: Semester
    outdated?: boolean
    disabled?: boolean
}

const CourseIcon = ({course, semester}: Props) => {
    return <>
        <section>
            <h2>{course.name}</h2>
            <h3>{semester.dateStart}-{semester.dateEnd}</h3>
        </section>
    </>
}

export default CourseIcon;