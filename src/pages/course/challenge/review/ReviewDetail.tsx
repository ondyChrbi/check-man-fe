import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {getSolution, GetSolutionQuery, GetSolutionVariables} from "../../../../lib/graphql/reviewQuery";
import {showErrorToast} from "../../../../components/editor/helpers";
import LoadingSpinner from "../../../../components/loading/LoadingSpinner";
import React from "react";
import {statusColorIcons} from "../../../../components/course/ui/challenge/solution/SolutionCard";
import {statusBackgroundColorMap, statusBackgroundTextColorMap} from "../../../../features/challenge/solution";
import FeedbackList from "../../../../components/course/ui/challenge/solution/review/feedback/FeedbackList";
import {removeHtmlTags} from "../../../../features/helper";
import Chip from "../../../../components/ui/Chip";
import {useTranslation} from "react-i18next";
import {UserIcon} from "@heroicons/react/24/solid";

const ReviewDetail = () => {
    const {t} = useTranslation();
    const {solutionId, challengeId} = useParams<'solutionId' | 'challengeId'>();

    const {data, loading} = useQuery<GetSolutionQuery, GetSolutionVariables>(getSolution, {
        variables: {solutionId: solutionId!!, challengeId: challengeId!!},
        onError: (error) => {
            showErrorToast(error);
        }
    });

    if (loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    const review = data?.solution.review
    const feedbacks = data?.solution.review.feedbacks;

    return <div className="flex flex-col w-full h-fit">
        {data?.solution &&
            <div className="flex flex-row w-full h-fit">
                <div className={`w-20 h-20 p-1.5 rounded-full ${statusBackgroundColorMap.get(data.solution.status)}`}>
                    {statusColorIcons.get(data?.solution.status)}
                </div>
                <div className="ml-5 flex flex-col w-full h-fit">

                    <div className="flex flex-row w-full h-fit">
                        <div className={`flex flex-col text-black h-full text-4xl justify-center align-middle items-center ${statusBackgroundTextColorMap.get(data.solution.status)}`}>
                            {data.challenge.name}
                        </div>
                        {review &&
                            <div className={`flex flex-col mx-5 text-black h-full text-4xl justify-center align-middle items-center ${statusBackgroundTextColorMap.get(data.solution.status)}`}>
                                (#{data.solution.review.id})
                            </div>
                        }
                    </div>

                    <div className="flex flex-col w-full h-fit my-2.5">
                        {removeHtmlTags(data.challenge.description).slice(0, DESCRIPTION_LENGTH)}...
                    </div>
                </div>
            </div>
        }
        {feedbacks &&
            <div className="my-5">
                <FeedbackList feedbacks={feedbacks} />
            </div>
        }
        {
            review &&
                <div className="flex flex-row w-full h-fit">
                    {review.description}
                </div>
        }
        <div className="my-7 text-gray-600 font-light text-md">{JSON.stringify(data)}</div>
    </div>
}

const DESCRIPTION_LENGTH = 150;

export default ReviewDetail;