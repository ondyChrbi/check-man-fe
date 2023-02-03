import {useQuery} from "@apollo/client";
import {getSolutionQuery, GetSolutionQuery, GetSolutionVariables} from "../../../../../lib/graphql/challengeQuery";
import React from "react";
import Loader from "../../Loader";

interface Props {
    solutionId: number | string
}

const SolutionDetail = ({solutionId} : Props) => {
    const {data, loading, error} = useQuery<GetSolutionQuery, GetSolutionVariables>(getSolutionQuery, {
        variables: {id: solutionId}
    });

    if (loading) {
        return <Loader />
    }

    if (error || !data) {
        return <p>Error</p>
    }

    return <div className="flex flex-row justify-start items-start">
        <h2 className="my-3 text-gray-600 font-light text-2xl">{data.solution.uploadDate}</h2>
        <p>{data.solution.status}</p>
    </div>
}

export default SolutionDetail;