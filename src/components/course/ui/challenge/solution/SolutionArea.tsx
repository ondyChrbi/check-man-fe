import React from 'react';
import SolutionCard from "./SolutionCard";
import {useQuery} from "@apollo/client";
import {getSolutionsQuery, GetSolutionsQuery, GetSolutionsVariables} from "../../../../../lib/graphql/challengeQuery";
import Loader from "../../../../ui/Loader";

interface Props {
    challengeId: number | string
    courseId: number | string
    semesterId: number | string
}

const SolutionArea = ({ challengeId, courseId, semesterId } : Props) => {
    const {data, loading, error} = useQuery<GetSolutionsQuery, GetSolutionsVariables>(getSolutionsQuery, {
        variables: {challengeId}
    });

    if (loading) {
        return <Loader />
    }

    if (error || !data) {
        return <p>Error</p>
    }

    return (
        <div className="bg-white p-4">
            <div className="flex flex-wrap lg:justify-start justify-center items-center w-full">
                {data.solutions.map((s) =>
                    <div className="my-5 flex flex-row justify-start items-center w-72">
                        <SolutionCard solutionId={s.id} courseId={courseId} semesterId={semesterId} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SolutionArea;
