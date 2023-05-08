import {SemesterRole} from "../../../lib/graphql/courseQuery";
import React from "react";
import {useCourseRoles} from "../../../features/authorization/hooks";
import ChallengeDeleteButton from "./challenge/form/ChallengeDeleteButton";
import ChallengeReviewButton from "./challenge/form/ChallengeReviewButton";

interface Props {
    courseId: number | string;
    semesterId: number | string;
    challengeId?: number | string | undefined | null;
}

const SemesterAdministratorToolbar = ({courseId, semesterId, challengeId}: Props) => {
    const {roles} = useCourseRoles(semesterId);

    return <div className="flex flex-row justify-center items-center align-middle md:h-14 h-fit">
        <div className="flex flex-row px-2">{challengeId && roles.includes(SemesterRole.DELETE_CHALLENGE) &&
            <ChallengeDeleteButton semesterId={semesterId} courseId={courseId} challengeId={challengeId}/>
        }</div>
        <div className="flex flex-row px-2">{challengeId && roles.includes(SemesterRole.REVIEW_CHALLENGE) &&
            <ChallengeReviewButton courseId={courseId} semesterId={semesterId} challengeId={challengeId} />
        }</div>
    </div>
}

export default SemesterAdministratorToolbar;