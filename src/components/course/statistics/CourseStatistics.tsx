import {useQuery} from "@apollo/client";
import {
    courseStatisticsQuery,
    CourseStatisticsVariables,
    GetCourseStatisticsQuery
} from "../../../lib/graphql/statisticsQuery";
import {showErrorToast} from "../../editor/helpers";
import LoadingSpinner from "../../LoadingSpinner";
import React from "react";
import FeedBackChart from "../../ui/chart/FeedBackChart";
import {useTranslation} from "react-i18next";
import {SortOrder} from "../../../lib/graphql";
import CourseStatisticView from "./CourseStatisticView";

interface Props {
    semesterId: number | string
}

const CourseStatistics = ({semesterId}: Props) => {

    return <div className="w-full h-fir flex flex-col">
        <div className="w-full h-fit flex my-5">
            <div className="w-full h-fit mt-10 grid grid-cols-1 sm:grid-cols-2 h-fit">
                {Object.values(SortOrder).map(s => <div className="w-full h-fit flex flex-col md:px-2.5">
                    <Chart semesterId={semesterId} direction={s}/>
                </div>)}
            </div>
        </div>
        <div className="w-full h-fit flex my-5">
            <CourseStatisticView semesterId={semesterId} />
        </div>
    </div>
}

interface ChartProps {
    semesterId: number | string
    direction?: SortOrder
    limit?: number
}

const Chart = ({semesterId, direction = SortOrder.ASC, limit = 5}: ChartProps) => {
    const {t} = useTranslation();
    const {data, loading} = useQuery<GetCourseStatisticsQuery, CourseStatisticsVariables>(courseStatisticsQuery, {
        variables: {semesterId, direction, limit},
        onError: (error) => { showErrorToast(error) },
    });

    if (loading) {
        return <div className="w-full h-fit flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (!data || data.statistic.length === 0) { return <EmptyStatisticsMessage /> }

    return <FeedBackChart data={data?.statistic} charTitle={t(`course.semester.statistics.chart.${direction}.title`)}
                          backgroundColor={typeColorMap.get(direction)}/>
}

const EmptyStatisticsMessage = () => {
    const {t} = useTranslation();

    return <div className="w-full py-32 flex flex-row items-center justify-center bg-gray-100 rounded-lg">
        <p>{t('course.semester.statistics.info.empty')}</p>
    </div>
}

const typeColorMap = new Map();
typeColorMap.set(SortOrder.DESC, 'rgba(255, 99, 132, 0.5)');
typeColorMap.set(SortOrder.ASC, 'rgb(153, 255, 102, 0.5)');

export default CourseStatistics;