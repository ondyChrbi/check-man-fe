import ChallengeDescription from "./ChallengeDescription";
import {SemesterRole} from "../../../lib/graphql/courseQuery";
import Requirements from "../../../components/course/ui/challenge/requirement/Requirements";
import RequirementEditor from "../../../components/course/ui/challenge/requirement/RequirementEditor";
import React, {useState} from "react";
import {Requirement} from "../../../lib/graphql/requirementQuery";
import {useCourseRoles} from "../../../features/authorization/hooks";
import {Challenge} from "../../../lib/graphql/challengeQuery";

interface Props {
    semesterId: string | number;
    challenge: Challenge;
}

const ChallengeTaskDefinition = ({semesterId, challenge}: Props) => {
    const {roles} = useCourseRoles(semesterId!);

    const [requirementEditorDisplayed, setRequirementEditorDisplayed] = useState<boolean>(false);
    const [editingRequirement, setEditingRequirement] = useState<Requirement | null>(null);

    const editRequirementHandle = (requirement: Requirement) => {
        setEditingRequirement(requirement);
        setRequirementEditorDisplayed(true);
    }

    const showRequirementEditorHandle = () => {
        setEditingRequirement(null);
        setRequirementEditorDisplayed(true);
    }

    const hideRequirementEditorHandle = () => {
        setEditingRequirement(null);
        setRequirementEditorDisplayed(false);
    }

    return <div className="flex flex-col p-5 rounded-2xl bg-white">
        <h1 className="text-gray-600 font-bold text-4xl">{challenge.name}</h1>

        <div className="my-7">
            <ChallengeDescription semesterId={semesterId!} challenge={challenge} editable={roles.includes(SemesterRole.EDIT_CHALLENGE)}/>
        </div>

        <div>
            <Requirements challengeId={challenge.id} semesterId={semesterId!}
                          onNewRecord={showRequirementEditorHandle}
                          onEditRecord={editRequirementHandle}
                          editable={!challenge.published && roles.includes(SemesterRole.EDIT_CHALLENGE)}
            />
        </div>

        {requirementEditorDisplayed && !challenge.published && roles.includes(SemesterRole.EDIT_CHALLENGE) &&
            <RequirementEditor challengeId={challenge.id} onHide={hideRequirementEditorHandle}
                               requirement={editingRequirement}/>
        }
    </div>
};

export default ChallengeTaskDefinition;