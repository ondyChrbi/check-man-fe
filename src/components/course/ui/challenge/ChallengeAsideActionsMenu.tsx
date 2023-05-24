import {useCourseRoles} from "../../../../features/authorization/hooks";
import React from "react";
import {SemesterRole} from "../../../../lib/graphql/courseQuery";
import ManageCourseSemesterUsersButton from "../ManageCourseSemesterUsersButton";
import ManageCourseSemesterAccessRequestsButton from "../ManageCourseSemesterAccessRequestsButton";

interface Props {
    courseId: number | string
    semesterId: number | string
}

const ChallengeAsideActionsMenu = ({courseId, semesterId} : Props) => {
    const {roles} = useCourseRoles(semesterId!);

    return <div className="my-2 flex flex-row items-center justify-center">
        <div className="flex flex-row px-2">{roles.includes(SemesterRole.MANAGE_USERS) &&
            <ManageCourseSemesterUsersButton courseId={courseId} semesterId={semesterId} />
        }</div>
        <div className="flex flex-row px-2">{roles.includes(SemesterRole.MANAGE_USERS) &&
            <ManageCourseSemesterAccessRequestsButton courseId={courseId} semesterId={semesterId} />
        }</div>
    </div>
}

export default ChallengeAsideActionsMenu;