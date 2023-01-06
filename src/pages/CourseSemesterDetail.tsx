import {Outlet, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import ChallengeAside from "../components/course/ui/challenge/ChallengeAside";
import LoadingSpinner from "../components/LoadingSpinner";
import React from "react";
import {courseQuery, SemesterQuery} from "../lib/graphql/courseQuery";
import AdministratorToolbar from "../components/course/ui/AdministratorToolbar";

const CourseSemesterDetail = () => {
    const {courseId, semesterId} = useParams<'courseId' | 'semesterId'>();
    const {loading, error, data} = useQuery<SemesterQuery>(courseQuery, {
        variables: {"id": semesterId}
    });

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !semesterId || !courseId) return <>Error</>

    return <div className="w-full h-full flex flex-row">
        <ChallengeAside semesterId={semesterId} courseId={courseId}/>
        <section className="w-full my-2 mx-10 lg:m-0 lg:my-0 lg:m-10 lg:m-8">
            <div className="my-5 w-full flex flex-row items-end justify-end">
                <AdministratorToolbar semesterRoles={data?.courseRoles}/>
            </div>
            <Outlet/>
        </section>
    </div>
}

export default CourseSemesterDetail;