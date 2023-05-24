import {useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {
    deleteChallengeMutation,
    DeleteChallengeMutation,
    DeleteChallengeVariables, getChallengesQuery
} from "../../../../../../lib/graphql/challengeQuery";
import React from "react";
import {useTranslation} from "react-i18next";
import {ArchiveBoxIcon} from "@heroicons/react/24/solid";

interface Props {
    semesterId: number | string;
    courseId: number | string;
    challengeId?: number | string;
}

const ChallengeDeleteButton = ({semesterId, challengeId, courseId} : Props) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [deleteChallenge] = useMutation<DeleteChallengeMutation, DeleteChallengeVariables>(
        deleteChallengeMutation,
        {
            onCompleted: () => navigate(`/courses/${courseId}/semester/${semesterId}`),
            refetchQueries: [{
                query: getChallengesQuery,
                variables: { "semesterId": semesterId }
            }]
        }
    );

    const deleteChallengeHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (challengeId) {
            await deleteChallenge({variables: {challengeId: `${challengeId}`}})
        }
    };

    return <div className="cursor-pointer" onClick={deleteChallengeHandle}>
        <div className="w-fit bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
            <ArchiveBoxIcon width={20} height={20} />
            <span>{t('challenge.action.delete')}</span>
        </div>
    </div>
}

export default ChallengeDeleteButton;