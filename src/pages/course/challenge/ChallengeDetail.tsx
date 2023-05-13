import {useQuery} from "@apollo/client";
import {Challenge, ChallengeQuery, getChallengeQuery} from "../../../lib/graphql/challengeQuery";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import React from "react";
import {useParams} from "react-router-dom";
import ChallengeUploadSolutionForm from "../../../components/course/ui/challenge/form/ChallengeUploadSolutionForm";
import {useCourseRoles} from "../../../features/authorization/hooks";
import {SemesterRole} from "../../../lib/graphql/courseQuery";
import SolutionsArea from "../../../components/course/ui/challenge/solution/SolutionArea";
import ReviewAlert from "../../../components/course/ui/challenge/solution/review/ReviewAlert";
import ChallengeTaskDefinition from "./ChallengeTaskDefinition";
import ChallengeAdministrationToolbar from "../../../components/course/ui/challenge/form/ChallengeAdministrationToolbar";
import SemesterAdministratorToolbar from "../../../components/course/ui/SemesterAdministratorToolbar";

interface Props {
    argChallengeId?: number
}

const ChallengeDetail = ({argChallengeId}: Props) => {
    const {courseId, semesterId, challengeId} = useParams<'courseId' | 'semesterId' | 'challengeId'>();
    const {roles} = useCourseRoles(semesterId!);

    const {loading, error, data} = useQuery<ChallengeQuery>(getChallengeQuery, {
        variables: {"id": (argChallengeId) ?? challengeId}
    });

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !data || !challengeId) return <>Error</>

    return <div className="flex flex-col">
        <div className="my-5 w-full md:h-14 flex flex-col items-end justify-center align-middle">
            <SemesterAdministratorToolbar courseId={courseId!!} semesterId={semesterId!!}
                                          challenge={data.challenge} />
        </div>

        {data.challenge.published && roles.includes(SemesterRole.REVIEW_CHALLENGE) && <ReviewAlert challengeId={challengeId}/>}

        {data.challenge && <>
            <ChallengeTaskDefinition semesterId={semesterId!!} challenge={data.challenge} />
            <ChallengeAdministrationToolbar semesterId={semesterId!} challenge={data.challenge}/>
        </>}

        <div className="flex flex-col mt-5">
            {showSolutionSection(data.challenge, roles) && <>
                <ChallengeUploadSolutionForm challengeId={challengeId!}/>
                <SolutionsArea challengeId={challengeId} courseId={courseId!} semesterId={semesterId!}/>
            </>
            }
        </div>
    </div>
}

const showSolutionSection = (challenge: Challenge, roles: any) => {
    return challenge.published && roles.includes(SemesterRole.SUBMIT_CHALLENGE_SOLUTION);
}

export default ChallengeDetail