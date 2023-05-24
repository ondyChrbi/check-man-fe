import {SemesterRole} from "../../../lib/graphql/courseQuery";
import React from "react";
import {useCourseRoles} from "../../../features/authorization/hooks";
import ChallengeDeleteButton from "./challenge/form/button/ChallengeDeleteButton";
import ChallengeReviewButton from "./challenge/form/button/ChallengeReviewButton";
import ChallengeAccessButton from "./challenge/form/button/ChallengeAccessButton";
import {Challenge, ChallengeKind} from "../../../lib/graphql/challengeQuery";
import ChallengeSummaryButton from "./challenge/form/button/ChallengeSummaryButton";

interface Props {
    courseId: number | string;
    semesterId: number | string;
    challenge: Challenge | undefined | null;
}

const SemesterAdministratorToolbar = ({courseId, semesterId, challenge}: Props) => {
    const {roles} = useCourseRoles(semesterId);

    const showAccessButton = (challenge: Challenge) => {
        return challenge.published && (
            (challenge.challengeKind === ChallengeKind.CREDIT && roles.includes(SemesterRole.PERMIT_CHALLENGE_CREDIT)) ||
            (challenge.challengeKind === ChallengeKind.EXAM && roles.includes(SemesterRole.PERMIT_CHALLENGE_EXAM)))
    }

    return <div className="flex flex-row justify-center items-center align-middle md:h-14 h-fit">
        <div className="flex flex-row px-2">{challenge?.id && roles.includes(SemesterRole.DELETE_CHALLENGE) &&
            <ChallengeDeleteButton semesterId={semesterId} courseId={courseId} challengeId={challenge?.id}/>
        }</div>
        <div className="flex flex-row px-2">{challenge?.id && roles.includes(SemesterRole.REVIEW_CHALLENGE) &&
            <ChallengeReviewButton courseId={courseId} semesterId={semesterId} challengeId={challenge?.id} />
        }</div>
        <div className="flex flex-row px-2">{challenge?.id && roles.includes(SemesterRole.VIEW_STATISTICS) &&
            <ChallengeSummaryButton courseId={courseId} semesterId={semesterId} challengeId={challenge?.id} />
        }</div>
        { showAccessButton(challenge!) &&
            <div className="flex flex-row px-2">{challenge?.id && roles.includes(SemesterRole.REVIEW_CHALLENGE) &&
                <ChallengeAccessButton courseId={courseId} semesterId={semesterId} challenge={challenge} />
            }</div>
        }
    </div>
}

export default SemesterAdministratorToolbar;