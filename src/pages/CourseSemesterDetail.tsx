import {Outlet, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import ChallengeAside from "../components/course/ChallengeAside";
import LoadingSpinner from "../components/LoadingSpinner";
import React from "react";
import {courseQuery, SemesterQuery} from "../lib/graphql/courseQuery";
import AdministratorToolbar from "../components/course/ui/AdministratorToolbar";

const CourseSemesterDetail = () => {
    const {courseId, semesterId} = useParams<'courseId' | 'semesterId'>();
    const {loading, error, data} = useQuery<SemesterQuery>(courseQuery, {
        variables: { "id" : semesterId }
    });

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner />
        </div>
    }

    if (error || !semesterId || !courseId) return <>Error</>

    return <>
        <main className="w-full h-full flex flex-row">
            <aside className="md:w-80 md:h-full flex flex-col-reverse items-end bg-slate-300">
                <ChallengeAside semesterId={semesterId} courseId={courseId} />
            </aside>
            <section className="w-full m-8">
                <div className="my-5 w-full flex flex-row items-end justify-end">
                    <AdministratorToolbar semesterRoles={data?.courseRoles} />
                </div>
                <Outlet />
            </section>
        </main>
    </>
}

export default CourseSemesterDetail;