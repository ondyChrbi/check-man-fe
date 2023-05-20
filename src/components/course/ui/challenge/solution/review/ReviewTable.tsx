import {useQuery} from "@apollo/client";
import {
    getSolutionsToReview,
    GetSolutionsToReviewQuery,
    GetSolutionsToReviewVariables
} from "../../../../../../lib/graphql/reviewQuery";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {Solution} from "../../../../../../lib/graphql/challengeQuery";
import {toFormattedDateTime} from "../../../../../../features/helper";
import {CustomPaging, PagingState,} from "@devexpress/dx-react-grid";
import {RowDetailState} from '@devexpress/dx-react-grid';
import {Grid, PagingPanel, Table, TableHeaderRow, TableRowDetail} from "@devexpress/dx-react-grid-material-ui";
import ReviewStartButton from "../../../review/form/button/ReviewStartButton";

interface Props {
    challengeId: number | string
}

const ReviewTable = ({challengeId}: Props) => {
    const {t} = useTranslation();

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(1);
    const [pageSizes] = useState([5, 10, 15]);

    const {data, loading, refetch} =
        useQuery<GetSolutionsToReviewQuery, GetSolutionsToReviewVariables>(getSolutionsToReview, {
            variables: {challengeId, page: page, pageSize: pageSize}
        });

    useEffect(() => {
        if (!loading) {
            refetch({challengeId, page: page, pageSize: pageSize});
        }
    }, [challengeId, page, pageSize])

    const [columns] = useState([
        {name: "id", title: t('challenge.review.editor.author.stag-id')},
        {
            name: "uploadDate",
            title: t('challenge.review.editor.author.upload-date'),
            getCellValue: (row: Solution) => toFormattedDateTime(row.uploadDate)
        },
        {
            name: "mail",
            title: t('challenge.review.editor.author.mail'),
            getCellValue: (row: Solution) => row.author.mail
        },
        {
            name: "displayName",
            title: t('challenge.review.editor.author.display-name'),
            getCellValue: (row: Solution) => row.author.displayName
        }
    ]);


    //@ts-ignore
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
                <RowDetailState />
                <Table/>
                <TableHeaderRow/>
                {data && <TableRowDetail
                    contentComponent={ReviewTableActions}
                />}
                <PagingPanel
                    pageSizes={pageSizes}
                />
            </Grid>
        </div>
    </div>
}

interface ReviewTableActionsProps {
    row: Solution
}

const ReviewTableActions = ({row}: ReviewTableActionsProps) => {
    const {courseId, semesterId, challengeId} = useParams<'courseId' | 'semesterId' | 'challengeId'>();

    return <div className="flex flex-row justify-start items-center align-middle">
        <ReviewStartButton semesterId={semesterId!} courseId={courseId!} challengeId={challengeId!} solution={row}/>
    </div>
}

export default ReviewTable;