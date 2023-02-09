import {useQuery} from "@apollo/client";
import {ChallengeQuery, getChallengeQuery} from "../lib/graphql/challengeQuery";
import LoadingSpinner from "../components/LoadingSpinner";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import RequirementList from "../components/course/ui/challenge/requirement/RequirementList";
import {useTranslation} from "react-i18next";
import RequirementEditor from "../components/course/ui/challenge/requirement/RequirementEditor";
import ChallengeUploadSolutionForm from "../components/course/ui/challenge/form/ChallengeUploadSolutionForm";
import {useCourseRoles} from "../features/authorization/hooks";
import {SemesterRole} from "../lib/graphql/courseQuery";
import ChallengePublishButton from "../components/course/ui/challenge/form/ChallengePublishButton";
import SolutionsArea from "../components/course/ui/challenge/solution/SolutionArea";
import ReviewAlert from "../components/course/ui/challenge/solution/review/ReviewAlert";
import {Requirement} from "../lib/graphql/requirementQuery";

interface Props {
    argChallengeId?: number
}

const ChallengeDetail = ({argChallengeId}: Props) => {
    const {courseId, semesterId, challengeId} = useParams<'courseId' | 'semesterId' | 'challengeId'>();

    const {t} = useTranslation();
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

    return <>
        {data.challenge.published && roles.includes(SemesterRole.REVIEW_CHALLENGE) &&
            <ReviewAlert challengeId={challengeId}/>}
        <h1 className="my-7 text-gray-600 font-light text-4xl">{data.challenge.name}</h1>
        <div dangerouslySetInnerHTML={{__html: data.challenge.description}}></div>
        <h2 className="my-7 text-gray-600 font-light text-2xl">{t('challenge.requirement.title')}</h2>
        <RequirementList challengeId={challengeId} semesterId={semesterId!} onNewRecord={showRequirementEditorHandle}
                         onEditRecord={editRequirementHandle}
                         editable={!data.challenge.published && roles.includes(SemesterRole.EDIT_CHALLENGE)}/>

        {requirementEditorDisplayed && !data.challenge.published && <>
            {roles.includes(SemesterRole.EDIT_CHALLENGE) && <>
                <RequirementEditor challengeId={challengeId} onHide={hideRequirementEditorHandle} requirement={editingRequirement} />
            </>}
        </>}

        {!data.challenge.published && roles.includes(SemesterRole.EDIT_CHALLENGE) && <ChallengePublishButton challengeId={challengeId}/>}

        {data.challenge.published && roles.includes(SemesterRole.SUBMIT_CHALLENGE_SOLUTION) &&
            <>
                <h2 className="my-7 text-gray-600 font-light text-4xl">{t('challenge.solution.upload.title')}</h2>
                <ChallengeUploadSolutionForm courseId={courseId!} semesterId={semesterId!} challengeId={challengeId!}/>
            </>
        }
        <SolutionsArea challengeId={challengeId}/>
    </>
}

export default ChallengeDetail