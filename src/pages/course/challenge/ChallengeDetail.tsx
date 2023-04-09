import {useQuery} from "@apollo/client";
import {Challenge, ChallengeQuery, getChallengeQuery} from "../../../lib/graphql/challengeQuery";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import React from "react";
import {useParams} from "react-router-dom";
import ChallengeUploadSolutionForm from "../../../components/course/ui/challenge/form/ChallengeUploadSolutionForm";
import {useCourseRoles} from "../../../features/authorization/hooks";
import {SemesterRole} from "../../../lib/graphql/courseQuery";
import ChallengePublishButton from "../../../components/course/ui/challenge/form/ChallengePublishButton";
import SolutionsArea from "../../../components/course/ui/challenge/solution/SolutionArea";
import ReviewAlert from "../../../components/course/ui/challenge/solution/review/ReviewAlert";
import AutomaticTestEditor from "../../../components/course/ui/challenge/solution/test/AutomaticTestEditor";
import ShowModalButton from "../../../components/ui/modal/ShowModalButton";
import {useTranslation} from "react-i18next";
import {WrenchIcon} from "@heroicons/react/24/solid";
import ChallengeTaskDefinition from "./ChallengeTaskDefinition";

interface Props {
    argChallengeId?: number
}

const ChallengeDetail = ({argChallengeId}: Props) => {
    const {t} = useTranslation();

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
        {data.challenge.published && roles.includes(SemesterRole.REVIEW_CHALLENGE) && <ReviewAlert challengeId={challengeId}/>}

        {data.challenge && <ChallengeTaskDefinition semesterId={semesterId!!} challenge={data.challenge} />}

        {!data.challenge.published && <div className="py-5 flex flex-row gap-2">
            {roles.includes(SemesterRole.EDIT_CHALLENGE) &&
                <ChallengePublishButton challengeId={challengeId}/>
            }

            {roles.includes(SemesterRole.EDIT_CHALLENGE) &&
                <ShowModalButton buttonTitle={t('challenge.test.action.set')}
                             modalTitle={t('challenge.test.module.editor.message')}
                             css={"bg-gray-300 hover:bg-gray-500 text-black hover:text-white font-bold"}
                             icon={<WrenchIcon width={20} height={20}></WrenchIcon>}>
                    <AutomaticTestEditor challenge={data.challenge} />
                </ShowModalButton>
            }
        </div>}

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