import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {getCourseSemesterQuery, SemesterQuery} from "../../lib/graphql/meQuery";
import ChallengeAside from "./ChallengeAside";
import LoadingSpinner from "../LoadingSpinner";
import React from "react";

const CourseSemesterDetail = () => {
    const {semesterId} = useParams<'courseId' | 'semesterId'>();
    const {loading, error, data} = useQuery<SemesterQuery>(getCourseSemesterQuery, {
        variables: { "id" : semesterId }
    });

    if (loading) {
        return <div className="w-screen h-screen flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !semesterId) return <>Error</>

    return <>
        <main className="w-full h-full flex flex-row">
            <aside className="md:w-80 md:h-full flex flex-col-reverse items-end bg-slate-300">
                <ChallengeAside semesterId={semesterId!} />
            </aside>
            <section className="m-5">
                <h1>{data?.semester?.id}</h1>
                <h2>{data?.semester?.dateStart} - {data?.semester?.dateEnd}</h2>
                <p>{data?.semester?.note}</p>
            </section>
        </main>
    </>
}

export default CourseSemesterDetail;