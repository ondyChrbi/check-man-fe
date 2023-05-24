import {useQuery} from "@apollo/client";
import {
    courseStatisticsQuery,
    CourseStatisticsVariables,
    GetCourseStatisticsQuery
} from "../../../lib/graphql/statisticsQuery";
import {showErrorToast} from "../../editor/helpers";
import LoadingSpinner from "../../loading/LoadingSpinner";
import React from "react";
import FeedBackChart from "../../ui/chart/FeedBackChart";
import {useTranslation} from "react-i18next";
import {SortOrder} from "../../../lib/graphql";
import CourseStatisticView from "./CourseStatisticView";
import {FeedbackType} from "../../../lib/graphql/challengeQuery";

interface Props {
    semesterId: number | string
}

const CourseStatistics = ({semesterId}: Props) => {

    return <div className="w-full h-fir flex flex-col">
        <div className="w-full h-fit flex my-5">
            <div className="w-full h-fit mt-10 grid grid-cols-1 sm:grid-cols-1 h-fit">
                {Object.values(FeedbackType).map(s => <div key={s} className="w-full h-fit flex flex-col md:px-2.5">
                    <Chart semesterId={semesterId} type={s}/>
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
    type?: FeedbackType
}

const Chart = ({semesterId, direction = SortOrder.ASC, limit = 5, type = FeedbackType.POSITIVE}: ChartProps) => {
    const {t} = useTranslation();
    const {data, loading} = useQuery<GetCourseStatisticsQuery, CourseStatisticsVariables>(courseStatisticsQuery, {
        variables: {semesterId, direction, limit, type},
        onError: (error) => { showErrorToast(error) },
    });

    if (loading) {
        return <div className="w-full h-fit flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (!data || data.statistic.length === 0) { return <EmptyStatisticsMessage /> }

    return <FeedBackChart data={data?.statistic} charTitle={t(`course.semester.statistics.chart.${type}.title`)}
                          backgroundColor={typeColorMap.get(type)}/>
}

const EmptyStatisticsMessage = () => {
    const {t} = useTranslation();

    return <div className="w-full py-32 flex flex-row items-center justify-center bg-gray-100 rounded-lg">
        <p>{t('course.semester.statistics.info.empty')}</p>
    </div>
}

const typeColorMap = new Map();
typeColorMap.set(FeedbackType.NEGATIVE, 'rgba(255, 99, 132, 0.5)');
typeColorMap.set(FeedbackType.POSITIVE, 'rgba(153, 255, 102, 0.5)');
typeColorMap.set(FeedbackType.NEUTRAL, 'rgba(44, 130, 201, 1)');
typeColorMap.set(FeedbackType.EXTREMELY_POSITIVE, 'rgba(255, 255, 204, 1)');

export default CourseStatistics;