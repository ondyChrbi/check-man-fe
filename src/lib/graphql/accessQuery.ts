import {AppUser} from "./meQuery";
import {Challenge} from "./challengeQuery";
import {gql} from "@apollo/client";

export const permitUserChallengeMutation = gql`
    mutation PermitUserChallenge($challengeId: ID!, $appUserId: ID!, $accessTo: DateTime!) {
        permitUserChallenge(challengeId: $challengeId, appUserId: $appUserId, accessTo: $accessTo) {
            id
            accessTo
            appUser {
                id,
                mail,
                stagId,
                displayName,
            }
            challenge {
                id,
                name,
                deadlineDate,
                startDate,
                description,
                challengeKind,
                published
            }
        }
    }
`;

export interface PermittedAppUserChallenge {
    id?: number;
    accessTo: string;
    appUser: AppUser;
    challenge: Challenge;
}


export interface PermitUserChallengeMutation {
    permitUserChallenge: PermittedAppUserChallenge;
}

export interface PermitUserChallengeVariables {
    challengeId: string | number;
    appUserId: string | number;
    accessTo?: Date;
}

export const removePermitUserChallengeMutation = gql`
    mutation PermitUserChallenge($challengeId: ID!, $appUserId: ID!) {
        removePermitUserChallenge(challengeId: $challengeId, appUserId: $appUserId)
    }
`;

export interface RemovePermitUserChallengeMutation {
    removePermitUserChallenge: Boolean;
}

export interface RemovePermitUserChallengeVariables {
    challengeId: string | number;
    appUserId: string | number;
}

export const appUsersToPermitChallengeQuery = gql`
    query AppUsersToPermitChallenge($challengeId: ID!, $search: String) {
        searchAppUsersToPermitChallenge(challengeId: $challengeId, search: $search) {
            id,
            mail,
            stagId,
            displayName,
        }
    }
`;

export interface AppUsersToPermitChallengeQuery {
    searchAppUsersToPermitChallenge: Array<AppUser>;
}

export interface AppUsersToPermitChallengeVariables {
    challengeId: string | number;
    search: string;
}

export const permittedAppUsersChallengeQuery = gql`
    query AppUsersToPermitChallenge($challengeId: ID!) {
        permittedAppUsersChallenge(challengeId: $challengeId) {
            id,
            mail,
            stagId,
            displayName,
        }
    }
`;

export interface PermittedAppUsersChallengeQuery {
    permittedAppUsersChallenge: Array<AppUser>;
}

export interface PermittedAppUsersChallengeQueryVariables {
    challengeId: string | number;
}
