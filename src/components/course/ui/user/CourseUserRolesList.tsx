import {CourseSemesterRole} from "../../../../lib/graphql/meQuery";
import React from "react";

interface Props {
    roles?: Array<CourseSemesterRole>
    onRoleClicked?: (role : CourseSemesterRole) => void | Promise<void>
    itemIcon?: React.ReactNode
    slice?: boolean
}

const CourseUserRolesList = ({roles = [], onRoleClicked, itemIcon, slice = false} : Props) => {
    const displayRoles = slice ? roles.slice(SLICE_START, SLICE_SIZE) : roles;
    const showMore = slice && roles?.length > SLICE_SIZE;

    return <div className="flex flex-wrap justify-start items-end w-full">
        {displayRoles.map(role =>
            <CourseRoleChip key={role.id} role={role} onChipClicked={onRoleClicked}>
                {itemIcon}
            </CourseRoleChip>
        )}
        {showMore &&
            <div className="p-0.5 mx-0.5 rounded-full border-2 text-gray-500 bg-white font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max my-1">
                ...
            </div>}
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

    return <div onClick={clickHandle} className="p-0.5 mx-0.5 rounded-full border-2 text-gray-500 bg-white font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max my-1">
        {role.name}
        {children}
    </div>
}

const SLICE_START = 0;
const SLICE_SIZE = 5;

export default CourseUserRolesList;