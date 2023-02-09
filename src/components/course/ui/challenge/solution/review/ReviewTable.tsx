import {useMutation, useQuery} from "@apollo/client";
import {
    CreateReviewMutation,
    createReviewMutation, CreateReviewVariables,
    getSolutionsToReview,
    GetSolutionsToReviewQuery,
    GetSolutionsToReviewVariables
} from "../../../../../../lib/graphql/reviewQuery";
import LoadingSpinner from "../../../../../LoadingSpinner";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {toFormattedDateTime} from "../../../../../../features/helper";
import {ChevronLeftIcon, ChevronRightIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import {useNavigate, useParams} from "react-router-dom";
import {Review} from "../../../../../../lib/graphql/challengeQuery";
import {showErrorToast} from "../../../../../editor/helpers";

const DEFAULT_OFFSET = 0;
const DEFAULT_SIZE = 10;

interface Props {
    challengeId: number | string
}

const ReviewTable = ({challengeId}: Props) => {
    const {t} = useTranslation();

    const [offset, setOffset] = useState<number>(DEFAULT_OFFSET);
    const {data, loading, error} = useQuery<GetSolutionsToReviewQuery, GetSolutionsToReviewVariables>(getSolutionsToReview, {
        variables: {challengeId, offset, size: DEFAULT_SIZE}
    });

    const COLUMNS = [
        t('challenge.review.editor.author.stag-id'),
        t('challenge.review.editor.author.upload-date'),
        t('challenge.review.editor.author.mail'),
        t('challenge.review.editor.author.display-name'),
        t('challenge.review.editor.action.title'),
    ];

    const previousPageHandle = () => {
        if (offset > 0) {
            setOffset(offset - 1);
        }
    }

    const nextPageHandle = () => {
        const max = Math.floor(data?.countToReview || 0 / DEFAULT_SIZE);

        if (offset < max) {
            setOffset(offset + 1);
        }
    }

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !data) {
        return <p>Error</p>
    }

    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <div className="flex flex-col justify-center">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    {COLUMNS.map(c => <th key={c} scope="col" className="px-6 py-3">{c}</th>)}
                </tr>
                </thead>
                <tbody>
                {data.solutionsToReview.map((solution) => <tr key={solution.id}
                                                              className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {solution.author.stagId}
                    </th>
                    <td className="px-6 py-4">
                        {toFormattedDateTime(solution.uploadDate)}
                    </td>
                    <td className="px-6 py-4">
                        {solution.author.mail}
                    </td>
                    <td className="px-6 py-4">
                        {solution.author.displayName}
                    </td>
                    <td className="px-6 py-4">
                        <ReviewTableActions solutionId={solution.id}/>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <div className="flex flex-row justify-between items-start align-middle px-3">
                <ReviewTableActionsFooter onPreviousClick={previousPageHandle} onNextClick={nextPageHandle}/>
                <div className="flex flex-row h-full py-1 text-sm">{offset} / {Math.floor(data.countToReview / DEFAULT_SIZE)}</div>
            </div>
        </div>
    </div>
}

const WIDTH = 15;
const HEIGHT = 15;

interface ReviewTableActionsProps {
    solutionId: number | string,
    review?: Review | undefined | null
}

const ReviewTableActions = ({solutionId, review = null}: ReviewTableActionsProps) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {courseId, semesterId, challengeId} = useParams<'courseId' | 'semesterId' | 'challengeId'>();

    const [createEmpty] = useMutation<CreateReviewMutation, CreateReviewVariables>(createReviewMutation);

    const addReviewClickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (!review) {
            const input = { description: t('challenge.review.editor.description.default') };
            try {
                await createEmpty({variables: { solutionId, input}});
            } catch (error) {
                showErrorToast(error);
                return;
            }
        }
        navigate(`/courses/${courseId}/semester/${semesterId}/challenge/${challengeId}/solution/${solutionId}`)
    };

    return <div className="flex flex-row justify-center items-center align-middle">
            <button onClick={addReviewClickHandle}
                className="rounded-full w-fit hover:bg-teal-200 text-gray-800 font-bold py-2 p-2 inline-flex items-center">
                <PencilSquareIcon width={WIDTH} height={HEIGHT}/>
            </button>
        </div>
}

interface ReviewTableActionsFooterProps {
    onPreviousClick: () => void
    onNextClick: () => void
}

const ReviewTableActionsFooter = ({onPreviousClick, onNextClick}: ReviewTableActionsFooterProps) => {
    return <div className="flex flex-row">
        <button onClick={onPreviousClick}
                className="rounded-full w-fit hover:bg-teal-200 text-gray-800 font-bold py-2 p-2 inline-flex items-center">
            <ChevronLeftIcon width={WIDTH} height={HEIGHT}/>
        </button>
        <button onClick={onNextClick}
                className="rounded-full w-fit hover:bg-teal-200 text-gray-800 font-bold py-2 p-2 inline-flex items-center">
            <ChevronRightIcon width={WIDTH} height={HEIGHT}/>
        </button>
    </div>
}

export default ReviewTable;