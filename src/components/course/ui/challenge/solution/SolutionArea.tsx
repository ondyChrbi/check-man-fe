import React, {useState} from 'react';
import SolutionDetail from "./SolutionDetail";
import {useQuery} from "@apollo/client";
import {getSolutionsQuery, GetSolutionsQuery, GetSolutionsVariables} from "../../../../../lib/graphql/challengeQuery";
import Loader from "../../../../ui/Loader";


interface Props {
    challengeId: number | string
}

const SolutionArea = ({ challengeId } : Props) => {
    const [activeTab, setActiveTab] = useState(0);

    const {data, loading, error} = useQuery<GetSolutionsQuery, GetSolutionsVariables>(getSolutionsQuery, {
        onCompleted: (data) => {
            if (data.solutions.length !== 0) {
                setActiveTab(data.solutions[0].id);
            }
        },
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
            <div className="flex">
                {data.solutions.map(solution => (
                    <button
                        key={solution.id}
                        className={`inline-block px-4 py-2 text-center hover:bg-gray-200 ${
                            solution.id === activeTab ? 'bg-gray-300' : ''
                        }`}
                        onClick={() => setActiveTab(solution.id)}
                    >
                        {solution.id}
                    </button>
                ))}
            </div>
            {data.solutions.map(solution =>
                solution.id === activeTab ? (
                    <div key={solution.id} className="mt-4">
                        <SolutionDetail solutionId={solution.id} />
                    </div>
                ) : null
            )}
        </div>
    );
};

export default SolutionArea;
