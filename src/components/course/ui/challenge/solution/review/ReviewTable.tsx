import {useMutation, useQuery} from "@apollo/client";
import {
    CreateReviewMutation,
    createReviewMutation, CreateReviewVariables,
    getSolutionsToReview,
    GetSolutionsToReviewQuery,
    GetSolutionsToReviewVariables
} from "../../../../../../lib/graphql/reviewQuery";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {PencilSquareIcon} from "@heroicons/react/24/solid";
import {useNavigate, useParams} from "react-router-dom";
import {Solution} from "../../../../../../lib/graphql/challengeQuery";
import {showErrorToast} from "../../../../../editor/helpers";
import {toFormattedDateTime} from "../../../../../../features/helper";
import {CustomPaging, PagingState} from "@devexpress/dx-react-grid";
import {Grid, PagingPanel, Table, TableHeaderRow} from "@devexpress/dx-react-grid-material-ui";

interface Props {
    challengeId: number | string
}

const ReviewTable = ({challengeId}: Props) => {
    const {t} = useTranslation();

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(1);
    const [pageSizes] = useState([1, 2, 3]);

    const {
        data, loading, refetch
    } = useQuery<GetSolutionsToReviewQuery, GetSolutionsToReviewVariables>(getSolutionsToReview, {
        variables: {challengeId, page: page, pageSize: pageSize}
    });

    useEffect(() => {
        if (!loading) {
            refetch({challengeId, page: page, pageSize: pageSize});
        }
    }, [challengeId, page, pageSize])

    const [columns] = useState([
        {name: "id", title: t('challenge.review.editor.author.stag-id')},
        {name: "uploadDate", title: t('challenge.review.editor.author.upload-date'), getCellValue: (row : Solution) => toFormattedDateTime(row.uploadDate)},
        {name: "mail", title: t('challenge.review.editor.author.mail'), getCellValue: (row : Solution) => row.author.mail},
        {name: "displayName", title: t('challenge.review.editor.author.display-name'), getCellValue: (row : Solution) => row.author.displayName}
    ]);


    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <div className="flex flex-col justify-center">
            <Grid
                rows={data?.solutionsToReview || []}
                columns={columns}
            >
                <PagingState
                    currentPage={page}
                    onCurrentPageChange={setPage}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />
                <CustomPaging
                    totalCount={data?.countToReview || 0}
                />
                <Table/>
                <TableHeaderRow/>
                <PagingPanel
                    pageSizes={pageSizes}
                />
            </Grid>
        </div>
    </div>
}

interface ReviewTableBodyProps {
    solution: Solution
}

const ReviewTableBody = ({solution}: ReviewTableBodyProps) => {
    return <tr key={solution.id} className="bg-white border-b">
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
            <ReviewTableActions solution={solution}/>
        </td>
    </tr>
}

const WIDTH = 15;
const HEIGHT = 15;

interface ReviewTableActionsProps {
    solution: Solution
}

const ReviewTableActions = ({solution}: ReviewTableActionsProps) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {courseId, semesterId, challengeId} = useParams<'courseId' | 'semesterId' | 'challengeId'>();
    const {id: solutionId} = solution;

    const [createEmpty] = useMutation<CreateReviewMutation, CreateReviewVariables>(createReviewMutation);

    const addReviewClickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        let reviewId = solution.review?.id

        if (!reviewId) {
            const input = {description: t('challenge.review.editor.description.default')};
            try {
                const result = await createEmpty({variables: {solutionId, input}});

                reviewId = result.data?.createReview.id!
            } catch (error) {
                showErrorToast(error);
                return;
            }
        }
        navigate(`/courses/${courseId}/semester/${semesterId}/challenge/${challengeId}/solution/${solutionId}/review/${reviewId}/edit`)
    };

    return <div className="flex flex-row justify-center items-center align-middle">
        <button onClick={addReviewClickHandle}
                className="rounded-full w-fit hover:bg-teal-200 text-gray-800 font-bold py-2 p-2 inline-flex items-center">
            <PencilSquareIcon width={WIDTH} height={HEIGHT}/>
        </button>
    </div>
}

export default ReviewTable;