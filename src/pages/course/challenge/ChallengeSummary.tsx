import {useQuery} from "@apollo/client";
import {showErrorToast} from "../../../components/editor/helpers";
import {useParams} from "react-router-dom";
import {
    ChallengeSummaryQuery,
    ChallengeSummaryQueryVariables,
    getChallengeSummaryQuery
} from "../../../lib/graphql/challengeSummaryQuery";
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
    PagingState,
    IntegratedPaging,
} from '@devexpress/dx-react-grid';
import React, {useState} from "react";
import {AppUser} from "../../../lib/graphql/meQuery";
import {Status} from "../../../lib/graphql/challengeQuery";
import {useTranslation} from "react-i18next";

export interface Summary {
    mail: string,
    displayName: string
    stagId: string,
    denied: number,
    approved: number,
    returnToEdit: number,
    waitingToReview: number,
}

const ChallengeSummary = () => {
    const {t} = useTranslation();
    const {challengeId} = useParams<'challengeId'>();

    const {data, loading} = useQuery<ChallengeSummaryQuery, ChallengeSummaryQueryVariables>(getChallengeSummaryQuery, {
        variables: { id : challengeId! },
        onError: (error) => {
            showErrorToast(error)
        },
    });

    const [columns] = useState([
        { name: 'displayName', title: t('challenge.summary.display-name') },
        { name: 'stagId', title: t('challenge.summary.stag-id') },
        { name: 'approved', title: t('challenge.summary.approved') },
        { name: 'denied', title: t('challenge.summary.denied') },
        { name: 'returnToEdit', title: t('challenge.summary.return-to-edit') },
        { name: 'waitingToReview', title: t('challenge.summary.waiting-to-review') },
    ]);

    const [rows] = useState(data?.challenge.relatedUsers.map(u => toSummary(u)) || []);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageSizes] = useState([5, 10, 15]);

    return <div className="flex flex-col w-full">
        <h1 className="my-2.5 text-gray-600 font-light text-4xl">{t('challenge.summary.title')}</h1>
        <h2 className="font-roboto text-gray-500 text-xl text-left pb-7">{data?.challenge.name}</h2>
        <div className="flex flex-row w-full">
            <Grid
                rows={rows}
                columns={columns}
            >
                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />
                <IntegratedPaging />
                <Table />
                <TableHeaderRow />
                <PagingPanel
                    pageSizes={pageSizes}
                />
            </Grid>
        </div>
    </div>
}

const toSummary = (user: AppUser) : Summary => {
    const denied = user.challengeSummary.find(s => s.statusName === Status.DENIED);
    const approved = user.challengeSummary.find(s => s.statusName === Status.APPROVED);
    const returnToEdit = user.challengeSummary.find(s => s.statusName === Status.RETURN_TO_EDIT);
    const waitingToReview = user.challengeSummary.find(s => s.statusName === Status.WAITING_TO_REVIEW);

    return {
        mail: user.mail || "",
        displayName: user.displayName || "",
        stagId: user.stagId || "",
        denied: denied?.count || 0,
        approved: approved?.count || 0,
        returnToEdit: returnToEdit?.count || 0,
        waitingToReview: waitingToReview?.count || 0
    }
}

export default ChallengeSummary;