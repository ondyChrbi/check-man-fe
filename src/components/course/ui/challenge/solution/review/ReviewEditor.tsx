import {useLocation, useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import {Challenge, Solution} from "../../../../../../lib/graphql/challengeQuery";
import TreeView from "react-treeview";
import {Semester} from "../../../../../../lib/graphql/courseQuery";
import React from "react";
import LoadingSpinner from "../../../../../LoadingSpinner";

const CHALLENGE_QUERY_PARAM = "challenge";

const ReviewEditor = () => {
    const {courseId} = useParams<'courseId'>();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    if (!courseId) {
        return <p>Error</p>
    }

    return <>
        <ReviewList courseId={courseId} />
    </>
}

export interface GetSolutionsToReviewVariables {
    courseId: number | string
}

export interface GetSolutionsToReviewQuery{
    allSolutionsToReview: Array<CoursesReviewList>
}

export interface ChallengeSolutions{
    challenge?: Challenge,
    solutions: Array<Solution>
}

export interface CoursesReviewList {
    course?: Semester,
    reviews?: ChallengeSolutions
}

export const getAllSolutionsToReview = gql`
    query GetSolutionsToReview($courseId: ID!) {
        allSolutionsToReview(courseId: $courseId) {
            course {
                id,
                note
            }
            reviews {
                challenge {
                    id,
                    name
                }
                solutions {
                    id,
                    uploadDate
                }
            }
        }
    }
`;

interface ReviewListProps{
    courseId: number | string
}

const ReviewList = ({courseId}: ReviewListProps) => {
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

    return <>
        {data?.allSolutionsToReview.map((list) =>
            <TreeView key={list.course?.id} nodeLabel={list.course?.note} />
        )}
    </>
}

export default ReviewEditor;