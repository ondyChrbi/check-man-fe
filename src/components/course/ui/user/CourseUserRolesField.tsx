import {CourseSemesterRole} from "../../../../lib/graphql/meQuery";
import React from "react";

interface Props {
    roles?: Array<CourseSemesterRole>
    onChipClicked?: (role : CourseSemesterRole) => void | Promise<void>
}

const CourseUserRolesField = ({roles = [], onChipClicked} : Props) => {
    return <div className="flex flex-wrap justify-start items-end w-full">
        {roles?.map(role =>
            <CourseRoleChip key={role.id} role={role} onChipClicked={onChipClicked} />
        )}
    </div>
}

interface CourseRoleChipProps {
    role: CourseSemesterRole,
    onChipClicked?: (role : CourseSemesterRole) => void | Promise<void>
}

const CourseRoleChip = ({role, onChipClicked} : CourseRoleChipProps) => {
    const clickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onChipClicked) {
            await  onChipClicked(role);
        }
    };

    return <button onClick={clickHandle} className="p-0.5 mx-0.5 rounded-full border-2 text-gray-500 bg-white font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max my-1">
        {role.name}
    </button>
}

export default CourseUserRolesField;