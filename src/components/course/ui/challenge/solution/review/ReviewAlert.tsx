import {useQuery} from "@apollo/client";
import {useTranslation} from "react-i18next";
import {
    getSolutionsCountToReview,
    GetSolutionsCountToReviewQuery,
    GetSolutionsCountToReviewVariables
} from "../../../../../../lib/graphql/reviewQuery";
import FadeIn from "../../../../../ui/animated/FadeIn";

interface Props {
    challengeId: number | string;
}

const ReviewAlert = ({challengeId}: Props) => {
    const {t} = useTranslation();

    const {data, loading, error} = useQuery<GetSolutionsCountToReviewQuery, GetSolutionsCountToReviewVariables>(getSolutionsCountToReview, {
        variables: {challengeId}
    });

    if (!data || data.countToReview === 0 || loading|| error) return <></>;

    return <>
        <div className="my-4 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
             role="alert">
            <div className="flex">
                <div className="py-1">
                    <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path
                            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                    </svg>
                </div>
                <div>
                    <p className="font-bold">{t('challenge.review.new.alert.title')}</p>
                    <p className="text-sm">{t('challenge.review.new.alert.description', {count: data.countToReview || 0})}</p>
                </div>
            </div>
        </div>
    </>;
}

export default ReviewAlert;