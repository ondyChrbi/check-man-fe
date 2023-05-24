import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useQuery} from "@apollo/client";
import React, {useState} from "react";
import {Grid, PagingPanel, Table, TableHeaderRow} from "@devexpress/dx-react-grid-material-ui";
import {IntegratedPaging, PagingState} from "@devexpress/dx-react-grid";
import {semesters, SemesterSortField, SemestersQuery, SemestersVariables} from "../../lib/graphql/courseQuery";
import {SortOrder} from "../../lib/graphql";
import CourseAdministrationToolbar from "../../components/course/ui/CourseAdministrationToolbar";

const CourseManager = () => {
    const {t} = useTranslation();
    const {courseId} = useParams<'courseId'>();

    const {data} = useQuery<SemestersQuery, SemestersVariables>(semesters, {
        variables: {
            courseId: courseId!,
            oderBy: SemesterSortField.dateStart,
            sortOrder: SortOrder.DESC,
            pageSize: DEFAULT_PAGE_SIZE,
            page: DEFAULT_PAGE
        }
    });

    const [columns] = useState([
        {name: 'id', title: t('course.semester.summary.id')},
        {name: 'note', title: t('course.semester.summary.note')},
        {name: 'dateStart', title: t('course.semester.summary.date-start')},
        {name: 'dateEnd', title: t('course.semester.summary.date-end')},
    ]);

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageSizes] = useState([5, 10, 15]);

    return <div className="w-full flex flex-col justify-center items-center align-middle">
        <div className="w-full lg:w-256 h-full flex flex-col">
            <h1 className="my-2.5 text-gray-600 font-light text-4xl">{t('course.semester.summary.title')}</h1>
            <div className="my-2">
                <CourseAdministrationToolbar />
            </div>
            <div className="flex flex-row w-full">
                <Grid
                    rows={data?.semesters || []}
                    columns={columns}
                >
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={setCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                    />
                    <IntegratedPaging/>
                    <Table/>
                    <TableHeaderRow/>
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                </Grid>
            </div>
        </div>
    </div>
}

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_PAGE = 0;

export default CourseManager;