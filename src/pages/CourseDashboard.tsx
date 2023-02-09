import React, {ReactElement} from "react";
import {useQuery} from "@apollo/client";
import {
    CourseDashboardQuery,
    getCourseDashboardQuery
} from "../lib/graphql/meQuery";
import {useTranslation} from "react-i18next";
import CourseIcon from "../components/dashboard/CourseIcon"
import LoadingSpinner from "../components/LoadingSpinner";

const CourseDashboard: React.FC = (): ReactElement => {
    const {loading, error, data} = useQuery<CourseDashboardQuery>(getCourseDashboardQuery);
    const {t} = useTranslation();

    if (loading) {
        return <div className="w-full h-screen flex flex-col items-center justify-center">
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <p>Error</p>
    }

    if (!data?.availableCourses && !data?.myCourses) {
        return <p>{t('challenge.courses.not-available')}</p>;
    }

    return <>
            <div className="flex flex-col justify-center items-center p-8">
                <div className="my-3">
                    <h1>{t('dashboard.courses.me')}</h1>
                </div>
                <div className="flex flex-row">
                    {data?.myCourses?.map((course) => <CourseIcon key={course.id} course={course}/>)}
                </div>
                <div className="my-3">
                    {t('dashboard.courses.available')}
                </div>
                <div className="flex flex-row">
                    {data?.availableCourses?.map((course) =>
                        <CourseIcon key={course.id} course={course} available={true}/>
                    )}
                </div>
            </div>
    </>
}

export default CourseDashboard;