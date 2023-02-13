import {CourseSemesterRole} from "../../../../lib/graphql/meQuery";
import React from "react";

interface Props {
    roles?: Array<CourseSemesterRole>
    onRoleClicked?: (role : CourseSemesterRole) => void | Promise<void>
    itemIcon?: React.ReactNode
}

const CourseUserRolesList = ({roles = [], onRoleClicked, itemIcon} : Props) => {
    return <div className="flex flex-wrap justify-start items-end w-full">
        {roles?.map(role =>
            <CourseRoleChip key={role.id} role={role} onChipClicked={onRoleClicked}>
                {itemIcon}
            </CourseRoleChip>
        )}
    </div>
}

interface CourseRoleChipProps {
    role: CourseSemesterRole,
    onChipClicked?: (role : CourseSemesterRole) => void | Promise<void>
    children?: React.ReactNode
}

const CourseRoleChip = ({role, onChipClicked, children} : CourseRoleChipProps) => {
    const clickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onChipClicked) {
            await  onChipClicked(role);
        }
    };

    return <button onClick={clickHandle} className="p-0.5 mx-0.5 rounded-full border-2 text-gray-500 bg-white font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max my-1">
        {role.name}
        {children}
    </button>
}

export default CourseUserRolesList;