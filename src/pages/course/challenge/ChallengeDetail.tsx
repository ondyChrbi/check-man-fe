import {useQuery} from "@apollo/client";
import {ChallengeQuery, getChallengeQuery} from "../../../lib/graphql/challengeQuery";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import Requirements from "../../../components/course/ui/challenge/requirement/Requirements";
import RequirementEditor from "../../../components/course/ui/challenge/requirement/RequirementEditor";
import ChallengeUploadSolutionForm from "../../../components/course/ui/challenge/form/ChallengeUploadSolutionForm";
import {useCourseRoles} from "../../../features/authorization/hooks";
import {SemesterRole} from "../../../lib/graphql/courseQuery";
import ChallengePublishButton from "../../../components/course/ui/challenge/form/ChallengePublishButton";
import SolutionsArea from "../../../components/course/ui/challenge/solution/SolutionArea";
import ReviewAlert from "../../../components/course/ui/challenge/solution/review/ReviewAlert";
import {Requirement} from "../../../lib/graphql/requirementQuery";
import ChallengeDescription from "./ChallengeDescription";
import AutomaticTestEditor from "../../../components/course/ui/challenge/solution/test/AutomaticTestEditor";

interface Props {
    argChallengeId?: number
}

const ChallengeDetail = ({argChallengeId}: Props) => {
    const {courseId, semesterId, challengeId} = useParams<'courseId' | 'semesterId' | 'challengeId'>();

    const {roles} = useCourseRoles(semesterId!);

    const {loading, error, data} = useQuery<ChallengeQuery>(getChallengeQuery, {
        variables: {"id": (argChallengeId) ?? challengeId}
    });

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

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !data || !challengeId) return <>Error</>

    return <div className="flex flex-col">
        {data.challenge.published && roles.includes(SemesterRole.REVIEW_CHALLENGE) &&
            <ReviewAlert challengeId={challengeId}/>
        }

        <div className="flex flex-col p-5 rounded-2xl bg-white">
            <h1 className="text-gray-600 font-bold text-4xl">{data.challenge.name}</h1>

            <div className="my-7">
                <ChallengeDescription semesterId={semesterId!} challenge={data.challenge} editable={roles.includes(SemesterRole.EDIT_CHALLENGE)}/>
            </div>

            <div>
                <Requirements challengeId={challengeId} semesterId={semesterId!}
                              onNewRecord={showRequirementEditorHandle}
                              onEditRecord={editRequirementHandle}
                              editable={!data.challenge.published && roles.includes(SemesterRole.EDIT_CHALLENGE)}
                />
            </div>

            {requirementEditorDisplayed && !data.challenge.published && roles.includes(SemesterRole.EDIT_CHALLENGE) &&
                <RequirementEditor challengeId={challengeId} onHide={hideRequirementEditorHandle}
                                   requirement={editingRequirement}/>
            }
        </div>

        {!data.challenge.published && roles.includes(SemesterRole.EDIT_CHALLENGE) &&
            <ChallengePublishButton challengeId={challengeId}/>}

        <div className="flex flex-col mt-5">
            {data.challenge.published && roles.includes(SemesterRole.SUBMIT_CHALLENGE_SOLUTION) && <>
                <ChallengeUploadSolutionForm challengeId={challengeId!}/>
                <SolutionsArea challengeId={challengeId} courseId={courseId!} semesterId={semesterId!}/>
            </>
            }
        </div>

        {!data.challenge.published && roles.includes(SemesterRole.EDIT_CHALLENGE) && <div className="py-5">
            <AutomaticTestEditor challenge={data.challenge} />
        </div>}
    </div>
}

export default ChallengeDetail