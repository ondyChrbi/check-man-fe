import React, {ReactElement} from "react";
import {useQuery} from "@apollo/client";
import {
    CourseDashboardQuery,
    getCourseDashboardQuery
} from "../lib/graphql/meQuery";
import {useTranslation} from "react-i18next";
import CourseIcon from "../components/course/ui/CourseIcon"
import LoadingSpinner from "../components/LoadingSpinner";

const CourseDashboard: React.FC = (): ReactElement => {
    const {loading, error, data} = useQuery<CourseDashboardQuery>(getCourseDashboardQuery);
    const {t} = useTranslation();

    if (loading) {
        return <div className="w-screen h-screen flex flex-row items-center justify-center">
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <p>Error</p>
    }

    if (!data?.courseDashboard.availableCourses && !data?.courseDashboard.myCourses) {
        return <p>{t('dashboard.courses.not-available')}</p>;
    }

    return <>
            <div className="flex flex-col m-8 items-center">
                <div className="my-3">
                    <h1>{t('dashboard.courses.me')}</h1>
                </div>
                <div className="flex flex-row">
                    {data?.courseDashboard.myCourses?.map((course) =>
                        course.semesters?.map((semester) =>
                            <CourseIcon key={course.id} course={course}/>
                        ))}
                </div>
                <div className="my-3">
                    {t('dashboard.courses.available')}
                </div>
                <div className="flex flex-row">
                    {data?.courseDashboard.availableCourses?.map((course) =>
                        <CourseIcon key={course.id} course={course} available={true}/>
                    )}
                </div>
            </div>
    </>
}

export default CourseDashboard;