import {RocketLaunchIcon} from "@heroicons/react/24/solid";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/client";
import {
    publishReviewMutation,
    PublishReviewMutation,
    PublishReviewVariables
} from "../../../../../../lib/graphql/reviewQuery";
import {showErrorToast, showSuccessToast} from "../../../../../editor/helpers";
import ReviewPublishOptions from "./ReviewPublishOptions";
import {Status} from "../../../../../../lib/graphql/challengeQuery";

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
        onCompleted: () => {
            showSuccessToast(t('common.message.publish'));
        }
    });

    const [showPublishOptions, setShowPublishOptions] = useState(false);

    const publishClickHandle = () => setShowPublishOptions(true);

    const finishPublishClickHandle = async (status: Status) => {
        await publish({variables: {id: reviewId, status }});
    }

    return <div className="flex flex-col justify-center items-start my-5">
        {!showPublishOptions ? <PublishButton onClicked={publishClickHandle}/> : <ReviewPublishOptions onClicked={finishPublishClickHandle} />}
    </div>
}

interface PublishButtonProps {
    onClicked: () => void | Promise<void>
}

const PublishButton = ({onClicked}: PublishButtonProps) => {
    const {t} = useTranslation();

    const clickHandle = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        onClicked();
    }

    return <div className="flex flex-row justify-start items-start align-baseline">
        <button onClick={clickHandle}
                className="w-fit hover:bg-teal-300 bg-teal-200 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
            <RocketLaunchIcon className="mr-2" width={ICON_WIDTH} height={ICON_HEIGHT}/>
            <span>{t('common.button.publish')}</span>
        </button>
    </div>
}

export default ReviewPublishButton;