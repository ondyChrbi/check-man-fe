import {Outlet, useLocation, useParams} from "react-router-dom";
import React, {useState} from "react";
import {Props} from "./SolutionReview";
import ReviewTable from "./ReviewTable";

const CHALLENGE_QUERY_PARAM = "challenge";

const ReviewEditor = () => {
    const {challengeId, solutionId} = useParams<'courseId' | 'semesterId' | 'challengeId' | 'solutionId'>();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const [selectedSolution, setSelectedSolution] = useState<Props | null>(null);

    const selectSolutionHandle = (solutionId: number | string, challengeTitle: string | undefined) => {
        setSelectedSolution({solutionId, challengeTitle});
    }

    if (!challengeId) {
        return <p>Error</p>
    }

    return <div className="flex flex-row items-start justify-start">
        <ReviewTable challengeId={challengeId} />
        {solutionId && <div className="flex w-full">
            <Outlet />
        </div>}
    </div>
}

export default ReviewEditor;