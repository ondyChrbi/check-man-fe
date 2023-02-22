import {Semester} from "../../../lib/graphql/courseQuery";
import React from "react";
import SemesterEditor from "../../../pages/course/semester/SemesterEditor";

interface Props {
    semester? : Semester
}

const CourseAdministrationToolbar = ({semester} : Props) => {
    return <div className="flex flex-row [&>*]:px-2">
        <div className="px-2">
            <SemesterCreateButton semester={semester} />
        </div>
    </div>
}

const SemesterCreateButton = ({semester} : Props) => {
    return <>
        <SemesterEditor semester={semester} />
    </>
}

export default CourseAdministrationToolbar;