import {useLocation, useParams} from "react-router-dom";
import React, {useState} from "react";
import ReviewList from "./ReviewList";
import SolutionView, {Props} from "./SolutionView";

const CHALLENGE_QUERY_PARAM = "challenge";

const ReviewEditor = () => {
    const {courseId} = useParams<'courseId'>();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const [selectedSolution, setSelectedSolution] = useState<Props | null>(null);

    const selectSolutionHandle = (solutionId: number | string, challengeTitle: string | undefined) => {
        setSelectedSolution({solutionId, challengeTitle});
    }

    if (!courseId) {
        return <p>Error</p>
    }

    return <div className="flex flex-row items-start justify-start">
        <div className="flex w-80 h-full">
            <ReviewList courseId={courseId} onSolutionSelected={selectSolutionHandle} />
        </div>
        {selectedSolution && <div className="flex w-auto">
            <SolutionView {...selectedSolution} />
        </div>}
    </div>
}

export default ReviewEditor;