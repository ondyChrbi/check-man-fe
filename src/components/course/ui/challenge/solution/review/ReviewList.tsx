import {useQuery} from "@apollo/client";
import LoadingSpinner from "../../../../../loading/LoadingSpinner";
import React from "react";
import {
    getSolutionsToReview,
    GetSolutionsToReviewQuery,
    GetSolutionsToReviewVariables
} from "../../../../../../lib/graphql/reviewQuery";

interface Props{
    challengeId: number | string,
    onSolutionSelected? : (solutionId: number, challengeTitle: string | undefined) => void
}

const ReviewList = ({challengeId, onSolutionSelected}: Props) => {
    const {data, loading, error} = useQuery<GetSolutionsToReviewQuery, GetSolutionsToReviewVariables>(getSolutionsToReview, {
        variables: {challengeId}
    });

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !data) {
        return <p>Error</p>
    }

    const onSolutionClickHandle = (e: React.MouseEvent<HTMLElement>, solutionId: number, challengeTitle: string | undefined) => {
        e.preventDefault();

        if (onSolutionSelected) {
            onSolutionSelected(solutionId, challengeTitle);
        }
    };

    return <div className="flex flex-col">
        {data?.solutionsToReview.map((s) =>
            <div className="flex flex-row" key={s.id}>({s.author.stagId}) {s.author.displayName}</div>
        )}
    </div>
}

interface ReviewItemProps {
    children: React.ReactNode
}

const ReviewItem = ({children}: ReviewItemProps) => {
    return <div className="w-24 h-6 hover:bg-gray-800">
        {children}
    </div>
}

export default ReviewList;