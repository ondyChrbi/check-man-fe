import {useMutation} from "@apollo/client";
import {
    getChallengeQuery,
    PublishChallengeMutation,
    PublishChallengeMutationVariables,
    publishChallengeMutation
} from "../../../../../lib/graphql/challengeQuery";
import {showErrorToast, showSuccessToast} from "../../../../editor/helpers";
import React from "react";
import {useTranslation} from "react-i18next";
import {RocketLaunchIcon} from "@heroicons/react/24/solid";

interface Props {
    challengeId: number | string;
}

const ChallengePublishButton = ({challengeId}: Props) => {
    const {t} = useTranslation();

    const [publish] = useMutation<PublishChallengeMutation, PublishChallengeMutationVariables>(publishChallengeMutation, {
        onError: (error) => {
            showErrorToast(error);
        },
        onCompleted: () => {
            showSuccessToast(t('common.message.publish'));
        },
        refetchQueries: [{query: getChallengeQuery, variables: {challengeId}}]
    });

    const onClickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        await publish({variables: {challengeId}});
    };


    return <div className="flex flex-col justify-center items-start">
        <button onClick={onClickHandle}
             className="w-fit hover:bg-teal-300 bg-teal-200 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
            <RocketLaunchIcon width={20} height={20}/>
            <span>{t('common.button.publish')}</span>
        </button>
    </div>
}

export default ChallengePublishButton;