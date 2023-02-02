import {useMutation} from "@apollo/client";
import {
    getChallengeQuery,
    PublishChallengeMutation,
    PublishChallengeMutationVariables,
    publishChallengeMutation
} from "../../../../../../lib/graphql/challengeQuery";
import {showErrorToast, showSuccessToast} from "../../../../../editor/helpers";
import React from "react";
import {useTranslation} from "react-i18next";
import {RocketLaunchIcon} from "@heroicons/react/24/solid";

interface Props {
    challengeId: number | string;
}

const PublishChallengeButton = ({challengeId}: Props) => {
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


    return <div className="flex flex-col justify-center items-center">
        <div onClick={onClickHandle}
             className="w-fit bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <RocketLaunchIcon width={20} height={20}/>

            <span>{t('common.button.publish')}</span>
        </div>
    </div>
}

export default PublishChallengeButton;