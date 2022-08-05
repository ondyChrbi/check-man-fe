import React, {ReactElement} from "react";
import {useQuery} from "@apollo/client";
import {
    CourseDashboardQuery,
    getCourseDashboard
} from "../lib/graphql/meQuery";
import {useTranslation} from "react-i18next";
import CourseIcon from "../components/ui/CourseIcon"

const CourseDashboard: React.FC = (): ReactElement => {
    const {loading, error, data} = useQuery<CourseDashboardQuery>(getCourseDashboard);
    const {t} = useTranslation();

    if (loading) {
        return <p>Loading</p>
    }
    if (error) {
        return <p>Error</p>
    }

    if (!data?.courseDashboard.availableCourses && !data?.courseDashboard.myCourses) {
        return <p>{t('dashboard.courses.available')}</p>;
    }

    return (
        <>
            {data?.courseDashboard.myCourses?.map((course) =>
                <CourseIcon key={course.id} course={course}/>
            )}

            {data?.courseDashboard.availableCourses?.map((course) =>
                <CourseIcon key={course.id} course={course}/>
            )}
        </>
    );
}

export default CourseDashboard;