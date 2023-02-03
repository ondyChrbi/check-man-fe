import {useQuery} from "@apollo/client";
import {ChallengeQuery, getChallengeQuery} from "../lib/graphql/challengeQuery";
import LoadingSpinner from "../components/LoadingSpinner";
import React from "react";
import {useParams} from "react-router-dom";
import RequirementList from "../components/course/ui/challenge/requirement/RequirementList";
import {useTranslation} from "react-i18next";
import RequirementEditor from "../components/course/ui/challenge/requirement/RequirementEditor";
import ChallengeUploadSolutionForm from "../components/course/ui/challenge/form/ChallengeUploadSolutionForm";
import {useCourseRoles} from "../features/authorization/hooks";
import {SemesterRole} from "../lib/graphql/courseQuery";
import ChallengePublishButton from "../components/course/ui/challenge/form/ChallengePublishButton";
import SolutionsArea from "../components/course/ui/challenge/solution/SolutionArea";

interface Props {
    argChallengeId?: number
}

const ChallengeDetail = ({argChallengeId}: Props) => {
    const {t} = useTranslation();

    const {courseId, semesterId, challengeId} = useParams<'courseId' | 'semesterId' | 'challengeId'>();
    const {loading, error, data} = useQuery<ChallengeQuery>(getChallengeQuery, {
        variables: { "id" : (argChallengeId) ?? challengeId }
    });

    const {roles} = useCourseRoles(semesterId!);

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !data || !challengeId) return <>Error</>

    return <>
        <h1 className="my-7 text-gray-600 font-light text-4xl">{data.challenge.name}</h1>
        <div dangerouslySetInnerHTML={{__html: data.challenge.description}}></div>
        <RequirementList challengeId={challengeId} editable={roles.includes(SemesterRole.EDIT_CHALLENGE)} />
        {!data.challenge.published && <>
            {roles.includes(SemesterRole.EDIT_CHALLENGE) && <>
                <h2 className="my-7 text-gray-600 font-light text-4xl">{t('challenge.requirement.new.title')}</h2>
                <RequirementEditor challengeId={challengeId} />
            </>}
            {roles.includes(SemesterRole.EDIT_CHALLENGE) && <ChallengePublishButton challengeId={challengeId} />}
        </>}
        {data.challenge.published && roles.includes(SemesterRole.SUBMIT_CHALLENGE_SOLUTION) &&
            <>
                <h2 className="my-7 text-gray-600 font-light text-4xl">{t('challenge.solution.upload.title')}</h2>
                <ChallengeUploadSolutionForm courseId={courseId!} semesterId={semesterId!} challengeId={challengeId!} />
            </>
        }
        <SolutionsArea challengeId={challengeId} />
    </>
}

export default ChallengeDetail