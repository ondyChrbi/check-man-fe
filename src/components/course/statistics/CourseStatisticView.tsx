import SearchBarInput from "../../ui/SearchBarInput";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useQuery} from "@apollo/client";
import {
    courseStatisticsQuery,
    CourseStatisticsVariables,
    GetCourseStatisticsQuery
} from "../../../lib/graphql/statisticsQuery";
import {showErrorToast} from "../../editor/helpers";
import {SortOrder} from "../../../lib/graphql";
import LoadingSpinner from "../../LoadingSpinner";
import CourseStatisticList from "./CourseStatisticList";

interface Props {
    semesterId: number | string
}

const CourseStatisticView = ({semesterId}: Props) => {
    const {t} = useTranslation();
    const [variables, setVariables] = useState<CourseStatisticsVariables>({
        semesterId,
        direction: DEFAULT_DIRECTION,
        limit: DEFAULT_LIMIT
    });

    const {data, loading, refetch} = useQuery<GetCourseStatisticsQuery, CourseStatisticsVariables>(courseStatisticsQuery, {
        variables,
        onError: (error) => {
            showErrorToast(error)
        },
    });

    const searchClickHandle = async (description: string) => {
        const updatedVariable = { ...variables, description };
        setVariables(updatedVariable);

        await refetch(updatedVariable);
    };

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    return <div className="w-full h-fit flex flex-col">
        <SearchBarInput onSearch={searchClickHandle}
                        placeholder={variables.description || t('course.semester.statistics.search.place-holder')}
                        buttonTitle={t('course.semester.statistics.search.button.title')}/>
        <CourseStatisticList data={data?.statistic} />
    </div>
};

const DEFAULT_DIRECTION = SortOrder.ASC;
const DEFAULT_LIMIT = 5;

export default CourseStatisticView;