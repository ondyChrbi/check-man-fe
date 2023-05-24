import ChallengeDescription from "../../../components/course/ui/challenge/form/ChallengeDescription";
import {SemesterRole} from "../../../lib/graphql/courseQuery";
import Requirements from "../../../components/course/ui/challenge/requirement/Requirements";
import React from "react";
import {useCourseRoles} from "../../../features/authorization/hooks";
import {Challenge} from "../../../lib/graphql/challengeQuery";

interface Props {
    semesterId: string | number;
    challenge: Challenge;
}

const ChallengeTaskDefinition = ({semesterId, challenge}: Props) => {
    const {roles} = useCourseRoles(semesterId!);

    return <div className="flex flex-col p-5 rounded-2xl bg-white">
        <h1 className="text-gray-600 font-bold text-4xl">{challenge.name}</h1>

        <div className="my-7">
            <ChallengeDescription semesterId={semesterId!} challenge={challenge} editable={roles.includes(SemesterRole.EDIT_CHALLENGE)}/>
        </div>

        <div>
            <Requirements challengeId={challenge.id} semesterId={semesterId!}
                          editable={!challenge.published && roles.includes(SemesterRole.EDIT_CHALLENGE)}
            />
        </div>
    </div>
};

export default ChallengeTaskDefinition;