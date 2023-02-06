import {useQuery} from "@apollo/client";
import LoadingSpinner from "../../../../../LoadingSpinner";
import TreeView from "react-treeview";
import React from "react";
import {
    getAllSolutionsToReview,
    GetSolutionsToReviewQuery,
    GetSolutionsToReviewVariables
} from "../../../../../../lib/graphql/reviewQuery";

interface Props{
    courseId: number | string,
    onSolutionSelected? : (solutionId: number, challengeTitle: string | undefined) => void
}

const ReviewList = ({courseId, onSolutionSelected}: Props) => {
    const {data, loading, error} = useQuery<GetSolutionsToReviewQuery, GetSolutionsToReviewVariables>(getAllSolutionsToReview, {
        variables: {courseId}
    });

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error) {
        return <p>Error</p>
    }

    const onSolutionClickHandle = (e: React.MouseEvent<HTMLElement>, solutionId: number, challengeTitle: string | undefined) => {
        e.preventDefault();

        if (onSolutionSelected) {
            onSolutionSelected(solutionId, challengeTitle);
        }
    };

    return <>
        {data?.allSolutionsToReview.map((list) =>
            <TreeView key={list.course?.id} nodeLabel={list.course?.note}>
                {list.reviews?.map((review) =>
                    <TreeView key={review.challenge?.id} nodeLabel={review.challenge?.name}>
                        {review.solutions.map((solution) =>
                            <div onClick={(e) => onSolutionClickHandle(e, solution.id, review.challenge?.name)} key={solution.id}>
                                {solution.id}
                            </div>
                        )}
                    </TreeView>
                )}
            </TreeView>
        )}
    </>
}

export default ReviewList;