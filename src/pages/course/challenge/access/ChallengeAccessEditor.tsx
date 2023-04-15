import {useQuery} from "@apollo/client";
import {
    AppUsersToPermitChallengeQuery,
    appUsersToPermitChallengeQuery,
    AppUsersToPermitChallengeVariables,
    permittedAppUsersChallengeQuery,
    PermittedAppUsersChallengeQuery,
    PermittedAppUsersChallengeQueryVariables,
} from "../../../../lib/graphql/accessQuery";
import {useParams} from "react-router-dom";
import {showErrorToast} from "../../../../components/editor/helpers";
import React, {useState} from "react";
import ToPermitTable, {ActionType} from "./ToPermitTable";

const ChallengeAccessEditor = () => {
    const {challengeId} = useParams<'challengeId'>();

    const [search, setSearch] = useState('');

    const {
        data: toPermitData,
        refetch: toPermitRefetch
    } = useQuery<AppUsersToPermitChallengeQuery, AppUsersToPermitChallengeVariables>(
        appUsersToPermitChallengeQuery,
        {
            onError: (error) => {
                showErrorToast(error.message)
            },
            variables: {challengeId: challengeId!, search}
        }
    );

    const {
        data: permittedData,
        refetch: permittedRefetch
    } = useQuery<PermittedAppUsersChallengeQuery, PermittedAppUsersChallengeQueryVariables>(
        permittedAppUsersChallengeQuery,
        {
            onError: (error) => {
                showErrorToast(error.message)
            },
            variables: {challengeId: challengeId!}
        }
    );

    const actionHandle = async () => {
        await toPermitRefetch();
        await permittedRefetch();
    }

    const searchHandle = (search: string) => {
        setSearch(search)
    }

    return <div className="flex flex-col w-full h-fit">
        {toPermitData?.searchAppUsersToPermitChallenge &&
            <div className="flex flex-col w-full h-fit">
                <ToPermitTable challengeId={challengeId!} onSearch={searchHandle} onAction={actionHandle}
                               data={toPermitData.searchAppUsersToPermitChallenge} action={ActionType.ADD}/>
            </div>
        }

        {permittedData?.permittedAppUsersChallenge &&
            <div className="flex flex-col w-full h-fit">
                <ToPermitTable challengeId={challengeId!} onAction={actionHandle}
                               data={permittedData.permittedAppUsersChallenge} action={ActionType.REMOVE}/>
            </div>
        }
    </div>
}

export default ChallengeAccessEditor;