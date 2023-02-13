import {SemesterRole} from "../../../lib/graphql/courseQuery";
import React from "react";
import {useCourseRoles} from "../../../features/authorization/hooks";
import ChallengeDeleteButton from "./challenge/form/ChallengeDeleteButton";
import ChallengeCreateButton from "./challenge/form/ChallengeCreateButton";
import ChallengeReviewButton from "./challenge/form/ChallengeReviewButton";
import ManageCourseSemesterUsersButton from "./ManageCourseSemesterUsersButton";

interface Props {
    courseId: number | string;
    semesterId: number | string;
    challengeId?: number | string | undefined | null;
}

const AdministratorToolbar = ({courseId, semesterId, challengeId}: Props) => {
    const {roles} = useCourseRoles(semesterId);

    return <div className="flex flex-row [&>*]:px-2">
        <div className="px-2">{roles.includes(SemesterRole.CREATE_CHALLENGE) &&
            <ChallengeCreateButton semesterId={semesterId} courseId={courseId}/>
        }</div>
        <div className="px-2">{challengeId && roles.includes(SemesterRole.DELETE_CHALLENGE) &&
            <ChallengeDeleteButton semesterId={semesterId} courseId={courseId} challengeId={challengeId}/>
        }</div>
        <div className="px-2">{challengeId && roles.includes(SemesterRole.REVIEW_CHALLENGE) &&
            <ChallengeReviewButton courseId={courseId} semesterId={semesterId} challengeId={challengeId} />
        }</div>
        <div className="px-2">{roles.includes(SemesterRole.MANAGE_USERS) &&
            <ManageCourseSemesterUsersButton courseId={courseId} semesterId={semesterId} />
        }</div>
    </div>
}

export default AdministratorToolbar;