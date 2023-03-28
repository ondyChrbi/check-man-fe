import React, {ReactElement} from "react";
import {useQuery} from "@apollo/client";
import {
    CourseDashboardQuery,
    getCourseDashboardQuery
} from "../../../lib/graphql/meQuery";
import {useTranslation} from "react-i18next";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import DashboardList from "./DashboardList";
import AddCourseIcon from "../../../components/course/AddCourseIcon";

const CourseDashboard: React.FC = (): ReactElement => {
    const {t} = useTranslation();

    const {loading, error, data} = useQuery<CourseDashboardQuery>(getCourseDashboardQuery);

    if (loading) {
        return <div className="w-full h-screen flex flex-col items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error) {
        return <p>Error</p>
    }

    if (!data?.availableCourses && !data?.myCourses) {
        return <p>{t('challenge.courses.not-available')}</p>;
    }

    return <div className="flex flex-col justify-center items-center p-8 h-full">
        <DashboardList courses={data.myCourses} availableCourses={data.availableCourses}>
            <AddCourseIcon />
        </DashboardList>
    </div>
}


export default CourseDashboard;