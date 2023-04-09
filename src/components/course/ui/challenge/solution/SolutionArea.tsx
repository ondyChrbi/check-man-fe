import React from 'react';
import SolutionCard from "./SolutionCard";
import {useQuery} from "@apollo/client";
import {
    getSolutionsQuery,
    GetSolutionsQuery,
    GetSolutionsVariables,
    Solution
} from "../../../../../lib/graphql/challengeQuery";
import Loader from "../../../../ui/Loader";
import {Link} from "react-router-dom";

interface Props {
    courseId: number | string
    semesterId: number | string
    challengeId: number | string
}

const SolutionArea = ({challengeId, courseId, semesterId}: Props) => {
    const {data, loading, error} = useQuery<GetSolutionsQuery, GetSolutionsVariables>(getSolutionsQuery, {
        variables: {challengeId}
    });

    if (loading) {
        return <Loader/>
    }

    if (error || !data) {
        return <p>Error</p>
    }

    return (
        <div className="bg-white p-4">
            <div className="flex flex-wrap lg:justify-start justify-center items-center w-full">
                {data.solutions.map((s) =>
                    <Card solution={s} courseId={courseId} semesterId={semesterId} challengeId={challengeId} />
                )}
            </div>
        </div>
    );
};

interface CardProps {
    solution: Solution,
    courseId: number | string
    semesterId: number | string
    challengeId: number | string
}

const Card = ({solution, courseId, semesterId, challengeId}: CardProps) => {
    const card = <div key={solution.id} className="my-5 flex flex-row justify-start items-center w-72">
        <SolutionCard solutionId={solution.id} courseId={courseId} semesterId={semesterId}/>
    </div>

    return solution.review ? <Link to={`/courses/${courseId}/semester/${semesterId}/challenge/${challengeId}/solution/${solution.id}/review/${solution.review.id}`}>
        {card}
    </Link> : card;
}

export default SolutionArea;
