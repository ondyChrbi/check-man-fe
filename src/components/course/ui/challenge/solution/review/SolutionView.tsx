import {useQuery} from "@apollo/client";
import {
    getSolutionQuery,
    GetSolutionQuery,
    GetSolutionVariables
} from "../../../../../../lib/graphql/challengeQuery";
import Loader from "../../../Loader";
import React from "react";
import FeedbacksView from "./feedback/FeedbacksView";

export interface Props {
    challengeTitle?: string
    solutionId: number | string;
}

const SolutionView = ({challengeTitle, solutionId}: Props) => {
    const {data, loading, error} = useQuery<GetSolutionQuery, GetSolutionVariables>(getSolutionQuery, {
        variables: {id: solutionId}
    });

    if (loading) {
        return <Loader/>
    }

    if (error || !data) {
        return <p>Error</p>
    }

    return <div className="flex flex-col w-full h-full">
        <h1 className="my-7 text-gray-600 font-light text-4xl">{challengeTitle}</h1>

        <FeedbacksView review={data.solution.review} solutionId={solutionId} />
    </div>
}

export default SolutionView;