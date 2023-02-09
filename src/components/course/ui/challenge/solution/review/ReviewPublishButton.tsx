import {RocketLaunchIcon} from "@heroicons/react/24/solid";
import React from "react";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/client";
import {
    publishReviewMutation,
    PublishReviewMutation,
    PublishReviewVariables
} from "../../../../../../lib/graphql/reviewQuery";
import {showErrorToast} from "../../../../../editor/helpers";

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;

interface Props {
    reviewId: number | string
}

const ReviewPublishButton = ({reviewId}: Props) => {
    const {t} = useTranslation();

    const [publish] = useMutation<PublishReviewMutation, PublishReviewVariables>(publishReviewMutation, {
        onError: (error) => {
            showErrorToast(error);
        },
    });

    const onClickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        await publish({variables: {id: reviewId}});
    }

    return <div className="flex flex-col justify-center items-start my-2">
        <button onClick={onClickHandle}
                className="w-fit hover:bg-teal-300 bg-teal-200 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
            <RocketLaunchIcon className="mr-2" width={ICON_WIDTH} height={ICON_HEIGHT}/>
            <span>{t('common.button.publish')}</span>
        </button>
    </div>
}

export default ReviewPublishButton;