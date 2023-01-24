import {SemesterRole} from "../../../lib/graphql/courseQuery";
import React from "react";
import {useCourseRoles} from "../../../features/authorization/hooks";
import ChallengeDeleteButton from "./challenge/form/ChallengeDeleteButton";
import ChallengeCreateButton from "./challenge/form/ChallengeCreateButton";

interface Props {
    semesterId: number | string;
    courseId: number | string;
    challengeId?: number | string | undefined | null;
}

const AdministratorToolbar = ({semesterId, courseId, challengeId}: Props) => {
    const {roles} = useCourseRoles(semesterId);

    return <div className="[&>*]:px-2">
        {roles.includes(SemesterRole.CREATE_CHALLENGE) &&
            <ChallengeCreateButton semesterId={semesterId} courseId={courseId} />
        }
        {challengeId && roles.includes(SemesterRole.DELETE_CHALLENGE) &&
            <ChallengeDeleteButton semesterId={semesterId} courseId={courseId} challengeId={challengeId}/>
        }
    </div>
}

export default AdministratorToolbar;