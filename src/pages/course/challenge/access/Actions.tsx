import {AppUser} from "../../../../lib/graphql/meQuery";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/client";
import {
    permitUserChallengeMutation,
    PermitUserChallengeMutation,
    PermitUserChallengeVariables,
    RemovePermitUserChallengeMutation,
    removePermitUserChallengeMutation,
    RemovePermitUserChallengeVariables
} from "../../../../lib/graphql/accessQuery";
import {showErrorToast, showSuccessToast} from "../../../../components/editor/helpers";
import ChallengeAccessBodyActions from "./ChallengeAccessBodyActions";
import {UserMinusIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import React from "react";

interface ActionsProps {
    user: AppUser,
    challengeId: string | number,
    onAction?: () => void | Promise<void>,
}

export const AddActions = ({user, challengeId, onAction = () => {}}: ActionsProps) => {
    const {t} = useTranslation();

    const [permitUserChallenge, {loading}] = useMutation<PermitUserChallengeMutation, PermitUserChallengeVariables>(
        permitUserChallengeMutation, {
            onError: (error) => {
                showErrorToast(error);
            },
            onCompleted: () => {
                showSuccessToast(t('common.message.add'));
            },
        });

    const addUserHandle = async () => {
        if (!loading) {
            const accessTo = new Date();
            accessTo.setFullYear(new Date().getFullYear() + DEFAULT_YEAR_ACCESS);

            await permitUserChallenge({
                variables: {
                    challengeId: challengeId,
                    appUserId: user.id,
                    accessTo
                }
            });

            await onAction();
        }
    };

    return <ChallengeAccessBodyActions onAction={addUserHandle}>
        <UserPlusIcon width={WIDTH} height={HEIGHT}/>
    </ChallengeAccessBodyActions>
};

export const RemoveActions = ({user, challengeId, onAction = () => {}}: ActionsProps) => {
    const {t} = useTranslation();

    const [removePermitUserChallenge, {loading}] = useMutation<RemovePermitUserChallengeMutation, RemovePermitUserChallengeVariables>(
        removePermitUserChallengeMutation, {
            onError: (error) => {
                showErrorToast(error);
            },
            onCompleted: () => {
                showSuccessToast(t('common.message.remove'));
            },
        });

    const addUserHandle = async () => {
        if (!loading) {
            await removePermitUserChallenge({
                variables: {
                    challengeId: challengeId,
                    appUserId: user.id,
                }
            });

            await onAction();
        }
    };
    return <ChallengeAccessBodyActions onAction={addUserHandle}>
        <UserMinusIcon width={WIDTH} height={HEIGHT}/>
    </ChallengeAccessBodyActions>
};

const WIDTH = 15;
const HEIGHT = 15;
const DEFAULT_YEAR_ACCESS = 1;