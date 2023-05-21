import {useQuery} from "@apollo/client";
import {
    Challenge, ChallengeKind,
    ChallengeQuery, getChallengeQuery,
    getSolutionQuery,
    GetSolutionQuery,
    GetSolutionVariables, Solution
} from "../../../../../lib/graphql/challengeQuery";
import Loader from "../../../../../components/ui/Loader";
import React from "react";
import FeedbacksView from "../../../../../components/course/ui/challenge/solution/review/feedback/FeedbacksView";
import {useParams} from "react-router-dom";
import ReviewPublishButton from "../../../../../components/course/ui/challenge/solution/review/ReviewPublishButton";
import ReviewDescriptionEditor
    from "../../../../../components/course/ui/challenge/solution/review/ReviewDescriptionEditor";
import RequirementPointsEditor
    from "../../../../../components/course/ui/challenge/solution/review/requirement/RequirementPointsEditor";
import SolutionDownloadButton from "../../../../../components/course/ui/challenge/solution/SolutionDownloadButton";
import Chip from "../../../../../components/ui/Chip";
import {CalendarIcon, DocumentCheckIcon, HashtagIcon, UserIcon} from "@heroicons/react/24/solid";
import {toFormattedDateTime} from "../../../../../features/helper";
import {ClockIcon, EnvelopeIcon, IdentificationIcon} from "@heroicons/react/24/outline";
import {useTranslation} from "react-i18next";

const ReviewEditor = () => {
    const {t} = useTranslation();
    const {courseId, semesterId, challengeId, solutionId, reviewId} = useParams<'courseId' | 'semesterId' | 'challengeId' | 'solutionId' | 'reviewId'>();

    const {
        data: solutionData,
        loading: solutionLoading,
        error: solutionError
    } = useQuery<GetSolutionQuery, GetSolutionVariables>(getSolutionQuery, {
        variables: {id: solutionId!}
    });
    const {data: challengeData} = useQuery<ChallengeQuery>(getChallengeQuery, {variables: {id: challengeId}});

    if (solutionLoading) {
        return <Loader/>
    }

    if (solutionError || !solutionData) {
        return <p>Error</p>
    }

    return <div className="flex flex-col w-full h-full">
        <h1 className="my-7 text-gray-600 font-light text-4xl">{t('challenge.review.editor.title')}</h1>
        <div className="flex flex-col w-full">
            {solutionData.solution && challengeData?.challenge &&
                <Chips solution={solutionData.solution} challenge={challengeData?.challenge}/>
            }
        </div>
        <div className="my-8">
            <div className="grid md:grid-cols-3 sm:grid-cols-2">
                {challengeData?.challenge.requirements.map(r =>
                    <div className="flex flex-col mx-2">
                        <RequirementPointsEditor reviewId={reviewId!} requirement={r}/>
                    </div>
                )}
            </div>
        </div>
        <div className="my-8">
            <FeedbacksView review={solutionData.solution.review} solutionId={solutionId!}/>
        </div>
        <div className="my-8 w-full">
            <ReviewDescriptionEditor review={solutionData.solution.review}>
                <SolutionEditorActions courseId={courseId!} semesterId={semesterId!} challengeId={challengeId} solution={solutionData.solution}/>
            </ReviewDescriptionEditor>
        </div>
    </div>
}

export interface SolutionEditorActionsProps {
    solution: Solution,
    semesterId: number | string;
    courseId: number | string;
    challengeId?: number | string;
}

const SolutionEditorActions = ({solution, courseId, semesterId, challengeId}: SolutionEditorActionsProps) => {
    return <div className="flex flex-row justify-start items-center align-middle">
        <div className="mr-1.5">
            <ReviewPublishButton courseId={courseId} semesterId={semesterId} challengeId={challengeId} reviewId={solution.review.id}/>
        </div>
        <div className="mx-1.5">
            <SolutionDownloadButton solution={solution}/>
        </div>
    </div>
}

interface ChipsProps {
    solution: Solution,
    challenge: Challenge
}

const Chips = ({solution, challenge}: ChipsProps) => {
    const {t} = useTranslation();

    return <div className="flex flex-col w-full">
        <div className="flex flex-wrap justify-start items-end my-0.5">
            <Chip bgColor="bg-teal-300" textColor="text-gray-700">
                <div className="flex flex-row p-0.5">
                    <UserIcon width={ICON_WIDTH} height={ICON_HEIGHT} fill="#6a7280"/>
                    <div className="ml-1">{solution.author.displayName}</div>
                </div>
            </Chip>
            <Chip bgColor="bg-gray-200" textColor="text-gray-700">
                <div className="flex flex-row p-0.5">
                    <HashtagIcon width={ICON_WIDTH} height={ICON_HEIGHT} fill="#6a7280"/>
                    <div className="ml-1">{solution.id}</div>
                </div>
            </Chip>
            <Chip bgColor="bg-gray-200" textColor="text-gray-700">
                <div className="flex flex-row p-0.5">
                    <EnvelopeIcon width={ICON_WIDTH} height={ICON_HEIGHT}/>
                    <div className="ml-1">{solution.author.mail}</div>
                </div>
            </Chip>
            <Chip bgColor="bg-gray-200" textColor="text-gray-700">
                <div className="flex flex-row p-0.5">
                    <IdentificationIcon width={ICON_WIDTH} height={ICON_HEIGHT}/>
                    <div className="ml-1">{solution.author.stagId}</div>
                </div>
            </Chip>
            <Chip bgColor="bg-gray-200" textColor="text-gray-700">
                <div className="flex flex-row p-0.5">
                    <ClockIcon width={ICON_WIDTH} height={ICON_HEIGHT} fill="#6a7280"/>
                    <div className="ml-1">{toFormattedDateTime(solution.uploadDate)}</div>
                </div>
            </Chip>
        </div>

        <div className="flex flex-wrap justify-start items-end my-0.5">
            <Chip bgColor="bg-teal-300" textColor="text-gray-700">
                <div className="flex flex-row p-0.5">
                    <DocumentCheckIcon width={ICON_WIDTH} height={ICON_HEIGHT} fill="#6a7280"/>
                    <div className="ml-1">{challenge.name}</div>
                </div>
            </Chip>
            <Chip bgColor="bg-gray-200" textColor="text-gray-700">
                <div className="flex flex-row p-0.5">
                    <div className="ml-1">{t(challengeKindSelectValue.get(challenge.challengeKind))}</div>
                </div>
            </Chip>
            {challenge.deadlineDate && <Chip bgColor="bg-gray-200" textColor="text-gray-700">
                <div className="flex flex-row p-0.5">
                    <CalendarIcon width={ICON_WIDTH} height={ICON_HEIGHT} fill="#6a7280"/>
                    <div className="ml-1">{toFormattedDateTime(challenge.deadlineDate)}</div>
                </div>
            </Chip>}
        </div>
    </div>
}

const challengeKindSelectValue = new Map();
challengeKindSelectValue.set(ChallengeKind.OPTIONAL, 'challenge.action.challenge-kind.option.optional');
challengeKindSelectValue.set(ChallengeKind.MANDATORY, 'challenge.action.challenge-kind.option.mandatory');
challengeKindSelectValue.set(ChallengeKind.CREDIT, 'challenge.action.challenge-kind.option.credit');
challengeKindSelectValue.set(ChallengeKind.EXAM, 'challenge.action.challenge-kind.option.exam');

const ICON_WIDTH = 15;
const ICON_HEIGHT = 15;

export default ReviewEditor;